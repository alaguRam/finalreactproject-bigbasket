import React, { useContext } from "react";
import "./Banner.scss";
import { stateContext } from "../CreateContext";
import { Carousel } from "antd";

const Banner = () => {
  const { state } = useContext(stateContext);

  // console.log(state);
  return (
    <div>
      <Carousel autoplay className="banner-img">
        {state.header.map((v, i) => {
          return (
            <div key={i}>
              <img src={v.img} alt="banner-img" />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Banner;
