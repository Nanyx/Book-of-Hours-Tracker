import * as React from 'react';
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';

import Layout from './layouts/main';
import Books from './pages/books';
import Crafts from './pages/crafts';

const App = () => {
  return (
    <Layout dkey={"Books"}>
      <Layout.Nav>
        <Books.Nav/>
        {/*<Crafts.Nav/>*/}
      </Layout.Nav>
      <Layout.Content>
        <Books/>
        <Crafts/>
      </Layout.Content>
    </Layout>
  );
}

createRoot(document.getElementById('app')).render(<App/>);
