import * as React from "react";
import { Nav, Tab } from "react-bootstrap";

const Page = ({ ek, children, rest }) => (
  <Tab.Pane eventKey={ek} {...rest}>
    {children}
  </Tab.Pane>
);

const NavItem = ({ ek, children }) => (
  <Nav.Item>
    <Nav.Link eventKey={ek}>{children}</Nav.Link>
  </Nav.Item>
);

export default Object.assign(Page, { Nav: NavItem });
