import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { flushSync } from "react-dom";
import Bar from "./Bar";
import { ControlContext } from "./Context/controller-context";

let barArr = [];
let newArr = [];
let newArr2 = [];
let i = 0;
let j = 0;

const BarView = () => {
  const [no, setNo] = useState([]);
  const [ii, setII] = useState(0);
  const [jj, setJJ] = useState(1);
  const [swap, setSwap] = useState(false);
  const [counter, setCounter] = useState(0);

  const setDisableHandler = (val) => {
    controls.toggleDisable(val);
  };

  const controls = useContext(ControlContext);

  useEffect(() => {
    if (counter === 1) {
      // console.log("from useEffect", controls.sortType);

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
    console.log("from Swap Func", controls, "no and barArr");
    console.log("swap");
    console.log("from swapElement", controls.sortType);

    if (val === "Bubble Sort") {
      // flushSync(() => {
      setDisableHandler(true);
      // });

      // let newArr = controls.tempArr;
      newArr = controls.arr;
      await sleep(300);

      for (i = 0; i < newArr.length; i++) {
        setII(i);
        // if (breakLoop) {
        //   console.log("break i");
        //   break;
        // }
        for (j = i + 1; j < newArr.length; j++) {
          // if (breakLoop) {
          //   console.log("break j");
          //   break;
          // }
          setJJ(j);

          await sleep(controls.speed);
          if (newArr[i] > newArr[j]) {
            controls.switchSwap(true);

            // setSwap(true);
            let temp = newArr[i];
            newArr[i] = newArr[j];
            newArr[j] = temp;
            // await sleep(500);
            console.log(controls.swapDelay, "from bubble 1st");
            controls.swapDelay ? await sleep(500) : null;

            // controls.setArrControls({
            //   ...controls,
            //   arr: [...newArr],
            //   disable: true,
            // });
            controls.setArrControls((prev) => {
              return {
                ...prev,
                arr: [...newArr],
                disable: true,
              };
            });
            // await sleep(500);
            console.log(controls.swapDelay, "from bubble 2nd");
            controls.swapDelay ? await sleep(500) : null;
          }
          controls.switchSwap(false);
          // setSwap(false);
        }
      }

      // controls.resetArr();
      newArr = [];
      setII(-1);
      setJJ(-1);
      setDisableHandler(false);
    }

    if (val === "Selection Sort") {
      // flushSync(() => {
      setDisableHandler(true);
      // });

      // let newArr = controls.tempArr;
      newArr = controls.arr;
      await sleep(300);

      for (i = 0; i < newArr.length; i++) {
        // if (breakLoop) {
        //   console.log("break i");
        //   break;
        // }
        for (j = 1; j < newArr.length - i; j++) {
          // if (breakLoop) {
          //   console.log("break j");
          //   break;
          // }
          setII(j - 1);

          setJJ(j);
          await sleep(controls.speed);
          if (newArr[j - 1] > newArr[j]) {
            controls.switchSwap(true);

            // setSwap(true);
            let temp = newArr[j - 1];
            newArr[j - 1] = newArr[j];
            newArr[j] = temp;

            // await sleep(500);
            controls.swapDelay ? await sleep(500) : null;

            // controls.setArrControls({
            //   ...controls,
            //   arr: [...newArr],
            //   disable: true,
            // });
            controls.setArrControls((prev) => {
              return {
                ...prev,
                arr: [...newArr],
                disable: true,
              };
            });
            // await sleep(500);
            controls.swapDelay ? await sleep(500) : null;
          }
          controls.switchSwap(false);
          // setSwap(false);
        }
      }

      // controls.resetArr();
      newArr = [];
      setII(-1);
      setJJ(-1);
      setDisableHandler(false);
    }

    if (val === "Insertion Sort") {
      // flushSync(() => {
      setDisableHandler(true);
      // });

      // let newArr = controls.tempArr;
      newArr = controls.arr;
      await sleep(300);
      let currentVal = null;
      for (i = 1; i < newArr.length; i++) {
        // if (breakLoop) {
        //   console.log("break i");
        //   break;
        // }
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
        // await sleep(500);
        controls.swapDelay ? await sleep(500) : null;

        controls.setArrControls((prev) => {
          return {
            ...prev,
            arr: [...newArr],
            disable: true,
          };
        });
        setII(i);

        // await sleep(500);
        controls.swapDelay ? await sleep(500) : null;

        controls.switchSwap(false);
      }

      newArr = [];
      setII(-1);
      setJJ(-1);
      setDisableHandler(false);
    }

    if (val === "Merge Sort") {
      // flushSync(() => {
      setDisableHandler(true);
      // });

      // let newArr = controls.tempArr;
      newArr = controls.arr;

      /*
      async function mergeSort(newArr) {
        if (newArr.length < 2) {
          return newArr;
        }
        const mid = Math.floor(newArr.length / 2);
        const leftArr = newArr.slice(0, mid);
        const rightArr = newArr.slice(mid);
        await sleep(200);

        return merge(mergeSort(leftArr), mergeSort(rightArr));
      }
      */

      // async function merge(leftArr, rightArr) {
      //   const sortedArr = [];
      //   while (leftArr.length && rightArr.length) {
      //     await sleep(200);

      //     if (leftArr[0] <= rightArr[0]) {
      //       sortedArr.push(leftArr.shift());
      //     } else {
      //       sortedArr.push(rightArr.shift());
      //     }
      //   }

      //   // let newSortedArray = [...sortedArr, ...leftArr, ...rightArr];
      //   return [...sortedArr, ...leftArr, ...rightArr];
      //   //  new Promise((resolve) => {
      //   //   return  [...sortedArr, ...leftArr, ...rightArr];
      //   //   resolve();
      //   // }

      //   // controls.swapDelay ? await sleep(500) : null;

      //   // controls.setArrControls((prev) => {
      //   //   return {
      //   //     ...prev,
      //   //     arr: [...newSortedArray],
      //   //     disable: true,
      //   //   };
      //   // });
      //   // controls.swapDelay ? await sleep(500) : null;
      //   // return newSortedArray;
      // }

      /////////////////////////////New Merge ///////////////////////

      async function merger(arr1, arr2) {
        let i = 0,
          j = 0,
          mergedArr = [];
        while (i < arr1.length && j < arr2.length) {
          if (arr1[i][0] > arr2[j][0]) {
            mergedArr.push(arr2[j]);
            j++;
            setJJ(j);
          } else {
            mergedArr.push(arr1[i]);
            i++;
            setII(i);
          }
          await sleep(500);
        }

        while (i < arr1.length) {
          mergedArr.push(arr1[i]);
          i++;
        }
        while (j < arr2.length) {
          mergedArr.push(arr2[j]);
          j++;
        }
        let num = null;
        var lowest = mergedArr[0][1];
        for (num = 1; num < mergedArr.length; num++) {
          if (mergedArr[num][1] < lowest) {
            lowest = mergedArr[num][1];
          }
        }

        controls.setArrControls((prev) => {
          return {
            ...prev,
            arr: [...mergedArr],
            disable: true,
          };
        });

        // mergeDraw(mergedArr, lowest);

        return mergedArr;
      }

      async function mergeSort(newArr) {
        //Array of length 1 is sorted so we return the same array back
        if (newArr.length == 1) return newArr;

        //Break down the array to half from middle into left and right
        let middle = Math.floor(newArr.length / 2);
        let left = await mergeSort(newArr.slice(0, middle));
        let right = await mergeSort(newArr.slice(middle));

        //Return the merged sorted array
        return merger(left, right);
      }

      console.log(mergeSort(newArr));

      newArr = [];
      setII(-1);
      setJJ(-1);
      setDisableHandler(false);
    }
  };

  // const swapElement = async () => {
  //   console.log("from Swap Func", no, "no and barArr");
  //   console.log("nwe swap");

  //   for (i = 0; i < no.length; i++) {
  //     setII(i);
  //     for (j = i + 1; j < no.length; j++) {
  //       setJJ(j);
  //       await sleep(500);
  //       if (no[i] > no[j]) {
  //         setSwap(true);
  //         let temp = no[i];
  //         no[i] = no[j];
  //         no[j] = temp;
  //         await sleep(500);
  //         // setNo([...newArr]);
  //       }
  //       setSwap(false);
  //     }
  //   }

  //   console.log(no, "after sorting");
  // };

  const start = () => {
    // console.log(e.target);

    controls.generateArr();

    console.log(controls);
    // console.log("from Ran Func", no);
    // await sleep(500);
    // swapElement();
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
          ? `Swap : ${controls.arr[ii]} with ${controls.arr[jj]}`
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
