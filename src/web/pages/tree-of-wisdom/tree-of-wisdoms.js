import * as React from "react";

import "./tree-of-wisdom.css";

import Matrix from "./wisdoms-matrix";
import Relations from "./wisdoms-skills-relations";
//import Planner from "./commitment-planner";

import { getSkillLearned } from "../../../helpers/skills";

import PageGen from "../../layouts/pages";

const name = "Three of Wisdom";

const TreeOfWisdoms = ({ save }) => {
  return (
    <PageGen name={name}>
      <div>
        <Matrix />
        {/*maybe deprecated ??? <Planner />*/}
        <Relations skillsKnown={getSkillLearned(save?.crafts || [])} />
      </div>
    </PageGen>
  );
};

const Nav = () => <PageGen.Nav name={name} />; //<OI.Nav ek={ek}>Three of Wisdom</OI.Nav>;

export default Object.assign(TreeOfWisdoms, { Nav });
