import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/SocketContext'

const BandList = () => {

  const { socket } = useContext(SocketContext)
  const [bands, setBands] = useState([])

  useEffect(() => {
    socket.on('current-bands', (bands) => {
      setBands(bands)
    })

    return () => socket.off('current-bands')
  }, [socket])

  useEffect(() => {
    socket.on('vote-band')
  }, [socket])

  const handleOnClickVote = id => {
    socket.emit('vote-band', id)
  }

  const handleDelete = (id) => {
    socket.emit('delete-band', id)
  }

  const handleOnChangeName = (event, id) => {
    const newBandName = event.target.value

    setBands(bands => bands.map(band => {

      if (band.id === id) {
        band.name = newBandName
      }

      return band
    }))
  }

  const handleOnBlurName = (id, name) => socket.emit('change-name', { id, name })

  const createRows = () => {
    return (
      bands.map(band => (
        <tr key={band.id}>
          <td>
            <button
              className="btn btn-primary"
              onClick={() => handleOnClickVote(band.id)}
            >+1</button>
          </td>
          <td>
            <input
              className="form-control"
              onBlur={() => handleOnBlurName(band.id, band.name)}
              onChange={(event) => handleOnChangeName(event, band.id)}
              value={band.name}
            />
          </td>
          <td>
            <h3>{band.votes}</h3>
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(band.id)}
            >
              Borrar
            </button>
          </td>
        </tr>
      ))
    )
  }

  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>
          {createRows()}
        </tbody>
      </table>
    </>
  )
}

export default BandList
