import * as React from 'react';
import { Table } from 'react-bootstrap';

import wisdomsDB from '../../../../data/wisdoms.json';
import elementsDB from '../../../../data/elements.json';

const artWis = [
  {aID: 1, wisArr:[1, 2, 3]},
  {aID: 2, wisArr:[4, 5, 6]},
  {aID: 3, wisArr:[7, 8, 9]}
];
const elemArr = [1, 4, 3, 7, 6, 8, 2, 5, 9];

const getElem = (id) => elementsDB.find(e => e.id === id);
const getWis = (id) => wisdomsDB.list.find(w => w.id === id);

const Matrix = () => (
  <section>
    <h4>Wisdoms Matrix</h4>
    <Table bordered>
      <thead>
        <tr>
          <th className='text-center align-middle' rowSpan={2}>Art</th>
          <th className='align-middle' rowSpan={2}>Wisdom</th>
          <th className='text-center' colSpan={9}>Elements of the Soul</th>
        </tr>
        <tr>
          {elemArr.map(e => <th key={e} className='col-1 text-center'>{getElem(e).name}</th>)}
        </tr>
      </thead>
      <tbody>
        {artWis.map(aw => <MatrixBlock key={aw.aID} {...aw}/>)}
      </tbody>
    </Table>
  </section>
);

const MatrixBlock = ({wisArr, ...rest}) => wisArr.map((w, i) => <WisdomRow key={i} id={w} show={i === 0} {...rest} />)

const WisdomRow = ({id, aID, show = false}) => { 
  const wisdom = getWis(id);
  return (
  <tr>
    {show && <td className='text-center align-middle' rowSpan={3}>{wisdomsDB.arts.find(a => a.id === aID).name}</td>}
    <td>{wisdom.name}</td>
    <ElemRow lst={wisdom.elements}/>
  </tr>
)};

const ElemRow = ({lst}) => (
  <>
    {elemArr.map(eID => {
      const elem = getElem(eID); 
      return <td key={eID} style={{backgroundColor: lst.includes(eID) ? elem.color : "auto"}}></td> }
    )} 
  </>
);

export default Matrix;