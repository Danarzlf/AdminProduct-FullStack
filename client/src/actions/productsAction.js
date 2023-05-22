import axios from 'axios';

export const GET_PRODUCTS = "GET_PRODUCTS";

export const getProducts = () => {
    return (dispatch) => {
        // get data from API
        axios.get('http://localhost:8000/api/v1/products')
            .then(function (response) {
                // console.log(response.data.data)
                dispatch({
                    type: GET_PRODUCTS,
                    // action.payload.data = hasil response data dari API
                    payload: {
                        data: response.data.data
                    }
                })
            })
            .catch(function (error) {
                console.log(error.message)
                dispatch({
                    type: GET_PRODUCTS,
                    payload: {
                        data: []
                    }
                })
            })
    }
}