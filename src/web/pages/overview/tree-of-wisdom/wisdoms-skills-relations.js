import * as React from 'react';
import * as ls from 'local-storage';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

import skillsDB from '../../../../data/skills.json';
import booksDB from '../../../../data/books.json';
import wisdomsDB from '../../../../data/wisdoms.json';
import elementsDB from '../../../../data/elements.json';
import journalsDB from '../../../../data/journals.json';

const lsBooks = "books";
const lsStart = "begining";

const WisdomSkillRel = () => {
  const [skillKnowed, setSK] = useState([]);
  const [sortBy, setSort] = useState(1);

  useEffect(() => {
    let sk = skillsDB.lessons.filter(s => booksDB.books.filter(item => 
      (ls.get(lsBooks) || [])
      .filter(b => b.read)
      .map(b => b.id)
      .indexOf(item.id) != -1
    ).map(b => b.skill)
    .filter((s, i, a) => a.indexOf(s) === i)
    .indexOf(s.id) != -1);
    
    let start = ls.get(lsStart);
    if(start) {
      journalsDB.find(j => j.id === start.bid).skills.forEach(id => {
        if(!sk.map(s => s.id).includes(id)) sk.push(skillsDB.lessons.find(s => s.id === id));
      });
    }

    setSK(sk);
  }, []);

  const getContent = () => {
    let rows = [];
    skillKnowed.forEach(s => {
      rows.push({sName: s.name, wName: wisdomsDB.list.find(w => w.id === s.wisdoms[0].wisdom).name, elem: elementsDB.find(e => e.id === s.wisdoms[0].element)});
      rows.push({sName: s.name, wName: wisdomsDB.list.find(w => w.id === s.wisdoms[1].wisdom).name, elem: elementsDB.find(e => e.id === s.wisdoms[1].element)});
    });
    
    switch(sortBy){
      case 2:
        rows.sort((a, b) => a.wName < b.wName ? -1 : 1);
        return rows.map((r, i) => <TableRow key={i} {...r}/>);
      case 3:
        rows.sort((a, b) => a.elem.name < b.elem.name ? -1 : 1);
        return rows.map((r, i) => <TableRow key={i} {...r}/>);
      default: 
        skillKnowed.sort((a, b) => a.name < b.name ? -1 : 1);
        return skillKnowed.map(s => <SortBySkill key={s.id} {...s}/>);
    }
  }

  return (
    <section>
      <h4>Wisdoms and Skills Relations</h4>
      <Table className='text-center' bordered>
        <thead>
          <tr style={{cursor: "pointer"}}>
            <th onClick={() => setSort(1)}>Skill</th>
            <th onClick={() => setSort(2)}>Wisdom</th>
            <th onClick={() => setSort(3)}>Element</th>
          </tr>
        </thead>
        <tbody>
          {getContent()}
        </tbody>
      </Table>
    </section>
  );
}

const SortBySkill = ({name, wisdoms}) => {

  let wis = wisdoms.map(w => ({
    wisdom: wisdomsDB.list.find(elem => elem.id === w.wisdom), 
    element: elementsDB.find(elem => elem.id === w.element)
  }));

  return (
    <>
      <tr>
        <td className='align-middle' rowSpan={2}>{name}</td>
        <td>{wis[0].wisdom.name}</td>
        <td style={{backgroundColor: wis[0].element.color}}>{wis[0].element.name}</td>
      </tr>
      <tr>
        <td>{wis[1].wisdom.name}</td>
        <td style={{backgroundColor: wis[1].element.color}}>{wis[1].element.name}</td>
      </tr>
    </>
  )
};

const TableRow = ({sName, wName, elem}) => (
  <tr>
    <td>{sName}</td>
    <td>{wName}</td>
    <td style={{backgroundColor: elem.color}}>{elem.name}</td>
  </tr>
);

export default WisdomSkillRel;