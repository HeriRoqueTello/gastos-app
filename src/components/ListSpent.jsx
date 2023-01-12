import React from 'react'
import { Spent } from './Spent'

export const ListSpent = ({ spents, setGastoEditar, deleteSpent, filter, spentFilter }) => {
  return (
    <div className='listado-gastos contenedor'>

      {
        filter ? (
          
          <>
            <h2>{ spentFilter.length ? 'Gastos' : 'No hay gastos en esta categoria' }</h2>
            {spentFilter.map( spent => (
              <Spent 
                key={spent.id} 
                spent={spent} 
                setGastoEditar={setGastoEditar}
                deleteSpent={deleteSpent}
              />
            ))}

          </>

          
          ) : (
            
            <>
            <h2>{ spents.length ? 'Gastos' : 'No hay gastos aun' }</h2>
            {spents.map( spent => (
              <Spent 
                key={spent.id} 
                spent={spent} 
                setGastoEditar={setGastoEditar}
                deleteSpent={deleteSpent}
              />
            ))}

          </>

        )
      }


    </div>
  )
}
