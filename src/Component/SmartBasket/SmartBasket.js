import React, { useContext, useEffect, useState } from "react";
import { stateContext } from "../CreateContext";
import "./SmartBasket.scss";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const SmartBasket = () => {
  const { state, dispatch } = useContext(stateContext);

  const navigtor = useNavigate();

  let HandleInp = (e) => {
    navigtor(`/details?id=${e}`);
  };

  //selector inp event
  const [select, setSelect] = useState([]);
  const [ind, setId] = useState();
  const celector = (e, id) => {
    setSelect(e.target.value.split(','));
    console.log(e.target.value);
    console.log(id);
    setId(id);
    console.log(select);
    // (e.target.value,id)
  };
  useEffect(() => {
    let result = state.arr.find((v, i) => {
      return v.id === ind ? v : "";
    });
    result = { ...result, orginalMRp: select[0], orginalWeight: select[1] };
    let d = state.arr.map((val, i) => {
      return val.id === ind ? result : val;
    });
    dispatch({ type: "updateArr", payload: d });
  },[select, ind] ); 

  //click the add btn
  const handleAddCart = (v, i) => {
    const addCart = state.arr.map((prod) => {
      if (prod.id === v.id) {
        return {
          ...prod,
          isAddCart: true,
          remove:0
        };
      } else return prod;
    });
    dispatch({ type: "updateArr", payload: addCart });

    const isExist = state.allAddCart.some((prod) => prod.id === v.id);
    console.log(isExist);

    if (isExist) {
      dispatch({ type: "allAddCartpush", payload: [...state.allAddCart] });
    } else {
      dispatch({
        type: "allAddCartpush",
        payload: [...state.allAddCart, { ...v, isAddCart: true,remove:0 }],
      });
    }
  };
  //inc and dec btn
  const incBtn = (v, i) => {
    const addCart = state.arr.map((prod) => {
      if (prod.id === v.id) {
        if (prod.count < 6) {
          return {
            ...prod,
            count: (prod.count += 1),
            remove:(prod.remove+=1)
          };
        } else {
          alert("only 6 quantity avaliable")
          return { ...prod };
        }
      } else return { ...prod };
    });
    dispatch({ type: "updateArr", payload: addCart });

    const isExists = state.allAddCart.some((prod) => prod.id === v.id);

    if (isExists) {
      const addValue = state.allAddCart.map((prod) => {
        if (prod.id === v.id) {
          if (prod.count < 6) {
            return {
              ...prod,
              count: (prod.count += 1),
              remove:(prod.remove+=1)
            };
          }else return {...prod}
        } else return {...prod}
      });
      dispatch({ type: "allAddCartpush", payload: addValue });
    } else {
      dispatch({ type: "allAddCartpush", payload: [...state.allAddCart] });
    }
  };

  const decBtn = (v, i) => {
    const addCart = state.arr.map((prod) => {
      if (prod.id === v.id) {
        if (prod.count > 1) {
          return {
            ...prod,
            count: (prod.count -= 1),
            remove:(prod.remove-=1)
          };
        } else {
          return {
            ...prod,
            isAddCart: false,
            remove:(prod.remove-=1)
          };
        }
      } else return { ...prod };
    });
    dispatch({ type: "updateArr", payload: addCart });

    let isExist=state.allAddCart.some((prod)=>prod.id === v.id);
    if(isExist){
      const sub=state.allAddCart.map((subV)=>{
            if(subV.id===v.id){
              if(subV.count>1){
                return {
                  ...subV,count:(subV.count-=1),
                  remove:(subV.remove-=1)
                }
              }else{
                return {...subV,isAddCart: false,
                  remove:(subV.remove-=1)}
              }
            }else{
              return {...subV}
            }
      })
      dispatch({type:"allAddCartpush",payload:sub})
    }else{
      dispatch({type:"allAddCartpush",payload:[...state.allAddCart]})
    }
    if(v.remove===-1){
      let remover=state.allAddCart.filter((subVR)=> subVR.id!==v.id)
      dispatch({type:"allAddCartpush" ,payload:remover})
    }
    
  };

  return (
    <div className="smart-sec">
      {" "}
      <div className="smart-container">
      <p className="tittle">My Smart Basket</p>
          <hr className="hr"></hr>
        <div className="smart-row">
          {" "}
          {state.arr.map((v, i) => {
            return (
              <div className="smart-col">
                <div className="smart-card" key={i}>
                  <div className="smart-offer">
                    <h5>{v.offer}</h5>
                  </div>

                  <img src={v.qlyImg} alt="qlyImg" />
                  <img
                    src={v.img}
                    alt="veg-img"
                    onClick={() => {
                      HandleInp(v.id);
                    }}
                  />

                  <h6>{v.brandName}</h6>
                  <h2>{v.productName}</h2>
                  <div className="smart-select">
                    <select
                      onChange={(e) => {
                        celector(e, v.id);
                      }}
                    >
                      <option value={[v.price1, v.weight1]}>
                        {v.weight1} {v.line} Rs {v.price1}
                      </option>
                      <option value={[v.price2, v.weight2]}>
                        {v.weight2}
                        {v.line} Rs {v.price2}
                      </option>
                      <option value={[v.price3, v.weight3]}>
                        {v.weight3}
                        {v.line} Rs {v.price3}
                      </option>
                    </select>
                  </div>

                  <div className="smart-price-col">
                    <span className="mrp">{v.mrp}</span>
                    <span className="cutMrp">{v.cutMrp}</span>
                    <span className="orginalMRp">Rs {v.orginalMRp}</span>
                    <div className="imgicon-row">
                      <div className="imgIcon">
                        <img
                          className="hover-img"
                          src={v.imgIcon}
                          alt="imgIcon"
                        />
                      </div>
                      <div className="time">
                        <span>{v.time}</span>
                      </div>
                    </div>

                    <div className="bike-icon">
                      <img src={v.bikeIcon} alt="bikeIcon" />
                      <span className="bike-para">{v.bikepara}</span>
                    </div>

                    <div className="qty-group">
                      <p>{v.qty}</p>
                      <input type="number" placeholder="1"></input>
                      <Button
                        onClick={() => handleAddCart(v, i)}
                        className="qty-btn"
                        endIcon={<ShoppingCartIcon />}
                      >
                        ADD
                      </Button>
                      {v.isAddCart ? (
                        <div className="changeqty-btn">
                          <button
                            onClick={() => {
                              decBtn(v, i);
                            }}
                          >
                            <RemoveIcon className="sub-btn" />
                          </button>
                          <span>{v.count} in basket</span>
                          <button
                            onClick={() => {
                              incBtn(v, i);
                            }}
                          >
                            <AddIcon className="sub-btn" />
                          </button>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SmartBasket;
