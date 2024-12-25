import * as React from 'react';
import * as ls from 'local-storage';
import { useState, useEffect, useRef } from 'react';
import { Table } from 'react-bootstrap';
import {Typeahead} from 'react-bootstrap-typeahead';

import './visitors.css';

const lsName = 'visitors';

import pageGen from '../layouts/pages';

import visitorsDB from '../../data/visitors.json';
import principlesDB from '../../data/principles.json';
import elementsDB from '../../data/elements.json'
import languagesDB from '../../data/languages.json';

const Check = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={25} height={25}>
    <path fill="whitesmoke" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
  </svg>
);

const Visitors = () => {
  const [visitorsState, setState] = useState([]);
  const [sortVisitors, setSort] = useState(0);
  const typeRef = useRef(null);

  useEffect(() => {
    setState(ls.get(lsName) ?? []);
  }, []);

  useEffect(() => {
    ls.set(lsName, visitorsState);
  }, [visitorsState]);
  
  const save = () => {
    setState([...visitorsState]);
  }

  const acquaint = (id) => {
    if(!visitorsState.includes(id)) visitorsState.push(id);
    clearField();
    save();
  }

  const clearField = () => typeRef.current?.clear();

  let visitors = visitorsDB.filter(v => visitorsState.includes(v.id));
  visitors.sort((a, b) => a.name < b.name ? -1 : 1);

  return (
    <>
      <Typeahead
        id="lib-search"
        className='th-table-fit'
        placeholder='The name of the acquainted'
        onChange={(selected) => { if(selected.length === 1) acquaint(selected[0].id); }}
        ref={typeRef}
        onBlur={clearField}
        options={visitorsDB.map(({id, name}) => ({id, label: name}))}
      />
      <Table striped bordered hover size='sm' style={{marginTop:"-1px"}}>
        <thead>
          <tr>
            <th rowSpan={2} className='align-middle'>Name</th>
            <th rowSpan={2} colSpan={2} className='align-middle text-center'>Interests</th>
            <th colSpan={2} className='text-center'>Preferences</th>
            <th rowSpan={2} colSpan={2} className='align-middle text-center'>Topics</th>
          </tr>
          <tr>
            <th className='text-center'>Food</th>
            <th className='text-center'>Drink</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map(v => <TableItem key={v.id} visitor={v}/>)}
        </tbody>
      </Table>
      <Table bordered striped hover>
        <thead>
          <tr>
            <th rowSpan={2} className='align-middle text-center'>Name</th>
            <th colSpan={10} className='text-center'>languages</th>
          </tr>
          <tr>
            {languagesDB.filter(l => l.toLearn).map(l => <th className='text-center' key={l.id}>{l.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {visitors.map(v => <LangTableItem key={v.id} visitor={v} toLearn={true}/>)}
        </tbody>
      </Table>
      <Table bordered striped hover>
        <thead>
          <tr>
            <th rowSpan={2} className='align-middle text-center'>Name</th>
            <th colSpan={5} className='text-center'>languages</th>
          </tr>
          <tr>
            {languagesDB.filter(l => !l.toLearn).map(l => <th className='text-center' key={l.id}>{l.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {visitors.map(v => <LangTableItem key={v.id} visitor={v} toLearn={false}/>)}
        </tbody>
      </Table>
    </>
  );
}

const TableItem = ({visitor}) => (
  <tr>
    <td>{visitor.name}</td>
    {principlesDB.filter(p => visitor.interests.includes(p.id)).map(p => <TableColorCell key={p.id} color={p.color}>{p.name}</TableColorCell>)}
    {visitor.numatic ? <td colSpan={4}></td> : (
      <>
        {visitor.preferences.food === visitor.preferences.drink ? (
          <TablePrefCell colSpan={2} principleID={visitor.preferences.food}/>
        ) : (
          <>
            <TablePrefCell principleID={visitor.preferences.food}/>
            <TablePrefCell principleID={visitor.preferences.drink}/>
          </>
        )}
        {elementsDB.filter(e => visitor.topics.includes(e.id)).map(e => <TableColorCell key={e.id} color={e.color}>{e.name}</TableColorCell>)}
      </>
    )}
  </tr>
);

const TablePrefCell = ({principleID, ...rest}) => {
  const principle = principlesDB.find(e => e.id === principleID);
  return typeof(principleID) === "number" ? 
  (<TableColorCell color={principle?.color} {...rest}>{principle?.name}</TableColorCell>) : 
  (<td className='text-center' {...rest}>{principleID}</td>);
};

const TableColorCell = ({color, children, ...rest}) => <td className='text-center' style={{backgroundColor: color}} {...rest}>{children}</td>;

const LangTableItem = ({visitor, toLearn}) => (
  <tr>
    <td>{visitor.name}</td>
    {languagesDB.filter(l => l.toLearn === toLearn).map(l => <td key={l.id} className='text-center align-middle'>{visitor.languages.includes(l.id) ? <Check/> : ""}</td>)}
  </tr>
);

export default pageGen("Visitors", <Visitors/>);