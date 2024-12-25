import * as React from 'react';
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';

import Layout from './layouts/main';
import Overview from './pages/overview/overview';
import Books from './pages/books';
import Crafts from './pages/crafts';
import Onboarding from './pages/components/onboarding';
import Visitors from './pages/visitors';

const dkey = "Books";

const App = () => {
  return (
    <Layout dkey={dkey}>
      <Layout.Nav>
        <Overview.Nav/>
        <Books.Nav/>
        <Crafts.Nav/>
        <Visitors.Nav/>
      </Layout.Nav>
      <Layout.Content>
        <Overview/>
        <Books/>
        <Crafts/>
        <Visitors/>
      </Layout.Content>
      <Onboarding/>
    </Layout>
  );
}

createRoot(document.getElementById('app')).render(<App/>);
