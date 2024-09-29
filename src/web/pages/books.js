import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import * as ls from 'local-storage';
import { Tooltip, OverlayTrigger, Table } from 'react-bootstrap';
import {Typeahead} from 'react-bootstrap-typeahead';

import './books.css';

import pageGen from '../layouts/pages';

import booksData from '../../data/books.json';
import memsData from '../../data/memories.json';
import skillsData from '../../data/skills.json';
import principles from '../../data/principles.json';
const completeLib = booksData.books;
const memories = memsData.list;
const skills = skillsData.lessons;

const lsName = "books";
class BookLoc {
  constructor(id, read = false) {
    this.id = id;
    this.read = read;
  }
}

/** @type {BookLoc[]} */
let library = ls.get(lsName) || [];

completeLib.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);

const Books = () => { 
  const [libState, setLibState] = useState([]);
  const [sortItem, setSortItem] = useState();
  const typeRef = useRef(null);

  useEffect(() => { 
    setLibState(library.map(b => 
      Object.assign(new BookLoc(), b)
    ));
  }, []);
  
  useEffect(() => {
    ls.set(lsName, libState);
  }, [libState]);

  const categorise = (id) => {
    if(!libState.find((b) => b.id === id)) {
      console.log(new BookLoc(id));
      libState.push(new BookLoc(id));
      console.log(libState);
      save();
      clearField();
    };
  }

  const learn = (id) => {
    let i = libState.findIndex(b => b.id === id);
    if(i != -1) {
      libState[i].read = true;
      save();
    }
  }

  const burn = (id) => {
    let i = libState.findIndex(b => b.id === id);
    if(i != -1) {
      libState.splice(i, 1);
      save();
    }
  }

  const clearField = () => typeRef.current?.clear();

  const save = () => setLibState([...libState]);

  let libSorted = libState.map(l => { 
    let book = completeLib.find(b => b.id === l.id);
    let mem = memories.find(m => m.id === book.memory);
    return {name: book.name, memory: mem.name, ...l};
  });

  libSorted.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);

  if(sortItem === "memory"){
    libSorted.sort((a, b) => a.memory.toLowerCase() < b.memory.toLowerCase() ? -1 : 1);
    libSorted.sort((a, b) => !b.read ? -1 : 1);
  }

  return (
    <>
      <Typeahead 
        id="lib-search"
        className='th-table-fit'
        placeholder="Speak the book's name"
        onChange={(selected) => {
          if (selected.length === 1) {
            categorise(selected[0].id);
          }
        }}
        ref={typeRef}
        onBlur={clearField}
        options={completeLib.map(({id, name}) => ({id, label: name}))}
      />

      <Table striped bordered hover size="sm" className="align-middle" style={{marginTop:"-1px"}}>
        <thead>
          <tr>
            <th style={{width:"40%", cursor:"pointer"}} onClick={() => setSortItem("name")}>Name</th>
            <Head>Mastery</Head>
            <Head>Mystery</Head>
            <Head>Skill</Head>
            <Head style={{cursor:"pointer"}} onClick={() => setSortItem("memory")}>Memory</Head>
            <Head>Burn</Head>
          </tr>
        </thead>
        <tbody>
          {console.log(libSorted)}
          {libSorted.map(b => <Book key={b.id} learn={learn} burn={burn} {...b}/>)}
        </tbody>
      </Table>
    </>
  );
}

const Head = ({children, style, onClick = () => {}}) => <th className='text-center' style={style} onClick={onClick}>{children}</th>

const Book = ({id, cat, read, learn = () => {}, burn = () => {}}) => {
  const book = completeLib.find(b => b.id === id);

  /**
   * @param {[]} ids
   * @return {string} 
   */
  const getGradient = (ids) => {
    let lst = principles.filter(p => ids.includes(p.id));
    return lst.map((p, i) => {
      let percent = 100/lst.length;
      return i == 0 ? 
        `${p.color} ${percent}%, ${p.color} ${percent}%`:
        `${p.color} ${percent*i}%, ${p.color} ${percent*(i+1)}%`;
    }).join(", ");
  }

  const renderTT = (p, props) => {
    return <Tooltip {...props}>
      {principles.filter(pr => p.map(pp => pp.principle).includes(pr.id)).map(pr => `${pr.name} ${p.find(item => item.principle == pr.id).lv}`).join(" / ")}
    </Tooltip>
  };

  const principle = principles.find((m) => m.id == book.mastery);
  const mem = memories.find((m) => m.id == book.memory);
  return (
    <tr>
      <td>{book.name}</td>
      <td className="text-center" style={{backgroundColor:principle.color}}>{principle.name}</td>
      <td className='text-center'>{book.mystery}</td>
      {!read && <td className='table-primary text-center' style={{cursor:"pointer"}} colSpan={2} onClick={() => learn(id)}>Read</td>}
      {read && <>
        <td className="text-center">{skills.find((s) => s.id == book.skill).name}</td>
        <OverlayTrigger
          placement='left'
          delay={{show:150, hide:500}}
          overlay={(props) => renderTT(mem.principles, props)}
        ><td className="text-center" style={{background:`linear-gradient(110deg, ${getGradient(mem.principles.map(p => p.principle))})`}}>{mem.name}</td></OverlayTrigger>
      </>}
      <td className='text-center table-danger' style={{cursor:"pointer"}} onClick={() => burn(id)}><i className="bi bi-fire"></i></td>
    </tr>
  );
}

export default pageGen("Books", <Books/>);
