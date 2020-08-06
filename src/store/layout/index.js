const INITIAL_STATE = {};

export default (state=INITIAL_STATE, action) => {


    switch (action.type) {
        case 'SHOW_MESSAGE':
            return {...state, showMessage: true}
            
        case 'HIDE_MESSAGE':
            return {...state, showMessage:false}
        
        default: return state;
    }
}

export const Types = {
    SHOW_MESSAGE: 'SHOW_MESSAGE',
    HIDE_MESSAGE: 'HIDE_MESSAGE'
}
export const ShowMessage = () => {
    return {
        type: 'SHOW_MESSAGE',
    }
}
export const HideMessage = () => {
    return {
        type: 'HIDE_MESSAGE',
    }
}