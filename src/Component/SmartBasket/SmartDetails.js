import React, { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { stateContext } from "../CreateContext";
import Nav from "../Nav/Nav";
import Button from "@mui/material/Button";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import "./SmartDetails.scss";
import CheckIcon from "@mui/icons-material/Check";

const SmartDetails = () => {
  const [searchparams] = useSearchParams();
  const ans = searchparams.get("id");
  const { state, dispatch } = useContext(stateContext);

  let result = state.arr.filter((v, i) => {
    return v.id === ans;
  });

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
          alert("hi")
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
    <>
      <Nav />
      <div className="detail-container">
        <div className="detail-row">
          {result.map((v, i) => {
            return (
              <div key={i}>
                <div className="detail-item">
                  <h2>{v.order}</h2>
                </div>

                <div className="detail-row1">
                  <div className="detail-imgCol">
                    <img src={v.img} alt=" " />
                  </div>
                  <div className="detail-itemCol">
                    <h2 className="brandName">{v.brandName}</h2>
                    <p className="secondOne">
                      {v.brandName} {v.productName},{v.orginalWeight}
                    </p>
                    <h3 className="cutprice">
                      {v.mrp}
                      <span>{v.cutMrp}</span>
                    </h3>
                    <p className="orginalMRp">Price : Rs {v.orginalMRp}</p>
                    <h2 className="save">You Save: 27%</h2>
                    <p className="taxes">(Inclusive of all taxes)</p>
                    <div className="qty-group">
                      {v.isAddCart ? (
                        <div className="changeqty-btn">
                          <button
                            onClick={() => {
                              decBtn(v, i);
                            }}
                          >
                            <RemoveIcon className="sub-btn" />
                          </button>
                          <span> {v.count} </span>
                          <button
                            onClick={() => {
                              incBtn(v, i);
                            }}
                          >
                            <AddIcon className="sub-btn" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <input type="number" placeholder="1"></input>
                          <Button
                            onClick={() => handleAddCart(v, i)}
                            className="addTo-btn"
                            // endIcon={<ShoppingCartIcon />}
                          >
                            ADD TO Basket
                          </Button>
                          <button className="saveBtn">SAVE</button>{" "}
                        </>
                      )}
                    </div>
                    <div className="imgicon-row">
                      <div className="imgIcon">
                        <img
                          className="hover-img"
                          src={v.imgIcon}
                          alt="imgIcon"
                        />
                      </div>
                      <span>{v.time}</span>
                    </div>
                    <p className="ps">Pack Sizes</p>
                    <div className="packSize">
                      <div className="packSize-row">
                        <div className="packSize-weight">
                          <p>{v.weight1}</p>
                        </div>
                        <div className="packSize-price">
                          <p className="packSize-rs">Rs.{v.price1}</p>
                          <p className="packSize-cutprice">
                            {v.mrp}<del>{v.cutMrp}</del>
                          </p>
                          <p className="pacKSize-offer">31% Off</p>
                        </div>
                        <div className="tick-icon">
                          <CheckIcon className="checkIcon"/>
                        </div>
                      </div>

                      <div className="packSize-row">
                        <div className="packSize-weight">
                          <p>{v.weight2}</p>
                        </div>
                        <div className="packSize-price">
                          <p className="packSize-rs">Rs.{v.price2}</p>
                          <p className="packSize-cutprice">
                            {v.mrp}<del>{v.cutMrp}</del>
                          </p>
                          <p className="pacKSize-offer">31% Off</p>
                        </div>
                        <div className="tick-icon">
                          <CheckIcon className="checkIcon"/>
                        </div>
                      </div>

                      <div className="packSize-row">
                        <div className="packSize-weight">
                          <p>{v.weight3}</p>
                        </div>
                        <div className="packSize-price">
                          <p className="packSize-rs">Rs.{v.price3}</p>
                          <p className="packSize-cutprice">
                            {v.mrp}<del>{v.cutMrp}</del>
                          </p>
                          <p className="pacKSize-offer">31% Off</p>
                        </div>
                        <div className="tick-icon">
                          <CheckIcon className="checkIcon"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SmartDetails;
//<img src={v.img} alt=""/>
//    box-shadow: 1px 5px 6px 0px;


