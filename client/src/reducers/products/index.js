import { GET_PRODUCTS } from "../../actions/productsAction";

const initialState = {
    productsData: []
}

const products = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                productsData: action.payload.data
            }            
        default:
            return state
    }
}

export default products;