import * as React from "react";
import { Tabs, Tab } from "react-bootstrap";

import "./crafts.css";

import PageGen from "../../layouts/pages";
import CraftsAspects from "./crafts-aspects";
import CraftsSkills from "./crafts-skills";

const name = "Crafts";

const Crafts = ({ craftSave }) => (
  <PageGen name={name}>
    <Tabs defaultActiveKey="skills" className="mb-3" justify>
      {/*
      <Tab eventKey="aspects" title="By Aspect">
        <CraftsAspects craftSave={craftSave} />
      </Tab>
      */}
      <Tab eventKey="skills" title="By Skill">
        <CraftsSkills craftSave={craftSave} />
      </Tab>
    </Tabs>
  </PageGen>
);

const NavItem = () => <PageGen.Nav name={name} />;

export default Object.assign(Crafts, { Nav: NavItem });
