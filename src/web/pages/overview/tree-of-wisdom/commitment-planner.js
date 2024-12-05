import * as React from 'react';
import * as ls from 'local-storage';
import { useState, useEffect } from 'react';
import { InputGroup, Form, Card, Row, Col, Table, Button } from 'react-bootstrap';

import skillsDB from '../../../../data/skills.json';
import booksDB from '../../../../data/books.json';
import wisdomsDB from '../../../../data/wisdoms.json';
import elementsDB from '../../../../data/elements.json';
import journalsDB from '../../../../data/journals.json';

class CommitLoc {
  constructor (sid, wid, lv) {
    this.sid = sid;
    this.wid = wid;
    this.lv = lv;
  }
}

let wisdoms = Array.from(wisdomsDB.list);
wisdoms.sort((a, b) => a.name < b.name ? -1 : 1);

const lsCommits = "commits";
const lsBooks = "books";
const lsStart = "begining";
const lsSecrets = "secrets";

let defaultYouKnow = [{id:7, val:false}, {id:9, val: false}];
let secrets = ls.get(lsSecrets) ?? {};

const Planner = () => {
  const [commits, setCommits] = useState([]);
  const [skillsKnowed, setSK] = useState([]);

  const [sSkill, setSkill] = useState(0);
  const [sWisdom, setWisdom] = useState(9);
  const [sLv, setLv] = useState(1);

  const [youKnow, setYK] = useState(defaultYouKnow);

  const start = ls.get(lsStart);

  useEffect(() => {
    let sk = skillsDB.lessons.filter(s => booksDB.books.filter(item => 
      (ls.get(lsBooks) ?? [])
      .filter(b => b.read)
      .map(b => b.id)
      .indexOf(item.id) != -1
    ).map(b => b.skill)
    .filter((s, i, a) => a.indexOf(s) === i)
    .indexOf(s.id) != -1);

    if(start) {
      journalsDB.find(j => j.id === start.bid).skills.forEach(id => {
        if(!sk.map(s => s.id).includes(id)) sk.push(skillsDB.lessons.find(s => s.id === id));
      });
    }

    setSK(sk);
    setYK(secrets?.elements ?? youKnow);
    setCommits((ls.get(lsCommits) ?? []).map(c => Object.assign(new CommitLoc(), c)));
  }, []);

  useEffect(() => {
    secrets.elements = youKnow;
    ls.set(lsSecrets, secrets);
    ls.set(lsCommits, commits); 
  }, [commits, youKnow]);

  const save = () => {
    setYK([...youKnow]);
    setCommits([...commits]);    
  }

  const changeSelectWisdom = (id) => {
    setSkill(0);
    setWisdom(id);
  }

  const btnCommit = () => {
    let index = commits.findIndex(c => c.wid === sWisdom && c.lv === sLv);
    if (index != -1) { commits.splice(index, 1); }
    index = commits.findIndex(c => c.sid === sSkill);
    if (index != -1) { commits.splice(index, 1); }

    commits.push(new CommitLoc(sSkill, sWisdom, sLv));
    save();
  }

  const checkSecret = (id) => {
    let index = youKnow.findIndex(y => y.id === id);
    youKnow[index].val = !youKnow[index].val;
    save();
  }

  const optimalEvolve = () => {
    const skills = commits.map(c => skillsDB.lessons.find(s => s.id === c.sid));
    let elemIDs = skills.map(s => s.wisdoms.find(w => w.wisdom === commits.find(c => c.sid === s.id).wid).element);
    let optim = elementsDB.map(e => ({eid: e.id, name:e.name, qte: elemIDs.filter(ids => ids === e.id).length}));
    optim[optim.findIndex(o => o.eid === 5)].qte += 1;

    if(start) { 
      optim = optim.map(o => ({...o, qte: start.eids.includes(o.eid) ? o.qte + 1 : o.qte}));
      optim[optim.findIndex(o => o.eid === journalsDB.find(j => j.id === start.bid).element)].qte += 1;
    }

    optim.sort((a, b) => a.name < b.name ? -1 : 1);
    return optim;
  };

  return (
    <section>
      <h4>Commitment Planner</h4>

      <Card className='mb-3'>
        <InputGroup className='planner-selection'>
        <InputGroup.Text>To</InputGroup.Text>
          <Form.Select value={sWisdom} onChange={(e) => changeSelectWisdom(parseInt(e.target.value))}>
            {wisdoms.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
          </Form.Select>
          <InputGroup.Text>I commit</InputGroup.Text>
          <Form.Select value={sSkill} onChange={(e) => setSkill(parseInt(e.target.value))}>
            <option value={0}>Nothing</option>
            {skillsKnowed.filter(s => 
              s.wisdoms.map(w => w.wisdom).includes(sWisdom))
              .map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </Form.Select>
          <InputGroup.Text>at rank</InputGroup.Text>
          <Form.Select  value={sLv} onChange={(e) => setLv(parseInt(e.target.value))}>
            {Array.from({length: 9}, (_, i) => i + 1).map(i => <option key={i} value={i}>{i}</option>)}
          </Form.Select>
          <InputGroup.Text>reward me</InputGroup.Text>
          {sSkill != 0 ?
          <ElementGiven {...elementsDB.find(e => 
            skillsDB.lessons.find(s => s.id === sSkill)
            .wisdoms.find(w => w.wisdom === sWisdom).element === e.id)}
          /> : 
          <InputGroup.Text>Nothing</InputGroup.Text>}
          <Button onClick={() => btnCommit()} disabled={sSkill === 0}>I Commit</Button>
        </InputGroup>
        <Table className='mb-0' bordered striped size='sm'>
          <thead>
            <tr>
              <th>Wisdom</th>
              <th className='text-center'>Rank</th>
              <th>Skill</th>
              <th>Element</th>
            </tr>
          </thead>
          <tbody>
            {commits.map((c, i) => <TableItem key={i} {...c}/>)}
          </tbody>
        </Table>
      </Card>
      <Table className='text-center' striped bordered size='sm'>
            <thead>
              <tr>
                <th>Element</th>
                <th className='col-1'>+++</th>
                <th className='col-1'>++</th>
                <th className='col-1'>+</th>
                <th className='col-1'></th>
                <th>Total</th>
                <th className='col-2'>You Know</th>
              </tr>
            </thead>
            <tbody>
              {optimalEvolve().map((elem, i) => <EvolveSection key={i} secret={youKnow.find(y => y.id === elem.eid)?.val ?? null} {...elem} save={checkSecret}/>)}
            </tbody>
          </Table>
    </section>
  );
}

const ElementGiven = ({name, color}) => <InputGroup.Text style={{backgroundColor: color}}>{name}</InputGroup.Text>

const TableItem = ({sid, wid, lv}) => { 
  const skill = skillsDB.lessons.find(s => s.id === sid);
  const elem = elementsDB.find(e => e.id === skill.wisdoms.find(w => w.wisdom === wid).element);
  return (
    <tr>
      <td>{wisdomsDB.list.find(w => w.id === wid).name}</td>
      <td className='text-center'>{lv}</td>
      <td>{skill.name}</td>
      <td className='text-center' style={{backgroundColor: elem.color}}>{elem.name}</td>
    </tr>
  );
};

const EvolveSection = ({eid, qte, secret, save}) => {
  const elem = elementsDB.find(e => e.id === eid);
  if(secret) { qte += 1; }
  return (
    <tr>
      <td style={{backgroundColor: elem.color}}>{elem.name}</td>
      <td>{Math.floor(qte / 8)}</td>
      <td>{Math.floor((qte % 8) / 4)}</td>
      <td>{Math.floor(((qte % 8) % 4) / 2)}</td>
      <td>{Math.floor(((qte % 8) % 4) % 2)}</td>
      <td>{qte}</td>
      { typeof(secret) === "boolean" ? 
      <td><Form.Check onChange={() => save(eid)} checked={secret}/></td> : 
      <td></td>}
    </tr>
  );
}

export default Planner;