import * as React from "react";
import { Tabs, Tab } from "react-bootstrap";

import "./crafts.css";

import PageGen from "../../layouts/pages";
import CraftsSkills from "./crafts-skills";

const name = "Crafts";

const Crafts = ({ craftSave }) => (
  <PageGen name={name}>
    <Tabs defaultActiveKey="aspects" className="mb-3">
      <Tab eventKey="aspects" title="By Aspect"></Tab>
      <Tab eventKey="skills" title="By Skill">
        <CraftsSkills craftSave={craftSave} />
      </Tab>
    </Tabs>
  </PageGen>
);

const NavItem = () => <PageGen.Nav name={name} />;

export default Object.assign(Crafts, { Nav: NavItem });
