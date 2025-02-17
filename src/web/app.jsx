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

const dkey = "Overview";

const App = () => {
  return (
    <Layout dkey={dkey}>
      <Layout.Nav>
        <Overview.Nav/>
        <Books.Nav/>
        <Crafts.Nav/>
      </Layout.Nav>
      <Layout.Content>
        <Overview/>
        <Books/>
        <Crafts/>
      </Layout.Content>
      <Onboarding/>
    </Layout>
  );
}

createRoot(document.getElementById('app')).render(<App/>);
