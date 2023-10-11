import React, { useContext, useEffect, useState } from "react";
import logo from "../../Component/Img/logo.png";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import "./Nav.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { stateContext } from "../CreateContext";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../FireBsae";
import { MuiOtpInput } from "mui-one-time-password-input";

const Nav = () => {
  const [open, setOpen] = React.useState(false);
  const { state, dispatch } = useContext(stateContext);

  //add and multiple
  const handleAmount = () => {
    let fullAmount = 0;
     state.allAddCart.map((v) => {
      fullAmount += v.orginalMRp * v.count;
    });
    dispatch({ type: "amount", payload: fullAmount });
  };

  useEffect(() => {
    handleAmount();
  }, [state.allAddCart]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const items = [
    {
      key: "1",
      type: "group",
      label: "Group title",
      children: [
        {
          key: "1-1",
          label: "Foodgrains, Oil & Masala",
        },
        {
          key: "1-2",
          label: "Bakery, Cakes & Dairy",
        },
      ],
    },
    {
      key: "2",
      label: "Fruits & Vegetables",
      children: [
        {
          key: "2-1",
          label: "Exotic Fruits & Veggies",
        },
        {
          key: "2-2",
          label: "Fresh Fruits",
        },
      ],
    },
    {
      key: "3",
      label: "Beverages",
      //   disabled: true,
      children: [
        {
          key: "3-1",
          label: "Coffee",
        },
        {
          key: "3-2",
          label: "Tea",
        },
      ],
    },
    {
      key: "4",
      label: "Eggs, Meat & Fish",
      //   disabled: true,
      children: [
        {
          key: "4-1",
          label: "Eggs",
        },
        {
          key: "4-2",
          label: "Eggs, Meat & Fish",
        },
        {
          key: "4-3",
          label: "Mutton & Lamb",
        },
        {
          key: "4-4",
          label: "Marinades",
        },
      ],
    },
  ];

  //toggle click show items
  const handleShow = () => {
    let show = document.querySelector(".basketItem-sec");
    show.classList.toggle("basket-show");
  };

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
          } else return {...prod}
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

  //popup modal
  const [opens, setOpens] = React.useState(false);
  const handleOpens = () => setOpens(true);
  const handleCloses = () => setOpens(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 340,
    height: "66%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  //otp
  const [phoneNum, setPhoneNum] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(true);

  const configureCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onSignInSubmit();
      },
    });
  };
  const onSignInSubmit = (e) => {
    e.preventDefault();
    configureCaptcha();
    const phoneNumber = "+91" + phoneNum;
    const appVerifier = window.recaptchaVerifier;
    console.log(phoneNumber);

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setShowOtp(false);
        console.log("otpSend");
        // ...
      })
      .catch((error) => {
        console.log("otpNotSend");
        // Error; SMS not sent
        // ...
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const code = otp;
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user));
        alert("otp verifity");
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };
  return (
    <section className="nav-sec">
      <div className="nav-container">
        <div className="nav-row">
          <div className="nav-img">
            <img src={logo} alt="bigBasket" />
          </div>
          <div className="nav-search">
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "210%",
                height: "33px",
                border: "1px solid",
              }}
            >
              <InputBase
                // className="inputbox"
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search for Products.."
                inputProps={{ "aria-label": "search google maps" }}
              />
              <IconButton
                type="button"
                sx={{
                  p: "10px",
                  background: "#84c225",
                  borderRadius: "0",
                  height: "31px",
                  width: "39px",
                  marginRight: "-4px",
                }}
                aria-label="search"
              >
                <SearchIcon className="searchicon" />
              </IconButton>
            </Paper>
          </div>

          <div className="nav-add">
            <Tooltip
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              // title="Add"
            >
              <Button
                onClick={handleShow}
                className="shop-add"
                startIcon={<ShoppingCartIcon className="shop-icon" />}
              >
                My Basket<br></br>
                {state.allAddCart.length} items
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="nav-row2">
          <div className="nav-dropdown">
            <Dropdown
              menu={{
                items,
              }}
            >
              <p onClick={(e) => e.preventDefault()}>
                <Space>
                  SHOW BY CATEGORY
                  <DownOutlined />
                </Space>
              </p>
            </Dropdown>
          </div>
          <div className="nav-offer">
            <div className="offer-hover">
              <LocalOfferIcon className="icontag" />
              <span className="offer-tag">OFFERS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="nav-block">
        <div className="nav-containernav">
          <div className="nav-row">
            <div className="nav-img">
              <img src={logo} alt="bigBasket" />
            </div>
            <div className="nav-search">
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: "210%",
                  height: "33px",
                  border: "1px solid",
                }}
              >
                <InputBase
                  // className="inputbox"
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search for Products.."
                  inputProps={{ "aria-label": "search google maps" }}
                />
                <IconButton
                  type="button"
                  sx={{
                    p: "10px",
                    background: "#84c225",
                    borderRadius: "0",
                    height: "31px",
                    width: "39px",
                    marginRight: "-4px",
                  }}
                  aria-label="search"
                >
                  <SearchIcon className="searchicon" />
                </IconButton>
              </Paper>
            </div>

            <div className="nav-add">
              <Tooltip
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                // title="Add"
              >
                <Button
                  onClick={handleShow}
                  className="shop-add"
                  startIcon={<ShoppingCartIcon className="shop-icon" />}
                >
                  My Basket<br></br>
                  {state.allAddCart.length} items
                </Button>
              </Tooltip>
            </div>
          </div>
          <div className="nav-row2">
            <div className="nav-dropdown">
              <Dropdown
                menu={{
                  items,
                }}
              >
                <p onClick={(e) => e.preventDefault()}>
                  <Space>
                    SHOW BY CATEGORY
                    <DownOutlined />
                  </Space>
                </p>
              </Dropdown>
            </div>
            <div className="nav-offer">
              <div className="offer-hover">
                <LocalOfferIcon className="icontag" />
                <span className="offer-tag">OFFERS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="basketItem-sec basket-show">
        <div className="basketItem-container">
          {state.allAddCart.length === 0 ? (
            <div className="empty">
              Your basket is empty. Start shopping now!!
            </div>
          ) : (
            <>
              <div className="basketItem-row">
                {state.allAddCart.map((v, i) => {
                  return (
                    <div className="basketItem-col" key={i}>
                      <div className="basketItem-img">
                        <img src={v.img} alt=""></img>
                        <div className="itemsName">
                          <h2>{v.brandName}</h2>
                          <p>
                            {v.brandName} {v.productName}
                            <span>{v.orginalWeight}</span>
                          </p>
                          <h4>
                            {v.count}x Rs.{v.orginalMRp}
                          </h4>
                        </div>
                      </div>

                      <div className="addSub-btn">
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
                      <div className="price">Rs.{v.orginalMRp}</div>
                    </div>
                  );
                })}
              </div>
              <div className="item-sale">
                <div className="delivery">
                  <p>
                    **Actual Delivery Charges computed at checkout<span>?</span>
                  </p>
                </div>
                <div className="sub-total">
                  <div className="total">
                    <p>
                      Sub Total : <span>Rs.{state.totalAmount}</span>
                    </p>
                    <p>
                      Delivery Charge : <span>**</span>
                    </p>
                  </div>
                  <div className="view">
                    <button onClick={handleOpens}>
                      View Basket & Checkout
                    </button>
                    <Modal
                      open={opens}
                      onClose={handleCloses}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        {showOtp ? (
                          <>
                            <div className="sign-card">
                              <p className="login">LOGIN/SIGN UP</p>
                              <div id="sign-in-button"></div>
                              <form onSubmit={onSignInSubmit}>
                                <div className="inputbox">
                                  <Box
                                    component="form"
                                    sx={{
                                      "& > :not(style)": {
                                        m: 1,
                                        width: "30ch",
                                      },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                  >
                                    <TextField
                                      value={phoneNum}
                                      onChange={(e) =>
                                        setPhoneNum(e.target.value)
                                      }
                                      id="standard-basic"
                                      label="Enter Mobile Number (10-digit)"
                                      variant="standard"
                                      className="label"
                                    />
                                  </Box>
                                </div>
                                <div className="down">
                                  <Button
                                    className="loginBtn"
                                    variant="outlined"
                                  >
                                    Login using Mobile Number
                                  </Button>
                                  <Button className="continueBtn" type="submit">
                                    Continue
                                  </Button>
                                  <p class="small">
                                    By continuing, I accept TCP-bigbasket’s{" "}
                                    <a
                                      className="a"
                                      href="/terms-and-conditions/"
                                      target="_blank"
                                    >
                                      Terms and Conditions
                                    </a>{" "}
                                    and{" "}
                                    <a
                                      className="a"
                                      href="/privacy-policy/"
                                      target="_blank"
                                    >
                                      Privacy Policy.
                                    </a>
                                  </p>
                                </div>
                              </form>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="sign-card">
                              <p className="login">Signup Using OTP</p>
                              <h2 className="check-para">
                                Please check the OTP sent to your mobile number
                              </h2>
                              <h2 className="otp-number">{phoneNum}</h2>
                              <h2 className="enter">Enter OTP</h2>
                              <form onSubmit={onSubmit}>
                                <div className="inputbox">
                                  <Box
                                    component="form"
                                    sx={{
                                      "& > :not(style)": {
                                        m: 1,
                                        width: "30ch",
                                      },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                  >
                                    <MuiOtpInput
                                      value={otp}
                                      length={6}
                                      onChange={(newValue) => setOtp(newValue)}
                                      autoFocus
                                    />
                                    {/* <TextField
                            value={otp}
                            onChange={(e)=>setOtp(e.target.value)}
                              id="standard-basic"
                              label="Enter Mobile Number (10-digit)"
                              variant="standard"
                              className="label"
                            /> */}
                                  </Box>
                                </div>
                                <div className="down">
                                  <Button className="continueBtn" type="submit">
                                    Signup
                                  </Button>
                                  <p class="small">
                                    By continuing, I accept TCP-bigbasket’s{" "}
                                    <a
                                      className="a"
                                      href="/terms-and-conditions/"
                                      target="_blank"
                                    >
                                      Terms and Conditions
                                    </a>{" "}
                                    and{" "}
                                    <a
                                      className="a"
                                      href="/privacy-policy/"
                                      target="_blank"
                                    >
                                      Privacy Policy.
                                    </a>
                                  </p>
                                </div>
                              </form>
                            </div>
                          </>
                        )}
                      </Box>
                    </Modal>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Nav;
