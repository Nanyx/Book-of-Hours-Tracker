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

class CraftLoc {
  constructor(sid, pid, lv, rid){
    this.sid = sid;
    this.pid = pid;
    this.lv = lv;
    this.rid = rid;
  }
}

const Crafts = () => {
  const [craftsState, setCrafts] = useState([]);
  const [skills, setSkills] = useState([]);

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

  const learn = (skillID, lv, principle, reqID) => {
    let skillCraft = skillsDB.lessons.find(s => s.id === skillID).crafts.find(c => 
      c.level === lv && 
      c.principle === principle && 
      c.req === reqID
    );
    if(skillCraft && !craftsState.find(c => c.sid === skillID && c.pid === principle && c.rid === reqID)) {
      craftsState.push(new CraftLoc(skillID, principle, lv, reqID));
      console.log("should save", craftsState);
      save();
    };
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
              {skills.map(s => <SkillPane key={s.id} id={s.id} craftsState={craftsState.filter(cs => cs.sid === s.id)} learn={learn}/>)}
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

const SkillPane = ({id, craftsState, learn}) => { 
  const [level, setLevel] = useState(1);
  const [principle, setPrinciple] = useState();
  const [req, setReq] = useState(1);

  const getPrinciples = () => principlesDB.filter(p => 
    skillsDB.lessons.find(s => s.id === id).crafts.map(c => c.principle)
    .filter((c, i, a) => a.indexOf(c) === i).indexOf(p.id) != -1);

  useEffect(() => setPrinciple(getPrinciples()[0].id), []);

  const getCraft = (pid) => {
    let sc = craftsState.filter(s => s.pid === pid);
    console.log("sc", sc);
    let lst = skillsDB.lessons.find(s => s.id === id).crafts.filter(c => c.principle === pid);
    console.log("pass 1", lst);
    lst = lst.filter(c => sc.find(elem => elem.lv === c.level && elem.rid === c.req));
    return lst;
  }

  return (
    <Tab.Pane eventKey={id}>
      <InputGroup className='mb-3'>
        <InputGroup.Text>As a</InputGroup.Text>
        <Form.Select value={level} onChange={(e) => setLevel(parseInt(e.target.value))}>
          {craftsDB.level.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
        </Form.Select>
        <InputGroup.Text>of</InputGroup.Text>
        <Form.Select value={principle} onChange={(e) => setPrinciple(parseInt(e.target.value))}>
          {getPrinciples().map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </Form.Select>
        <InputGroup.Text>I am using</InputGroup.Text>
        <Form.Select value={req} onChange={(e) => setReq(parseInt(e.target.value))}>
          {craftsDB.reqs.map(r => <option key={r.id} value={r.id}>{r.name}</option>)} 
        </Form.Select>
        <Button onClick={() => learn(id, level, principle, req)}>Craft</Button>
      </InputGroup>
      {getPrinciples().map(p => <PrincipleTable key={p.id} crafts={getCraft(p.id)} {...p}/>)}
    </Tab.Pane>
  );
}

const PrincipleTable = ({name, color, crafts}) => {

  return (
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
          {crafts.map((c, i) => <PrincipleTableRow key={i} {...c} />)}
        </tbody>
      </Table>
    </Card>
)
};

const PrincipleTableRow = ({id, req}) => {
  const craft = craftsDB.crafts.find(c => c.id === id);
  return (
    <tr>
      <td>{craftsDB.reqs.find(r => r.id === req).name}</td>
      <PrincipleTT principleList={craft.principles}>
        <GradiantCell principles={craft.principles.map(p => p.principle)}>{craft.name}</GradiantCell>
      </PrincipleTT>
    </tr>
);
}

export default pageGen("Crafts", <Crafts/>);