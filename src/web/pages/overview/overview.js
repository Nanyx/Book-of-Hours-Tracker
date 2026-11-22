import * as React from "react";
import { Tab, Col, Row, Nav } from "react-bootstrap";

import TreeOfWisdoms from "./tree-of-wisdom/tree-of-wisdoms";
import Test from "./test/test";

import PageGen from "../../layouts/pages";

const name = "Overview";

const Overview = ({ autosave }) => (
  <PageGen name={name}>
    <Tab.Container>
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <TreeOfWisdoms.Nav />
            <Test.Nav />
          </Nav>
        </Col>
        <Col>
          <Tab.Content>
            <TreeOfWisdoms save={autosave} />
            <Test autosave={autosave} />
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  </PageGen>
);

const NavItem = () => <PageGen.Nav name={name} />;

export default Object.assign(Overview, { Nav: NavItem, Name: name });
