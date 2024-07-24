




import React,{memo} from 'react';
import type {FC,ReactNode} from 'react';
interface IProps {
    children?:ReactNode
}

const Test1:FC<IProps> = () => {
 return (
  <div>
      Test1
  </div>
 );
};

export default memo(Test1)