import { useEffect, useState } from "react";
import { RiToggleFill, RiToggleLine } from "react-icons/ri";
import {AiOutlineRedo} from "react-icons/ai"

export default function Button({ initialState, size, clickHandler }) {
  let _size = 16;
  if (size) _size = size;
  const [currentState, setCurrentState] = useState(initialState);

  useEffect(()=>{
    setCurrentState(initialState)
  },[initialState]);


  
  if(typeof(initialState) != "boolean"){
    return <RiToggleFill size={_size} />
  }


  let Button;
  Button = currentState ? RiToggleFill : RiToggleLine;

  return (
    <Button
      onClick={() => {
        setCurrentState(!currentState);
        clickHandler();
      }}
      size={_size}
      fill={currentState ? "#61C454" : "#FF0000"}
    />
  );
}
