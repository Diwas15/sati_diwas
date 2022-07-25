export const initialState = {
    basket: [],
    user:null
    
};

const reducer = (state, action) => {
    // console.log(action);
    switch(action.type){
        case "ADD_TO_BASKET":
            //logic for adding to basket
            // console.log(action.type);
            return {
                ...state,
                basket:[...state.basket, action.item]
            }
            
        case "REMOVE_FROM_BASKET":
            let newBasket = [...state.basket];
            const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);
            if(index>=0){
                // console.log("hello");
                newBasket.splice(index,1);

            }
            else{
                console.log(`cant remove product with id:${action.id}`);
            }
            return {...state , basket: newBasket,};
            default:
            return {...state};
    }
}

export default reducer;

