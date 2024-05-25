export const commentReducer = (state="", action) => {
    switch ( action.type ){
        case 'SET_COMMENT':
            //console.log("SET COMMENT", action)
            return action.comment
        default:
            return state
    }
}