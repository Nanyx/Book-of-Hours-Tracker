import * as React from 'react';
import Layout from '../layouts/main';

const generate = (name, content) => {

  const Page = () => <Layout.Pane ekey={name}>{content}</Layout.Pane>;
  Page.Nav = () => <Layout.NavItem ekey={name}>{name}</Layout.NavItem>;

  return Page;
};

export default generate;
