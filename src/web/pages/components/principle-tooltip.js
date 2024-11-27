import * as React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import principles from '../../../data/principles.json';

const PrincipleTooltip = ({children, principleList, pos="left", sd=150, hd=500, ...props}) => {

  const renderTT = (p, props) => {
    return <Tooltip {...props}>
      {principles.filter(pr => p.map(pp => pp.principle).includes(pr.id)).map(pr => `${pr.name} ${p.find(item => item.principle == pr.id).lv}`).join(" / ")}
    </Tooltip>
  };

  return (
    <OverlayTrigger
          placement={pos}
          delay={{show:sd, hide:hd}}
          overlay={(overlayProps) => renderTT(principleList, overlayProps)}          
          {...props}
    >{children}</OverlayTrigger>
  );
}

export default PrincipleTooltip;