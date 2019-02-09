import {combineReducers} from 'redux';
import fileReducer from './fileReducer';
export default combineReducers({
    file:fileReducer
});