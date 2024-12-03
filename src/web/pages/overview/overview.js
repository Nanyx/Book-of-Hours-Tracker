import * as React from 'react';
import {Tab, Col, Row, Nav} from 'react-bootstrap';

import TreeOfWisdoms from './tree-of-wisdom/tree-of-wisdoms';

import pageGen from '../../layouts/pages';

const Overview = () => (
  <Tab.Container>
    <Row>
      <Col sm={3}>
        <Nav variant="pills" className="flex-column">
          <TreeOfWisdoms.Nav/>
        </Nav>
      </Col>
      <Col>
        <Tab.Content>
          <TreeOfWisdoms/>
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>
);

export default pageGen("Overview", <Overview/>);
