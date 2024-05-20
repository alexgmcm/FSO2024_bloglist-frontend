export const userReducer = (state={username: null, password: null, token: null},action)  => {
    switch (action.type){
        case 'SET_USERNAME':
            return {...state, username:action.username}
        case 'SET_PASSWORD':
            return {...state, password: action.password}
        case 'SET_NAME':
            return {...state, name: action.name}
        case 'SET_TOKEN':
            return {...state, token: action.token}

    }
}

export const initialUserState = {username: '', password: '', token: null}
