import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormSelect,
} from "react-bootstrap";

import tomes from "../../data/tomes.json";

export default function TomeConversion() {
  const convert = () => {
    return tomes.elements.map((book) => {
      /**
       * @param {string} name
       */
      const getName = (name) => {
        if (
          name.startsWith("A ") ||
          name.startsWith("The ") ||
          name.startsWith("An ")
        ) {
          let index = name.indexOf(" ");
          let newName =
            name.substring(index + 1) + `, ${name.substring(0, index)}`;
          return newName;
        }
        return name;
      };

      const getMagic = (book) => {
        let key = Object.keys(book.aspects).find((k) =>
          k.startsWith("mystery"),
        );
        return {
          mystery: book.aspects[key],
          mastery: key.split(".")[1],
          memory: book.xtriggers[`reading.${key.split(".")[1]}`][0].id,
        };
      };

      let m = getMagic(book);
      return {
        id: book.ID,
        name: getName(book.Label),
        mystery: m.mystery,
        mastery: m.mastery,
        memory: m.memory,
        skill: Object.keys(book.aspects).find((k) => k.startsWith("r.")),
      };
    });
  };

  return (
    <Form>
      <FormControl
        as="textarea"
        rows={50}
        value={JSON.stringify(convert(), null, 2)}
      />
    </Form>
  );
}
