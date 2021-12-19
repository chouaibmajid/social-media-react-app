import {combineReducers} from "redux"
import reducer from "./reducer"
import {AuthReducer} from "./AuthReducer"
const rootReducer = combineReducers({
    Posts: reducer,
    Auth: AuthReducer,
})
export default rootReducer