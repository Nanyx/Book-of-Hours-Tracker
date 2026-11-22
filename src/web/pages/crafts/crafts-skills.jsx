import { Tab, Row, Col, Nav } from "react-bootstrap";

import PrincipleTable from "./components/principle-table";
import { getSkillLearned } from "../../../helpers/skills";

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

  const sidePills = (
    <Tab.Container>
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            {skills.map((s) => (
              <SkillPill key={s.id} id={s.id} name={s.name} />
            ))}
          </Nav>
        </Col>
        <Col>
          <Tab.Content>
            {skills.map((s) => (
              <SkillPane key={s.id} skill={s} craftList={getCraftList(s.rid)} />
            ))}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );

  const topPills = (
    <Tab.Container>
      <div className="mb-3">
        <Nav variant="pills">
          {skills.map((s) => (
            <SkillPill key={s.id} id={s.id} name={s.name} />
          ))}
        </Nav>
      </div>
      <div>
        <Tab.Content>
          {skills.map((s) => (
            <SkillPane key={s.id} skill={s} craftList={getCraftList(s.rid)} />
          ))}
        </Tab.Content>
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
