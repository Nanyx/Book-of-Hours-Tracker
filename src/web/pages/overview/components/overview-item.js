import * as React from 'react';
import {Nav, Tab} from 'react-bootstrap';

const generate = (ek, name, content, ...rest) => {

  const Page = () => <Tab.Pane eventKey={ek} {...rest}>{content}</Tab.Pane>;
  Page.Nav = () => <Nav.Item><Nav.Link eventKey={ek}>{name}</Nav.Link></Nav.Item>;

  return Page;
};

export default generate;
