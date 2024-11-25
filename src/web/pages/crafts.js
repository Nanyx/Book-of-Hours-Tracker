import * as React from 'react';
import {useEffect, useState} from 'react';
import * as ls from 'local-storage';
import { Tab, Row, Col, Nav } from 'react-bootstrap';

import pageGen from '../layouts/pages';

import {crafts, aspects, levels} from '../../data/crafts.json';

const lsCrafts = "crafts";
const lsBooks = "books";
/** @type {[]} */
const library = ls.get(lsBooks);
class CraftLoc {
  constructor(id, learn = false){
    this.id = id;
    this.learn = learn;
  }
}

const Crafts = () => {
  let [crafts, setCrafts] = useState([]);
  let [skills, setSkills] = useState([]);

  useEffect(() => {
    setSkills(library.filter(b => b.read).filter((s, i, a) => a.map(e => e.id).indexOf(s.id) === i));
    setCrafts((ls.get(lsCrafts) || []).map(c => Object.assign(new CraftLoc(), c)));
  }, []);

  return (
    <>
      <Tab.Container>
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              {skills.map(s => <SkillPill key={s.id} name={s.id}/>)}
            </Nav>
          </Col>
          <Col>
            <Tab.Content>
              
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
}

const SkillPill = ({id, name}) => (
  <Nav.Item>
    <Nav.Link eventKey={id}>{name}</Nav.Link>
  </Nav.Item>
);

const CraftRow = ({id, skills}) => {
  return (
    <tr>
      <td></td>
    </tr>
  );
}

export default pageGen("Crafts", <Crafts/>);