import {ActionTypes} from  "../constants/action-types"

export const setContents = (contents) => {
    return {
        type: ActionTypes.SET_CONTENTS,
        payload: contents
    };
};

export const selectedContent = (content) => {
    return {
        type: ActionTypes.SELECTED_CONTENT,
        payload: content
    };
}; 

export const removeSelectedContent = (content) => {
    return {
        type: ActionTypes.REMOVE_SELECTED_CONTENT,
         payload: content
    };
};  

export const selectedCategory = (category) => {
    return {
        type: ActionTypes.SELECTED_CATEGORY,
        payload: category
    };
}; 