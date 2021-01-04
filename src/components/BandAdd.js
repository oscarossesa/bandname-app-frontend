import React, { useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext'

const BandAdd = () => {

  const [value, setValue] = useState('')
  const { socket } = useContext(SocketContext)

  const onSubmit = (event) => {
    event.preventDefault()

    if (value.trim().length > 0) {

      // Emitir evento para agregar una banda
      socket.emit('add-band', { name: value })

      setValue('')
    }
  }

  return (
    <>
      <h3>Agregar Banda</h3>
      <form onSubmit={onSubmit}>
        <input
          className="form-control"
          onChange={(event) => setValue(event.target.value)}
          placeholder="Nuevo nombre de banda"
          value={value}
        ></input>
      </form>
    </>
  )
}

export default BandAdd
