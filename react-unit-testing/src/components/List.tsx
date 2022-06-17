import React, { useState } from 'react'

type ListProps = {
    initialItems: string[]
}

function List({ initialItems }: ListProps) {
  const [newItem, setNewItem] = useState('')
  const [list, setList] = useState(initialItems)

  function addToList(){
    setTimeout(() => {
      setList(state => [...state, newItem])
    }, 500)
  }

  function removeFromList(itemRemove: string) {
    setTimeout(() => {
      setList(state => state.filter(item => item !== itemRemove))
    }, 500)
  }

  return (
    <>
      <input placeholder='Novo item' value={newItem} onChange={e => setNewItem(e.target.value)} />
      <button onClick={addToList}>Adicionar</button>
      <ul>
        {list.map(item => (
          <li key={item}>
            {item}
            <button onClick={() => removeFromList(item)}>Remover</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default List
