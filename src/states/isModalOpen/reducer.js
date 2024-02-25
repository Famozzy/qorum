import { actionType } from './action'

export default function isModalOpenReducer(modal = false, action = {}) {
  switch (action.type) {
    case actionType.OPEN_MODAL:
      return action.payload.value
    case actionType.CLOSE_MODAL:
      return action.payload.value
    default:
      return modal
  }
}
