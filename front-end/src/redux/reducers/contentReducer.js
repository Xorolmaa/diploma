import { Navigate } from "react-router";
import {ActionTypes} from  "../constants/action-types"

const initialState = {
    contents:[],
}

// how to store 

export const contentReducer = (state = initialState, {type, payload}) => {
    switch (type){
        case ActionTypes.SET_CONTENTS: 
            return {...state, contents: payload};
        default:
            return state;
    }}

const initialStateContent = {
    content: null
}

export const selectedContentReducer = (state = initialStateContent, {type, payload}) => {
    switch (type){
        case ActionTypes.SELECTED_CONTENT: 
            return {...state, content: payload};
        case ActionTypes.REMOVE_SELECTED_CONTENT: 
            return {};
        default:
            return state;
    }}

const initialStateCategory = {
        category: 0
    }
export const selectedCategoryReducer = (state = initialStateCategory, {type, payload}) => {
        switch (type){
            case ActionTypes.SELECTED_CATEGORY: 
                return {...state, payload};
            // case ActionTypes.REMOVE_SELECTED_CONTENT: 
            //     return {};
            default:
                return state;
        }}


    
