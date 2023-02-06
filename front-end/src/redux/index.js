import { combineReducers } from "redux";
import { contentReducer, selectedContentReducer, selectedCategoryReducer } from "./reducers/contentReducer";
import authReducer from "./reducers/authReducer"
import messageReducer from "./reducers/messageReducer"


const reducers = combineReducers({
    allContents: contentReducer,
    content: selectedContentReducer,
    category : selectedCategoryReducer,
    authReducer,
    messageReducer,
});

export default reducers;
