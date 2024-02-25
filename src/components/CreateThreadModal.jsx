import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../states/isModalOpen/action'
import CreateThreadForm from './CreateThreadForm'

export default function ThreadModal() {
  const open = useSelector((state) => state.isModalOpen)
  const dispatch = useDispatch()

  const onModalClose = () => {
    dispatch(closeModal())
  }

  return (
    <dialog id="CreateThreadModal" className="modal modal-bottom md:modal-middle" open={open} onClose={onModalClose}>
      <div className="modal-box w-full min-h-96 max-h-full pt-12 md:max-w-xl md:h-auto md:min-h-fit">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute left-4 top-4">✕</button>
        </form>
        <CreateThreadForm />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}
