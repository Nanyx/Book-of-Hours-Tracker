import * as React from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";

import { getSkillLearned } from "../../../helpers/skills";

import PrincipleTable from "./components/principle-table";

import crafting from "../../../data/crafting.json";
import principlesDB from "../../../data/principles.json";

const CraftsSkills = ({ craftSave }) => {
  let skills = getSkillLearned(craftSave);

  let getCraftList = (skillRid) =>
    crafting.filter((c) =>
      craftSave
        .filter((cid) => cid.includes(skillRid.substring(1)))
        .includes(c.id),
    );

  const topPills = (
    <Tab.Container>
      <div className="mb-3">
        <Nav variant="pills"></Nav>
      </div>
      <div>
        <Tab.Content></Tab.Content>
      </div>
    </Tab.Container>
  );

  return topPills;
};

const SkillPill = ({ id, name }) => (
  <Nav.Item>
    <Nav.Link eventKey={id}>{name}</Nav.Link>
  </Nav.Item>
);

const SkillPane = ({ skill, craftList }) => {
  const getPrinciples = () => [
    ...new Set(
      craftList.map((c) =>
        principlesDB.find((p) => p.name.toLowerCase() == c.principle),
      ),
    ),
  ];

  const getCrafts = (principle) => {
    return craftList.filter((c) => c.principle == principle);
  };

  return (
    <Tab.Pane eventKey={skill.id}>
      {getPrinciples().map((p) => (
        <PrincipleTable
          key={p.id}
          crafts={getCrafts(p.name.toLowerCase())}
          {...p}
        />
      ))}
    </Tab.Pane>
  );
};

export default CraftsSkills;
