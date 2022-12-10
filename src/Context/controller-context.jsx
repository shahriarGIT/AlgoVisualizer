import { createContext, useState } from "react";
import { flushSync } from "react-dom";

// const initalState = {
//   arr: [],
//   arrLength: 5,
//   swap: false,
//   generateArr: () => {},
//   startSort: () => {},
//   endSort: () => {},
//   resetArr: () => {},
//   sortType: "bubbleSort",
//   rearIndex: 0,
//   frontIndex: 1,
// };

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const ControlContext = createContext({
  arr: [],
  arrLength: 5,
  swap: false,
  swapDelay: true,
  generateArr: () => {},
  startSort: () => {},
  endSort: () => {},
  resetArr: () => {},
  sortType: "Bubble Sort",
  rearIndex: 0,
  frontIndex: 1,
});

let barArr = [];

const ControlProvider = (props) => {
  const [arrControls, setArrControls] = useState({
    arr: [],
    arrLength: 5,
    sortType: "Bubble Sort",
    swap: true,
    swapDelay: true,
    rearIndex: 0,
    frontIndex: 1,
    speed: 500,
    disable: false,
    breakLoop: false,
  });
  const generateArrHandler = () => {
    console.log("from generate", arrControls.arrLength);
    while (barArr.length != arrControls.arrLength) {
      let rand = getRndInteger(5, 100);
      if (!barArr.includes(rand)) {
        barArr.push(rand);
      }
    }
    setArrControls({
      ...arrControls,
      arr: [...barArr],
    });

    barArr.length = 0;
  };

  const toggleDisableHandler = (val) => {
    setArrControls({ ...arrControls, disable: val });
  };

  const swapDelayHandler = (val) => {
    setArrControls((prev) => {
      return { ...prev, swapDelay: val };
    });
  };

  const switchSwapHandler = (val) => {
    // setArrControls((prevState) => {});
    // setArrControls({ ...arrControls, swap: val });
    // flushSync(() => {
    setArrControls((prev) => {
      return { ...prev, swap: val };
    });
    // });
  };

  const resetArrHandler = () => {
    setArrControls((prev) => {
      return { ...prev, arr: [], breakLoop: true };
    });
    // setArrControls({ ...arrControls, arr: [], breakLoop: true });
  };

  const setArrLength = (val) => {
    // flushSync(() => {
    setArrControls((prev) => {
      return { ...prev, arrLength: val };
    });
    // });
    // generateArrHandler();
  };

  const selectSortType = (val) => {
    setArrControls({ ...arrControls, sortType: val });
  };

  return (
    <ControlContext.Provider
      value={{
        ...arrControls,
        tempArr: barArr,
        setArrControls,
        generateArr: generateArrHandler,
        switchSwap: switchSwapHandler,
        swapDelayFunc: swapDelayHandler,
        resetArr: resetArrHandler,
        setArrLength: setArrLength,
        selectSortType: selectSortType,
        toggleDisable: (val) => toggleDisableHandler(val),
      }}
    >
      {props.children}
    </ControlContext.Provider>
  );
};

export default ControlProvider;
