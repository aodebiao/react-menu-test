




import React,{memo} from 'react';
import type {FC,ReactNode} from 'react';
interface IProps {
    children?:ReactNode
}

const Option:FC<IProps> = () => {
 return (
  <div>
   Option
  </div>
 );
};

export default memo(Option)