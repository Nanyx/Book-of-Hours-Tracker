import * as React from 'react';
import {useEffect, useState, useRef} from 'react';
import * as ls from 'local-storage';
import { Tab, Row, Col, Nav, Form, InputGroup, Button, Card, Table } from 'react-bootstrap';

import './crafts.css';

import PrincipleTT from './components/principle-tooltip';
import GradiantCell from './components/gradiant-cell';

import pageGen from '../layouts/pages';

import booksDB from '../../data/books.json';
import skillsDB from '../../data/skills.json';
import craftsDB from '../../data/crafts.json';
import principlesDB from '../../data/principles.json';

const lsCrafts = "crafts";
const lsBooks = "books";
let reqDS = skillsDB.lessons.map(s => s.crafts.map(c => c.req)).flat().filter(r => r).filter((r, i, a) => a.indexOf(r) === i);
reqDS.sort();
reqDS = ["Nothing", ...reqDS];

class CraftLoc {
  constructor(id, learn = false){
    this.id = id;
    this.learn = learn;
  }
}

const Crafts = () => {
  const [craftsState, setCrafts] = useState([]);
  const [skills, setSkills] = useState([]);
  const [level, setLevel] = useState(1);
  const [principle, setPrinciple] = useState();
  const [req, setReq] = useState("Nothing");

  useEffect(() => {
    let knowedSkillsId = booksDB.books.filter(item => 
      ls.get(lsBooks)
      .filter(b => b.read)
      .map(b => b.id)
      .indexOf(item.id) != -1
    ).map(b => b.skill).filter((s, i, a) => a.indexOf(s) === i);

    setSkills(skillsDB.lessons.filter(s => knowedSkillsId.indexOf(s.id) != -1 ));
    setCrafts((ls.get(lsCrafts) || []).map(c => Object.assign(new CraftLoc(), c)));
  }, []);

  useEffect(() => {
    ls.set(lsCrafts, craftsState);
  }, [craftsState]);

  const learn = (skillID, craftID) => {
  };

  const save = () => setCrafts([...craftsState]);

  return (
    <>
      <Tab.Container>
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              {skills.map(s => <SkillPill key={s.id} id={s.id} name={s.name}/>)}
            </Nav>
          </Col>
          <Col>
            <Tab.Content>
              {skills.map(s => <SkillPane key={s.id} id={s.id} crafts={s.crafts}/>)}
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

const SkillPane = ({id, crafts}) => { 

  const getPrinciples = () => principlesDB.filter(p => 
    crafts.map(c => c.principle)
    .filter((c, i, a) => a.indexOf(c) === i).indexOf(p.id) != -1);

  return (
    <Tab.Pane eventKey={id}>
      <InputGroup className='mb-3'>
        <InputGroup.Text>As a</InputGroup.Text>
        <Form.Select>
          {craftsDB.level.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
        </Form.Select>
        <InputGroup.Text>of</InputGroup.Text>
        <Form.Select className='principle'>
          {getPrinciples().map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </Form.Select>
        <InputGroup.Text>I am using</InputGroup.Text>
        <Form.Select>
          {reqDS.map((opt, i) => <option key={i}>{opt}</option>)}
        </Form.Select>
        <Button>Craft</Button>
      </InputGroup>
      {getPrinciples().map(p => <PrincipleTable key={p.id} crafts={crafts.filter(c => c.principle === p.id)} {...p}/>)}
    </Tab.Pane>
  );
}

const PrincipleTable = ({name, color, crafts}) => (
  <Card className='mb-2'>
    <Card.Header style={{backgroundColor:color}}>{name}</Card.Header>
    <Table className='mb-0' striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Requierment</th>
          <th className='text-center'>Name</th>
        </tr>
      </thead>
      <tbody>
        {crafts.map(c => <PrincipleTableRow key={c.id} {...c} />)}
      </tbody>
    </Table>
  </Card>
);

const PrincipleTableRow = ({id, req}) => {
  const craft = craftsDB.crafts.find(c => c.id === id);
  return (
    <tr>
      <td>{req ? req : ""}</td>
      <PrincipleTT principleList={craft.principles}>
        <GradiantCell principles={craft.principles.map(p => p.principle)}>{craft.name}</GradiantCell>
      </PrincipleTT>
    </tr>
);
}

export default pageGen("Crafts", <Crafts/>);