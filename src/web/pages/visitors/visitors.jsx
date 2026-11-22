import PageGen from "../../layouts/pages";

import visitorDB from "../../../data/visitors.json";

import Languages from "./languages";
import Diet from "./diet";

const name = "Visitors";

const Visitors = ({ visitorSave }) => {
  console.log(visitorSave);
  let visitors = visitorDB.filter((v) =>
    visitorSave.map((wcid) => wcid.split(".").reverse()[0]).includes(v.wcid),
  );
  visitors.sort((a, b) =>
    a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1,
  );

  return (
    <PageGen name={name}>
      {visitorSave.length == 0 ? (
        <></>
      ) : (
        <>
          <h4>Languages</h4>
          <Languages.ReferenceTable />
          <Languages>
            {visitors.map((v) => (
              <Languages.Visitor key={v.id} {...v} />
            ))}
          </Languages>

          <h4>Diet</h4>
          <Diet
            visitors={visitors.filter((v) => v.diet)}
            max={visitorDB.filter((vdb) => vdb.diet).length}
          />
        </>
      )}
    </PageGen>
  );
};

const Nav = () => <PageGen.Nav name={name} />;

export default Object.assign(Visitors, { Nav });
