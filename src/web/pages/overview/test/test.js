import * as React from "react";
import { Form } from "react-bootstrap";

import OI from "../components/overview-item";

const ek = "test";

const Test = ({ autosave }) => {
  return (
    <OI ek={ek}>
      <div>
        <Form>
          <Form.Control
            as="textarea"
            readOnly
            rows={10}
            value={autosave ? JSON.stringify(autosave, null, 2) : ""}
          />
        </Form>
      </div>
    </OI>
  );
};

const Nav = () => <OI.Nav ek={ek}>Test</OI.Nav>;

export default Object.assign(Test, { Nav });
