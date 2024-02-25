const actionType = {
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL'
}

function openModal() {
  return {
    type: actionType.OPEN_MODAL,
    payload: {
      value: true
    }
  }
}

function closeModal() {
  return {
    type: actionType.CLOSE_MODAL,
    payload: {
      value: false
    }
  }
}

export { actionType, openModal, closeModal }
