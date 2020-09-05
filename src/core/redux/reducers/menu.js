import {
  FETCH_MENU_SUCCESS
} from '../actionTypes/menu'

export const initialState = {
  menuItems: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MENU_SUCCESS:
      return {
        ...state,
        menuItems: action.payload.menuItems
      }
    default:
      return state
  }
}
