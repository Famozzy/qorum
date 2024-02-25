import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useInput from '../hooks/useInput'
import { asyncCreateThreadAndCategory } from '../states/shared/action'

export default function CreateThreadForm() {
  const categories = useSelector((state) => state.categories)
  const dispatch = useDispatch()

  const [title, onTitleChange] = useInput()
  const [body, onBodyChange] = useInput()
  const [category, onCategoryChange] = useInput()

  const submitHandler = (ev) => {
    ev.preventDefault()
    dispatch(asyncCreateThreadAndCategory({ title, body, category }))
  }

  return (
    <form className="space-y-2" onSubmit={submitHandler}>
      <input
        type="text"
        className="input text-xl font-semibold input-ghost rounded-none w-full border-0 focus:outline-0 p-0 focus:border-b focus:border-primary"
        placeholder="An Interest Title"
        value={title}
        onChange={onTitleChange}
        required
      />
      <input
        type="text"
        placeholder="A Cool Category"
        className="input input-xs input-ghost rounded-none w-full border-0 focus:outline-0 p-0 mt-2 mb-4 focus:border-b focus:border-primary"
        list="categories"
        value={category}
        onChange={onCategoryChange}
        required
      />
      <datalist id="categories">
        {categories.map((category, i) => {
          return <option key={i} value={category} />
        })}
      </datalist>
      <div
        className="min-h-28 outline outline-1 outline-neutral-content/10 rounded-lg text-neutral-content/70 overflow-auto p-1.5 focus:outline-primary"
        onInput={onBodyChange}
        contentEditable
      ></div>
      <button type="submit" className="btn btn-primary btn-sm text-xs px-8 mt-4 absolute right-4 top-2">
        Post
      </button>
    </form>
  )
}
