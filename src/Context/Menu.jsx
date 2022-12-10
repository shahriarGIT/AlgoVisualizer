import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ControlContext } from "./controller-context";

const Menu = () => {
  const controls = useContext(ControlContext);

  const [arrayLength, setArrayLength] = useState(5);
  let width = screen.width;
  useEffect(() => {
    width = screen.width;
    console.log(width);
  }, [controls.disable, screen.width]);

  const rangeHandler = (e) => {
    e.preventDefault();

    controls.setArrControls({ ...controls, speed: e.target.value });
    console.log(controls.speed);
  };

  const setArrLengthHandler = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    controls.setArrLength(e.target.value);
  };

  const selectTypeHandler = (e) => {
    e.preventDefault();
    console.log(e.target.innerHTML.trim());
    controls.selectSortType(e.target.innerHTML);
  };

  const swapDelayHandler = (e) => {
    // e.preventDefault();
    controls.swapDelayFunc(!controls.swapDelay);
  };

  const optionVeryLargeScreen = (
    <>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
      <option value={25}>25</option>
      <option value={30}>30</option>
    </>
  );

  const optionLargeScreen = (
    <>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={15}>15</option>
    </>
  );

  const optionMidScreen = (
    <>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={12}>12</option>
    </>
  );

  const optionSmallScreen = (
    <>
      <option value={5}>5</option>
      <option value={8}>8</option>
    </>
  );

  const optionVerySmallScreen = (
    <>
      <option value={5}>5</option>
    </>
  );

  return (
    <div className="menu">
      <div className="menu__heading">
        <h1>View Sorting</h1>
      </div>
      <form className="menu__form">
        <div className="menu__form__col1">
          <h2 className="selected__sort__heading">
            Selected Sort -{" "}
            <b className="selected__sort">{controls.sortType}</b>{" "}
          </h2>
          <div className="form__control">
            <h3 htmlFor="speed__label">Select Speed</h3>
            <input
              type="range"
              id="speed"
              name="speed"
              className="menu__form__speed"
              min="100"
              max="1000"
              defaultValue={500}
              step="100"
              onChange={rangeHandler}
              disabled={controls.disable}
            />
            <label className="colored__label">
              {" "}
              <b> {controls.speed} </b>
            </label>
          </div>
          <div className="form__control">
            <h3 htmlFor="sort__type">Number Of Bars</h3>
            <select
              value={controls.arrLength}
              className="sort__type"
              onChange={setArrLengthHandler}
              disabled={controls.disable}
            >
              {width < 500 ? optionVerySmallScreen : ""}
              {width > 500 && width < 600 ? optionSmallScreen : ""}
              {width > 600 && width < 800 ? optionMidScreen : ""}
              {width > 800 && width < 1000 ? optionLargeScreen : ""}
              {width > 1000 ? optionVeryLargeScreen : ""}
            </select>
            {/* <label className="colored__label">
              <b> {controls.speed}</b>
            </label> */}
          </div>
          <div className="form__control">
            <label className="checkbox__tag">
              {" "}
              <b> Swap Delay</b>
            </label>
            <input
              type="checkbox"
              disabled={controls.disable}
              defaultChecked={controls.swapDelay}
              onChange={swapDelayHandler}
            />
          </div>
        </div>

        <div className="menu__form__col2">
          <button
            disabled={controls.disable}
            onClick={selectTypeHandler}
            className="menu__form__button"
          >
            Bubble Sort
          </button>
          <button
            disabled={controls.disable}
            onClick={selectTypeHandler}
            className="menu__form__button"
          >
            Selection Sort
          </button>
          <button
            disabled={controls.disable}
            onClick={selectTypeHandler}
            className="menu__form__button"
          >
            Insertion Sort
          </button>
          {/* <button
            disabled={controls.disable}
            onClick={selectTypeHandler}
            className="menu__form__button"
          >
            Merge Sort
          </button>
          <button
            disabled={controls.disable}
            onClick={selectTypeHandler}
            className="menu__form__button"
          >
            Radix Sort
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default Menu;
