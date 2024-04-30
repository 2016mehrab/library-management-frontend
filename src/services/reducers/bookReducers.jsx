import { GET_BOOKS_FAILED, GET_BOOKS_REQUEST, GET_BOOKS_SUCCESS } from "../constants/bookConstants"

const initialBooks={
    isLoading:false,
    books:[],
    error:null
}
const booksReducer= (state=initialBooks,action)=>{
    switch(action.type){
        case GET_BOOKS_REQUEST:
            return {
                ...state,
                isLoading:true
            }
        case GET_BOOKS_SUCCESS:
            return {
                ...state,
                isLoading:false,
                books:action.payload,
                error:null
            }
        case GET_BOOKS_FAILED:
            return {
                ...state,
                isLoading:false,
                books:[],
                error:action.payload
            }
        default:
            return state;
    }
}
export default booksReducer;