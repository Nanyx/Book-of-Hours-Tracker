import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./app.css";

import Layout from "./layouts/main";
//import Overview from "./pages/overview/overview";
import Books from "./pages/books";
import Crafts from "./pages/crafts/crafts";
import TW from "./pages/tree-of-wisdom/tree-of-wisdoms";
import Visitors from "./pages/visitors";
//import Onboarding from "./pages/components/onboarding";

import { BookParser } from "../helpers/save-trimmer";

const dkey = "Books";

const App = () => {
  const [save, setSave] = useState(null);

  useEffect(() => {
    const unsubscribe = window.electronAPI.onSaveRead((jsonData) => {
      setSave(BookParser(jsonData));
    });

    return () => unsubscribe();
  }, []);

  return (
    <Layout dkey={dkey}>
      <Layout.Nav>
        <Books.Nav />
        <Crafts.Nav />
        <TW.Nav />
        <Visitors.Nav />
      </Layout.Nav>
      <Layout.Content>
        <Books bookSave={save?.books || []} />
        <Crafts craftSave={save?.crafts || []} />
        <TW save={save} />
        <Visitors visitorSave={save?.writingCase || []} />
      </Layout.Content>
    </Layout>
  );
};

createRoot(document.getElementById("app")).render(<App />);
