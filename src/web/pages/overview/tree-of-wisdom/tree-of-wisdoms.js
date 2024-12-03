import * as React from 'react';

import './tree-of-wisdom.css';

import Matrix from './wisdoms-matrix';
import Relations from './wisdoms-skills-relations';
import Planner from './commitment-planner';

import OI from '../components/overview-item';

const TreeOfWisdoms = () => {
  return (
    <div>
      <Matrix/>
      <Planner/>
      <Relations/>
    </div>
  );
};

export default OI("TW", "Tree of Wisdoms", <TreeOfWisdoms/>);