import { Table, Col, Row } from "react-bootstrap";

import langDB from "../../../data/lang.json";

const RefTables = () => {
  let group = [];
  for (let i = 0; i < Math.ceil(langDB.length / 3); i++) {
    group.push(langDB.slice(i * 3, i * 3 + 3));
  }

  return (
    <Row>
      {group.map((g, i) => (
        <RefTable key={i} list={g} />
      ))}
    </Row>
  );
};

const RefTable = ({ list = [] }) => (
  <Col>
    <Table bordered striped size="sm">
      <tbody>
        {list.map((l) => (
          <RefTableRow key={l.id} {...l} />
        ))}
      </tbody>
    </Table>
  </Col>
);

const RefTableRow = ({ name, short }) => (
  <tr>
    <td>{name}</td>
    <td>{short}</td>
  </tr>
);

const Loc = ({ children }) => (
  <Table bordered striped hover size="sm" className="align-middle">
    <thead>
      <tr>
        <th></th>
        {langDB.map((l) => (
          <th key={l.id} className="text-center">
            {`${l.short}${l.learn ? "*" : ""}`}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </Table>
);

const LocRow = ({ name, lang }) => (
  <tr>
    <td>{name}</td>
    {langDB.map((l) => (
      <td key={l.id} className="text-center">
        {lang.includes(l.id) && "X"}
      </td>
    ))}
  </tr>
);

export default Object.assign(Loc, {
  Visitor: LocRow,
  ReferenceTable: RefTables,
});
