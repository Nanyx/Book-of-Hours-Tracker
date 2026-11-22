import { useState } from "react";
import { Table } from "react-bootstrap";

import wisdomsDB from "../../../data/wisdoms.json";
import elementsDB from "../../../data/elements.json";

const WisdomSkillRel = ({ skillsKnown }) => {
  const [sortBy, setSort] = useState(1);

  const getContent = () => {
    let rows = [];
    skillsKnown.forEach((s) => {
      rows.push({
        sName: s.name,
        wName: wisdomsDB.list.find((w) => w.id === s.wisdoms[0].wisdom).name,
        elem: elementsDB.find((e) => e.id === s.wisdoms[0].element),
      });
      rows.push({
        sName: s.name,
        wName: wisdomsDB.list.find((w) => w.id === s.wisdoms[1].wisdom).name,
        elem: elementsDB.find((e) => e.id === s.wisdoms[1].element),
      });
    });

    switch (sortBy) {
      case 2:
        rows.sort((a, b) => (a.wName < b.wName ? -1 : 1));
        return rows.map((r, i) => <TableRow key={i} {...r} />);
      case 3:
        rows.sort((a, b) => (a.elem.name < b.elem.name ? -1 : 1));
        return rows.map((r, i) => <TableRow key={i} {...r} />);
      default:
        skillsKnown.sort((a, b) => (a.name < b.name ? -1 : 1));
        return skillsKnown.map((s) => <SortBySkill key={s.id} {...s} />);
    }
  };

  return (
    <section>
      <h4>Wisdoms and Skills Relations</h4>
      <Table className="text-center" bordered>
        <thead>
          <tr style={{ cursor: "pointer" }}>
            <th onClick={() => setSort(1)}>Skill</th>
            <th onClick={() => setSort(2)}>Wisdom</th>
            <th onClick={() => setSort(3)}>Element</th>
          </tr>
        </thead>
        <tbody>{getContent()}</tbody>
      </Table>
    </section>
  );
};

const SortBySkill = ({ name, wisdoms }) => {
  let wis = wisdoms.map((w) => ({
    wisdom: wisdomsDB.list.find((elem) => elem.id === w.wisdom),
    element: elementsDB.find((elem) => elem.id === w.element),
  }));

  return (
    <>
      <tr>
        <td className="align-middle" rowSpan={2}>
          {name}
        </td>
        <td>{wis[0].wisdom.name}</td>
        <td style={{ backgroundColor: wis[0].element.color }}>
          {wis[0].element.name}
        </td>
      </tr>
      <tr>
        <td>{wis[1].wisdom.name}</td>
        <td style={{ backgroundColor: wis[1].element.color }}>
          {wis[1].element.name}
        </td>
      </tr>
    </>
  );
};

const TableRow = ({ sName, wName, elem }) => (
  <tr>
    <td>{sName}</td>
    <td>{wName}</td>
    <td style={{ backgroundColor: elem.color }}>{elem.name}</td>
  </tr>
);

export default WisdomSkillRel;
