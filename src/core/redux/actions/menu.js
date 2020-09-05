import {
  FETCH_MENU_SUCCESS
} from '../actionTypes/menu'
import fetchApi from 'core/api'
import { setLoader, resetLoader } from './main'

const fetchMenuSuccess = (menuItems) => ({
  type: FETCH_MENU_SUCCESS,
  payload: { menuItems }
})

export const fetchMenu = () => async dispatch => {
  dispatch(setLoader())
  try {
    const response = await fetchApi('GET', `/menu`)

    dispatch(fetchMenuSuccess(response.data))
  } catch (error) {
    throw error
  } finally {
    dispatch(resetLoader())
  }
}
