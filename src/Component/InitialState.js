import arr from "./Product.json"
// import banner from "./Product.json"
// import fruits from "./Product.json"
// import daily from "./Product.json"
// import beverage from "./Product.json"


export const initialState={
    arr:arr.smartobj,
    header:arr.bannerObj,
    fruit:arr.fruits,
    daily:arr.daily,
    beverage:arr.beverage,
    allAddCart:[],
    totalAmount:0

}
export const reducer=(state,action)=>{
    if(action.type === "updateArr"){
        return{...state, arr: action.payload}
    }
    else if(action.type === "addCartResult"){
        return{...state, arr: action.payload}
       
    }
    else if(action.type==="incbtnchange"){
        return{...state,arr:action.payload}
    }
    else if(action.type==="decbtnchange"){
        return{...state,arr:action.payload}
    }
    else if(action.type==="allAddCartpush"){
        return{...state,allAddCart:action.payload}
    }
    else if(action.type==="amount"){
        return{...state,totalAmount:action.payload}
    }
    else{
        return state
    }

}