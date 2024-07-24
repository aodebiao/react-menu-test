




import React,{memo} from 'react';
import type {FC,ReactNode} from 'react';
interface IProps {
    children?:ReactNode
}

const Test2:FC<IProps> = () => {
 return (
  <div>
      Test2
  </div>
 );
};

export default memo(Test2)