import { Table } from "react-bootstrap";

import languagesDB from "../../../data/languages.json";

const Check = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    width={25}
    height={25}
  >
    <path
      fill="whitesmoke"
      d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
    />
  </svg>
);

const VisitorsLanguages = ({ visitors }) => (
  <>
    <h4>Can be learn</h4>
    <Table bordered striped hover>
      <thead>
        <tr>
          <th rowSpan={2} className="align-middle text-center">
            Name
          </th>
          <th colSpan={10} className="text-center">
            languages
          </th>
        </tr>
        <tr>
          {languagesDB
            .filter((l) => l.toLearn)
            .map((l) => (
              <th className="text-center" key={l.id}>
                {l.name}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {visitors.map((v) => (
          <LangTableItem key={v.id} visitor={v} toLearn={true} />
        ))}
      </tbody>
    </Table>

    <h4>Known</h4>
    <Table bordered striped hover>
      <thead>
        <tr>
          <th rowSpan={2} className="align-middle text-center">
            Name
          </th>
          <th colSpan={5} className="text-center">
            languages
          </th>
        </tr>
        <tr>
          {languagesDB
            .filter((l) => !l.toLearn)
            .map((l) => (
              <th className="text-center" key={l.id}>
                {l.name}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {visitors.map((v) => (
          <LangTableItem key={v.id} visitor={v} toLearn={false} />
        ))}
      </tbody>
    </Table>
  </>
);

const LangTableItem = ({ visitor, toLearn }) => (
  <tr>
    <td>{visitor.name}</td>
    {languagesDB
      .filter((l) => l.toLearn === toLearn)
      .map((l) => (
        <td key={l.id} className="text-center align-middle">
          {visitor.languages.includes(l.id) ? <Check /> : ""}
        </td>
      ))}
  </tr>
);

export default VisitorsLanguages;