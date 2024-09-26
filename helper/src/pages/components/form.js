import { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Form, FormGroup, FormLabel, FormControl, FormSelect } from 'react-bootstrap';

import Book from '../../models/book';
import BookTypes from '../../data/book-types.json';
import Principles from '../../data/principles.json';
import { lessons as Skills } from '../../data/skills.json';
import { list as Memories } from '../../data/memories.json';

const AppForm = () => {
  const [book, setBook] = useState(new Book());

  function edit(prop, value) {
    book[prop] = value;
    setBook({...book});
  }

  Memories.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));
  return (
    <>
      <Form>
        <FormGroup className="mb-3">
          <FormLabel>Name{book.id && ` (${book.id})`}</FormLabel>
          <FormControl onChange={(e) => edit("name", e.currentTarget.value)} value={book.name}/>
        </FormGroup>
        
        <Row className="mb-3">
          <Col>
            <FormSelect value={book.type} onChange={(e) => edit("type", parseInt(e.currentTarget.value))}>
              {BookTypes.map(({id, name}) => <option key={id} value={id}>{name}</option>)}
            </FormSelect>
          </Col>
          <Col>
            <Row>
              <Col xs={9}>
                <FormSelect value={book.mastery} onChange={(e) => edit("mastery", parseInt(e.currentTarget.value))}>
                  {Principles.map(({id, name}) => <option key={id} value={id}>{name}</option>)}
                </FormSelect>
              </Col>
              <Col xs={3}>
                <FormSelect value={book.mystery} onChange={(e) => edit("mystery", parseInt(e.currentTarget.value))}>
                  <option value={4}>4</option>
                  <option value={6}>6</option>
                  <option value={8}>8</option>
                  <option value={10}>10</option>
                  <option value={12}>12</option>
                  <option value={14}>14</option>
                  <option value={16}>16</option>
                  <option value={18}>18</option>
                  <option value={21}>21</option>
                </FormSelect>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <FormSelect value={book.skill} onChange={(e) => edit("skill", parseInt(e.currentTarget.value))}>
              {Skills.map(({id, name}) => <option key={id} value={id}>{name}</option>)}
            </FormSelect>
          </Col>
          <Col>
            <FormSelect value={book.memory} onChange={(e) => edit("memory", parseInt(e.currentTarget.value))}>
              {Memories.map(({id, name}) => <option key={id} value={id}>{name}</option>)}
            </FormSelect>
          </Col>
        </Row>
      </Form>

      <div><pre>{JSON.stringify(book, null, 2)},</pre></div>
      <div>
        <textarea style={{width:"100%"}} rows={30}/>
      </div>
    </>
  );
}

export default AppForm;