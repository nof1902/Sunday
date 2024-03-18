import { titleAndSvg } from '../services/title&svg.jsx';

export function OptionsActionsCmpStyle({ actionType }){
  
  const Content = titleAndSvg[actionType];

  return (
    <div className='svg-title'>
      {Content}
    </div>
  );
};

export default OptionsActionsCmpStyle;
