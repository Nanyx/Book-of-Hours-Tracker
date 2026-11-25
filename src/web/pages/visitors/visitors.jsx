import { Tabs, Tab } from "react-bootstrap";

import "./visitors.css";

import PageGen from "../../layouts/pages";
import DietTable from "./diet";
import Languages from './languages'

import visitorsDB from "../../../data/visitors.json";

const name = "Visitors";

const Visitors = ({ visitorSave }) => {
  let visitors = visitorsDB.filter((v) =>
    visitorSave.map((vs) => vs.split(".").reverse()[0]).includes(v.wid),
  );
  visitors.sort((a, b) => (a.name < b.name ? -1 : 1));

  return (
    <PageGen name={name}>
        <Tabs defaultActiveKey="diet" className="mb-3" justify>
          <Tab eventKey="diet" title="Diet"><DietTable visitors={visitors} /></Tab>
          <Tab eventKey="lang" title="Languages"><Languages visitors={visitors}/></Tab>
        </Tabs>
    </PageGen>
  );
};

const NavItem = () => <PageGen.Nav name={name} />;

export default Object.assign(Visitors, { Nav: NavItem });
