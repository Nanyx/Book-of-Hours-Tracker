import BookLoc from "../models/book";

/**
 * @typedef SaveData
 * @type {Object}
 * @property {CharacterCreationCommand[]} CharacterCreationCommands
 * @property {PopulationCommand} RootPopulationCommand
 */

/**
 * @typedef CharacterCreationCommand
 * @type {Object}
 * @property {string[]} UniqueElementsManifested
 * @property {string[]} AmbittableRecipesUnlocked
 */

/**
 * @typedef PopulationCommand
 * @type {Object}
 * @property {Sphere[]} Spheres
 */

/**
 * @typedef Sphere
 * @type {Object}
 * @property {?Token[]} Tokens
 */

/**
 * @typedef Token
 * @type {Object}
 * @property {?Payload} Payload
 * @property {?Location} Location
 */

/**
 * @typedef Location
 * @property {?AtSpherePath} AtSpherePath
 */

/**
 * @typedef AtSpherePath
 * @property {?string} Path
 */

/**
 * @typedef Payload
 * @type {Object}
 * @property {string} EntityId
 * @property {?Object} Mutations
 * @property {?Object[]} Dominions
 */

/**
 * @typedef GoverningSphereSpec
 */

/**
 * @param {SaveData} save
 * @returns
 */
export const BookParser = (save) => {
  let aru = save.CharacterCreationCommands[0].AmbittableRecipesUnlocked;
  return {
    crafts: aru.filter((item) => item.startsWith("craft.")),
    writingCase: aru.filter((item) => item.startsWith("wc.")),
    books: getBookCollection(save),
  };
};

/**
 * @param {SaveData} save
 */
const getBookCollection = (save) => {
  let booksID =
    save.CharacterCreationCommands[0].UniqueElementsManifested.filter((item) =>
      item.startsWith("t."),
    );

  /**
   * @type {BookLoc[]}
   */
  let collection = [];

  /**
   * Recursive to navigate the game state tree and extract books values
   * @param {Sphere[]} spheres
   */
  const seek = (spheres) => {
    spheres.forEach((si) => {
      if (!si.Tokens) return;

      // remove the auction books
      let tokens = si.Tokens.filter((t) =>
        t?.Location?.AtSpherePath?.Path == "~/purchases.europe" ? false : true,
      );

      tokens.forEach((ti) => {
        if (!ti.Payload) return;

        if (ti.Payload.EntityId && booksID.includes(ti.Payload.EntityId)) {
          collection.push(
            new BookLoc(
              ti.Payload.EntityId,
              Object.keys(ti.Payload.Mutations).findIndex((k) =>
                k.startsWith("mastery"),
              ) != -1,
            ),
          );
        } else if (ti.Payload.Dominions) {
          ti.Payload.Dominions.forEach((di) => {
            if (di.Spheres) seek(di.Spheres);
          });
        }
      });
    });
  };

  seek(save.RootPopulationCommand.Spheres);
  return collection;
};

const getSoul = () => {
  // same as book but use pattern "EntityId": "x[soul][lv]". for basic lv = ""
};
