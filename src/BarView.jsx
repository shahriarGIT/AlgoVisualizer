import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Bar from "./Bar";
import { ControlContext } from "./Context/controller-context";

let newArr = [];
let i = 0;
let j = 0;

const BarView = () => {
  const [ii, setII] = useState(0);
  const [jj, setJJ] = useState(1);
  const [counter, setCounter] = useState(0);

  const setDisableHandler = (val) => {
    controls.toggleDisable(val);
  };

  const controls = useContext(ControlContext);

  useEffect(() => {
    if (counter === 1) {
      swapElement(controls.sortType);
      setCounter(0);
    }
  }, [
    controls.arr,
    controls.speed,
    controls.arrLength,
    controls.breakLoop,
    controls.swapDelay,
  ]);

  const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  const swapElement = async (val) => {
    if (val === "Bubble Sort") {
      setDisableHandler(true);

      newArr = controls.arr;
      await sleep(300);

      for (i = 0; i < newArr.length; i++) {
        setII(i);

        for (j = i + 1; j < newArr.length; j++) {
          setJJ(j);

          await sleep(controls.speed);
          if (newArr[i] > newArr[j]) {
            controls.switchSwap(true);

            let temp = newArr[i];
            newArr[i] = newArr[j];
            newArr[j] = temp;
            controls.swapDelay ? await sleep(500) : null;

            controls.setArrControls((prev) => {
              return {
                ...prev,
                arr: [...newArr],
                disable: true,
              };
            });
            controls.swapDelay ? await sleep(500) : null;
          }
          controls.switchSwap(false);
        }
      }

      newArr = [];
      setII(-1);
      setJJ(-1);
      setDisableHandler(false);
    }

    if (val === "Selection Sort") {
      setDisableHandler(true);

      newArr = controls.arr;
      await sleep(300);

      for (i = 0; i < newArr.length; i++) {
        for (j = 1; j < newArr.length - i; j++) {
          setII(j - 1);

          setJJ(j);
          await sleep(controls.speed);
          if (newArr[j - 1] > newArr[j]) {
            controls.switchSwap(true);

            let temp = newArr[j - 1];
            newArr[j - 1] = newArr[j];
            newArr[j] = temp;

            controls.swapDelay ? await sleep(500) : null;

            controls.setArrControls((prev) => {
              return {
                ...prev,
                arr: [...newArr],
                disable: true,
              };
            });
            controls.swapDelay ? await sleep(500) : null;
          }
          controls.switchSwap(false);
        }
      }

      newArr = [];
      setII(-1);
      setJJ(-1);
      setDisableHandler(false);
    }

    if (val === "Insertion Sort") {
      setDisableHandler(true);

      newArr = controls.arr;
      await sleep(300);
      let currentVal = null;
      for (i = 1; i < newArr.length; i++) {
        setJJ(i);

        currentVal = newArr[i];
        j = i - 1;
        setII(j);

        while (j >= 0 && newArr[j] > currentVal) {
          await sleep(controls.speed);
          setII(j);
          newArr[j + 1] = newArr[j];
          j--;
        }
        controls.switchSwap(true);

        newArr[j + 1] = currentVal;
        controls.swapDelay ? await sleep(500) : null;

        controls.setArrControls((prev) => {
          return {
            ...prev,
            arr: [...newArr],
            disable: true,
          };
        });
        setII(i);

        controls.swapDelay ? await sleep(500) : null;

        controls.switchSwap(false);
      }

      newArr = [];
      setII(-1);
      setJJ(-1);
      setDisableHandler(false);
    }

    if (val === "Merge Sort") {
    }

    newArr = [];
    setII(-1);
    setJJ(-1);
    setDisableHandler(false);
  };

  const start = () => {
    controls.generateArr();

    setCounter(counter + 1);
  };

  const resetHandler = () => {
    i = controls.arrLength;
    j = controls.arrLength;
    setII(-1);
    setJJ(-1);
    newArr = [];
    controls.resetArr();
    controls.switchSwap(false);
  };

  return (
    <>
      <div className="barView">
        {controls.arr.map((item) => (
          <Bar
            key={item}
            arr={controls.arr}
            val={item}
            i={ii}
            j={jj}
            h={item}
          />
        ))}
      </div>
      <div className="top-section">
        {controls.swap && controls.arr[ii]
          ? `Swap: ${controls.arr[ii]} with ${controls.arr[jj]}`
          : ""}
        <br />
        {/* {i > 0 ? (i / controls.arr.length) * 100 : ""} */}
      </div>
      <div className="bottom__button__section">
        <button
          className="bottom__button__start"
          onClick={start}
          disabled={controls.disable}
        >
          Start
        </button>
        <button className="bottom__button__stop" onClick={resetHandler}>
          Stop
        </button>
      </div>
    </>
  );
};

export default BarView;
