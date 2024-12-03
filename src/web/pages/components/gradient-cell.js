import * as React from 'react';
import { forwardRef } from 'react';
import principlesDB from '../../../data/principles.json';

/**
   * @param {[]} ids
   * @return {string} 
   */
const getGradient = (ids) => {
  let lst = principlesDB.filter(p => ids.includes(p.id));
  return lst.map((p, i) => {
    let percent = 100/lst.length;
    return i == 0 ? 
      `${p.color} ${percent}%, ${p.color} ${percent}%`:
      `${p.color} ${percent*i}%, ${p.color} ${percent*(i+1)}%`;
  }).join(", ");
}

const GradiantCell = forwardRef(({children, principles, ...rest}, ref) => 
  <td ref={ref} className="text-center" style={{background:`linear-gradient(110deg, ${getGradient(principles)})`}} {...rest}>{children}</td>
);

export default GradiantCell;
