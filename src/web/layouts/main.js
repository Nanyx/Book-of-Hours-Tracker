import * as React from 'react';
import { Container, Tab, Row, Col, Nav } from 'react-bootstrap';

const MainLayout = ({dkey, children}) => (
  <Container fluid className='mt-3'>
      <Tab.Container defaultActiveKey={dkey}>
        <Row>
          {children}
        </Row>
      </Tab.Container>
    </Container>
);

MainLayout.Nav = ({children}) => (
  <Col xs={2}>
    <Nav variant="pills" className="flex-column">
      {children}
    </Nav>
  </Col>
);

MainLayout.NavItem = ({children, ekey}) => (
  <Nav.Item>
    <Nav.Link eventKey={ekey}>{children}</Nav.Link>
  </Nav.Item>
);

MainLayout.Content = ({children}) => (
  <Col>
    <Tab.Content>
      {children}
    </Tab.Content>
  </Col>
);

MainLayout.Pane = ({children, ekey}) => (
  <Tab.Pane unmountOnExit eventKey={ekey}>{children}</Tab.Pane>
);

export default MainLayout;
