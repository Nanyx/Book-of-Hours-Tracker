import * as React from 'react';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import pageGen from '../layouts/pages';

const Crafts = () => (
  <>
    <Tab.Container>
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">

          </Nav>
        </Col>
        <Col>
          <Tab.Content>

          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  </>
);

const CraftRow = ({id, skills}) => {
  return (
    <tr>
      <td></td>
    </tr>
  );
}

export default pageGen("Crafts", <Crafts/>);