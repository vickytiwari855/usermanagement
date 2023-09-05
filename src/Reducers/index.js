import { combineReducers } from 'redux'
import userReducer from './userReducer';
import editReducer from './editReducer';
import editRoleReducer from './editRoleReducer';
import roleReducer from './roleReducer';
export const rootReducer = combineReducers({ userReducer, editReducer, editRoleReducer, roleReducer });
