export const notificationReducer = (
    state = { message: '', messageType: '', timeoutId: null },
    action
) => {
    console.log("reducer", action)
    switch (action.type) {
        case 'SET_MESSAGE':
            //console.log(`message set in store ${action.message}`)
            return { ...state, message: action.message, messageType: action.messageType }
        case 'CLEAR_MESSAGE':
            return { ...state, message: '', messageType: '' }
        case 'SET_TIMEOUTID':
            //console.log("setting timeoutId", action.timeoutId)
            return { ...state, timeoutId: action.timeoutId }
        case 'CLEAR_TIMEOUTID':
            //console.log("clearing timeoutid", state.timeoutId)
            clearTimeout(state.timeoutId)
            return { ...state, timeoutId: null }

        default:
            return state
    }
}

export const notificationSideEffects = (state, dispatch) => {
       if (state.message!=''){
        if (state.timeoutId){
            dispatch({type: "CLEAR_TIMEOUTID"})
        }
        const timeoutId = setTimeout(() => {
            //console.log("timeout finished", state.message)
            dispatch({ type: 'CLEAR_MESSAGE' })
            
        }, 10000)
        dispatch({ type: 'SET_TIMEOUTID', timeoutId: timeoutId })
    }
    }


export const initialNotificationState = { message: '', messageType: '', timeoutId: null }