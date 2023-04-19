import { useReducer, createContext } from "react";


export const CartContext = createContext();

const initialState = [];

const reducer = (state, action) => {
    switch(action.type) {
        case "receive-cart-info-from-server": {
            return [...action.data]
        }
        case "add-item": {
            return [
                ...state,
                action.item,
            ]
        } case "remove-item": {
            return state.filter(item => item.itemId !== action.itemId)
        } case "change-quantity": {
            return state.map(item => {
                if(item.itemId === Number(action.item.itemId)) {
                    item.numToBuy = Number(action.item.numToBuy);
                }
                return item;
            });
        } case "empty-cart": {
            return [];
        } default: {
            throw new Error("unrecognized action: " + action.type);
        }
    }

}
export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const receiveCartInfoFromServer = (data) => {
        dispatch({type: "receive-cart-info-from-server", data});
    }
    const addItem = (item) => {
        dispatch({type: "add-item", item})
    }
    const removeItem = (itemId) => {
        dispatch({type: "remove-item", itemId})
    }
    const changeQuantity = (item) => {
        dispatch({type: "change-quantity", item})
    }
    const emptyCart = () => {
        dispatch({type: "empty-cart"})
    }

    return (
        <CartContext.Provider value={
            {state, 
            actions: {
                receiveCartInfoFromServer,
                addItem, 
                removeItem,
                changeQuantity,
                emptyCart
            }}}>
            {children}
        </CartContext.Provider>
    )
}