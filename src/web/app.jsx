import * as React from "react";
import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";
import "./app.css";

import Layout from "./layouts/main";
//import Overview from "./pages/overview/overview";
import Books from "./pages/books";
import Crafts from "./pages/crafts/crafts";
import TW from "./pages/tree-of-wisdom/tree-of-wisdoms";
import Visitors from "./pages/visitors/visitors";
//import Onboarding from "./pages/components/onboarding";

import { BookParser } from "../helpers/save-trimmer";

const dkey = "Books";

const App = () => {
  const [save, setSave] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = window.electronAPI.onSaveRead((jsonData) => {
      setSave(BookParser(jsonData));
    });

    return () => unsubscribe();
  }, []);

  return (
    <Layout dkey={dkey}>
      <Layout.Nav>
        {/*<Overview.Nav />*/}
        <Books.Nav />
        <Crafts.Nav />
        <TW.Nav />
        <Visitors.Nav />
      </Layout.Nav>
      <Layout.Content>
        {/*<Overview autosave={save} />*/}
        <Books bookSave={save?.books || []} />
        <Crafts craftSave={save?.crafts || []} />
        <TW save={save} />
        <Visitors visitorSave={save?.writingCase || []} />
      </Layout.Content>
    </Layout>
  );
};

createRoot(document.getElementById("app")).render(<App />);
