import * as React from "react";
import Layout from "../layouts/main";

const Page = ({ name, children, rest }) => (
  <Layout.Pane ekey={name} {...rest}>
    {children}
  </Layout.Pane>
);
const Nav = ({ name }) => <Layout.NavItem ekey={name}>{name}</Layout.NavItem>;

export default Object.assign(Page, { Nav });
