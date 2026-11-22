import * as React from "react";
import { Card, Table } from "react-bootstrap";

import PrincipleTT from "../../components/principle-tooltip";
import GradientCell from "../../components/gradient-cell";

import craftsDB from "../../../../data/crafts.json";

const PrincipleTable = ({ name, color, crafts }) => {
  return (
    <Card className="mb-2">
      <Card.Header style={{ backgroundColor: color }}>{name}</Card.Header>
      <Table className="mb-0" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Requirement</th>
            <th className="text-center">Name</th>
          </tr>
        </thead>
        <tbody>
          {crafts.map((c, i) => (
            <PrincipleTableRow key={i} {...c} />
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

const PrincipleTableRow = ({ id, req }) => {
  let craft = null;
  if (id.split(".")[1] == "keeper") {
    craft = craftsDB.crafts.find(
      (c) => c.cid == id.split("_").reverse()[0].replace(" ", "."),
    );
  } else {
    craft = craftsDB.crafts.find((c) => c.cid == id.split("_").reverse()[1]);
  }

  const getRank = () => {
    let rank = id.split(".")[1];
    if (rank == "keeper" || rank == "scholar") return rank;
    return "prentice";
  };

  return (
    <tr>
      <td className="text-capitalize">{getRank()}</td>
      <td className="text-capitalize">{req?.replace(".", " ") || ""}</td>
      <PrincipleTT principleList={craft.principles}>
        <GradientCell principles={craft.principles.map((p) => p.principle)}>
          {craft.name}
        </GradientCell>
      </PrincipleTT>
    </tr>
  );
};

export default PrincipleTable;
