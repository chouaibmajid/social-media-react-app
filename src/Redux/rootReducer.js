import {combineReducers} from "redux"
import reducer from "./reducer"
const rootReducer = combineReducers({
    Posts: reducer,
})
export default rootReducer