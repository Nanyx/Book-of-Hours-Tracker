import { Table, Row, Col } from "react-bootstrap";

import principleDB from "../../../data/principles.json";

const Diet = ({ visitors = [], max }) => {
  let table1 = visitors.slice(0, Math.ceil(max / 2));
  let table2 = visitors.slice(Math.ceil(max / 2));
  return (
    <Row>
      <Col>
        <DietTable>
          {table1.map((v) => (
            <TableRow key={v.id} {...v} />
          ))}
        </DietTable>
      </Col>
      <Col>
        {table2.length > 0 && (
          <DietTable>
            {table2.map((v) => (
              <TableRow key={v.id} {...v} />
            ))}
          </DietTable>
        )}
      </Col>
    </Row>
  );
};

const DietTable = ({ children }) => (
  <Table bordered striped hover size="sm">
    <thead>
      <tr className="text-center">
        <th className="text-start">Visitor</th>
        <th>Food</th>
        <th>Drink</th>
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </Table>
);

const TableRow = ({ name, diet }) => {
  const getValue = (val) => {
    if (typeof val === "number") {
      return principleDB.find((p) => p.id == val).name;
    } else return val;
  };
  return (
    <tr className="text-center">
      <td className="text-start">{name}</td>
      <td>{getValue(diet.food)}</td>
      <td>{getValue(diet.drink)}</td>
    </tr>
  );
};

export default Diet;
