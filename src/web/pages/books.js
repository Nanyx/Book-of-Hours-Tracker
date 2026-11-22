import * as React from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";

import PrincipleTT from "./components/principle-tooltip";
import GradientCell from "./components/gradient-cell";

import "./books.css";

import PageGen from "../layouts/pages";

import booksData from "../../data/tomes.json";
import memsData from "../../data/mem.json";
import skillsData from "../../data/skills.json";
import principles from "../../data/principles.json";

import BookLoc from "../../models/book";

const completeLib = booksData;
const memories = memsData;
const skills = skillsData.lessons;

const name = "Books";

/** @type {BookLoc[]} */
completeLib.sort((a, b) =>
  a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1,
);

const Books = ({ bookSave }) => {
  const [sortItem, setSortItem] = useState("name");

  let libSorted = bookSave.map((l) => {
    let book = completeLib.find((b) => b.id === l.id);
    let memory = memories.find((m) => m.id === book.memory).name;
    let mastery = principles.find(
      (p) => p.name.toLowerCase() === book.mastery,
    ).name;
    return { name: book.name, memory, mystery: book.mystery, mastery, ...l };
  });

  libSorted.sort((a, b) =>
    a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1,
  );

  if (sortItem === "memory") {
    libSorted.sort((a, b) =>
      a.memory.toLowerCase() < b.memory.toLowerCase() ? -1 : 1,
    );
    libSorted.sort((a, b) => (!b.read ? -1 : 1));
  } else if (sortItem === "mastery") {
    libSorted.sort((a, b) =>
      a.mastery.toLowerCase() < b.mastery.toLowerCase() ? -1 : 1,
    );
  } else if (sortItem === "mystery") {
    libSorted.sort((a, b) => a.mystery - b.mystery);
    libSorted.sort((a, b) => (b.read ? -1 : 1));
  }

  return (
    <PageGen name={name}>
      <Table
        striped
        bordered
        hover
        size="sm"
        className="align-middle th-table-fit"
        style={{ marginTop: "-1px" }}>
        <thead>
          <tr>
            <th
              style={{ width: "40%", cursor: "pointer" }}
              onClick={() => setSortItem("name")}>
              Name
            </th>
            <th
              className="text-center"
              style={{ cursor: "pointer" }}
              onClick={() => setSortItem("mastery")}>
              Mastery
            </th>
            <th
              className="text-center"
              style={{ cursor: "pointer" }}
              onClick={() => setSortItem("mystery")}>
              Mystery
            </th>
            <th className="text-center">Skill</th>
            <th
              className="text-center"
              style={{ cursor: "pointer" }}
              onClick={() => setSortItem("memory")}>
              Memory
            </th>
          </tr>
        </thead>
        <tbody>
          {libSorted.map((b) => (
            <TableItem key={b.id} {...b} />
          ))}
        </tbody>
      </Table>
    </PageGen>
  );
};

const TableItem = ({ id, read }) => {
  const book = completeLib.find((b) => b.id === id);
  const principle = principles.find(
    (m) => m.name.toLowerCase() == book.mastery,
  );
  const mem = memories.find((m) => m.id == book.memory);

  return (
    <tr>
      <td>{book.name}</td>
      {
        <td
          className="text-center"
          style={{ backgroundColor: principle.color }}>
          {principle.name}
        </td>
      }
      <td className="text-center">{book.mystery}</td>
      <td className="text-center">
        {skills.find((s) => s.rid == book.skill).name}
      </td>
      {!read && <td className="text-center">To Read</td>}
      {read && (
        <PrincipleTT principleList={mem.principles}>
          <GradientCell principles={mem.principles.map((p) => p.principle)}>
            {mem.name}
          </GradientCell>
        </PrincipleTT>
      )}
    </tr>
  );
};

const Nav = () => <PageGen.Nav name={name} />;

export default Object.assign(Books, { Nav });
