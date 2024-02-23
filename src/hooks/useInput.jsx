import { useState } from 'react'

export default function useInput(initialValue = '') {
  const [value, setValue] = useState(initialValue)

  const onChange = (e) => {
    e.target.tagName === 'TEXTAREA' ? setValue(e.target.textContent) : setValue(e.target.value)
  }

  return { value, onChange }
}
