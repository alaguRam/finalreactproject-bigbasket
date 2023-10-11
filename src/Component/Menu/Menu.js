import React, { useContext } from "react";
import { stateContext } from "../CreateContext";
import "./Menu.scss";

const Menu = () => {
  const { state } = useContext(stateContext);

  return (
    <div>
      <section className="menu-sec">
        <div className="menu-container">
          <h2>Fruits & Vegetables</h2>
          <hr className="hr"></hr>
          <div className="menu-row1">
            {state.fruit.map((v, i) => {
              return (
                <div className="menu-col1" key={i}>
                  <img src={v.img} alt="fruits" />
                </div>
              );
            })}
          </div>

          <h2>Your Daily Staples</h2>
          <hr className="hr"></hr>
          <div className="menu-row1">
            {state.daily.map((v, i) => {
              return (
                <div className="menu-col2" key={i}>
                  <img src={v.img} alt="daily" />
                </div>
              );
            })}
          </div>

          <h2>Beverages</h2>
          <hr className="hr"></hr>
          <div className="menu-row1">
            {state.beverage.map((v, i) => {
              return (
                <div className="menu-col2" key={i}>
                  <img src={v.img} alt="beverage" />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;
