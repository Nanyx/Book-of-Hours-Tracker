import * as React from 'react';
import * as ls from 'local-storage';
import { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

import elementsDB from "../../../data/elements.json";
import journalsDB from '../../../data/journals.json';

class Begining {
  constructor (eids, bid) {
    this.eids = eids;
    this.bid = bid;
  }
}

const lsStart = "begining";

const Onboarding = () => {
  const set1 = [1, 2, 3];
  const set2 = [4, 6, 8, 9];
  const [elem1, setElem1] = useState(1);
  const [elem2, setElem2] = useState(4);
  const [book, setBook] = useState(0);
  const [showOnboarding, setOnboarding] = useState(false);
  
  useEffect(() => {
    if(!ls.get(lsStart)) setOnboarding(true);
  }, []);

  const completeOboarding = () => {
    ls.set(lsStart, new Begining([7, elem1, elem2], book));
    window.location.reload();
  }

  return (
    <Modal centered backdrop="static" show={showOnboarding}>
      <Modal.Header>I drowned ...</Modal.Header>
      <Modal.Body>
        <Form>
          <div>... and woke up on the beach of Cucurbit with my Health,</div>
          <Row>
            <Col>my</Col>
            <ElementSet set={set1} select={elem1} onChange={setElem1}/>
            <Col>and my</Col>
            <ElementSet set={set2} select={elem2} onChange={setElem2}/>
          </Row>
          <Row>
            <Col>I kept my</Col>
            <Journal select={book} onChange={setBook}/>
            <Col>close to me.</Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' disabled={book === 0} onClick={() => completeOboarding()}>I'am alive. I beging anew.</Button>
      </Modal.Footer>
    </Modal>
  );
}

const ElementSet = ({set, select, onChange}) => {
  let elems = elementsDB.filter(e => set.includes(e.id));
  elems.sort((a, b) => a.name < b.name ? -1 : 1);

  return (
    <Col>
      <Form.Select value={select} onChange={(e) => onChange(parseInt(e.target.value))}>
        {elems.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
      </Form.Select>
    </Col>
  );
};

const Journal = ({select, onChange}) => {
  journalsDB.sort((a, b) => a.name < b.name ? -1 : 1);
  return (
    <Col>
      <Form.Select value={select} onChange={(e) => onChange(parseInt(e.target.value))}>
        <option value={0}>... what was the name ...</option>
        {journalsDB.map(j => <option key={j.id} value={j.id}>{j.name}</option>)}
      </Form.Select>
    </Col>
  );
}

export default Onboarding;