import { Table } from 'react-bootstrap'

import principlesDB from "../../../data/principles.json";
import elementsDB from "../../../data/elements.json";

const DietTable = ({ visitors }) => (
  <Table striped bordered hover size="sm" style={{ marginTop: "-1px" }}>
    <thead>
      <tr>
        <th rowSpan={2} className="align-middle">
          Name
        </th>
        <th rowSpan={2} colSpan={2} className="align-middle text-center">
          Interests
        </th>
        <th colSpan={2} className="text-center">
          Preferences
        </th>
        <th rowSpan={2} colSpan={2} className="align-middle text-center">
          Topics
        </th>
      </tr>
      <tr>
        <th className="text-center">Food</th>
        <th className="text-center">Drink</th>
      </tr>
    </thead>
    <tbody>
      {visitors.map((v) => (
        <TableItem key={v.id} visitor={v} />
      ))}
    </tbody>
  </Table>
);

const TableItem = ({ visitor }) => (
  <tr>
    <td>{visitor.name}</td>
    {principlesDB
      .filter((p) => visitor.interests.includes(p.id))
      .map((p) => (
        <TableColorCell key={p.id} color={p.color}>
          {p.name}
        </TableColorCell>
      ))}
    {visitor.numatic ? (
      <td colSpan={4}></td>
    ) : (
      <>
        {visitor.preferences.food === visitor.preferences.drink ? (
          <TablePrefCell colSpan={2} principleID={visitor.preferences.food} />
        ) : (
          <>
            <TablePrefCell principleID={visitor.preferences.food} />
            <TablePrefCell principleID={visitor.preferences.drink} />
          </>
        )}
        {elementsDB
          .filter((e) => visitor.topics.includes(e.id))
          .map((e) => (
            <TableColorCell key={e.id} color={e.color}>
              {e.name}
            </TableColorCell>
          ))}
      </>
    )}
  </tr>
);

const TablePrefCell = ({ principleID, ...rest }) => {
  const principle = principlesDB.find((e) => e.id === principleID);
  return typeof principleID === "number" ? (
    <TableColorCell color={principle?.color} {...rest}>
      {principle?.name}
    </TableColorCell>
  ) : (
    <td className="text-center" {...rest}>
      {principleID}
    </td>
  );
};

const TableColorCell = ({ color, children, ...rest }) => (
  <td className="text-center" style={{ backgroundColor: color }} {...rest}>
    {children}
  </td>
);

export default DietTable;