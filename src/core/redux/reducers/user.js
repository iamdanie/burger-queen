import {
    LOG_IN_SUCCESS,
    LOG_IN_ERROR,
    LOG_OUT_SUCCESS,
    REGISTER_USER_SUCCESS,
    UPDATE_USER_PASSWORD_SUCCESS
} from '../actionTypes/users'

export const initialState = {
    user: null,
    userToken: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                userToken: action.payload.token
            }
        case LOG_OUT_SUCCESS:
        case UPDATE_USER_PASSWORD_SUCCESS:
        case LOG_IN_ERROR:
            return { ...state, user: null, userToken: null }
        case REGISTER_USER_SUCCESS:
        default:
            return state
    }
}
