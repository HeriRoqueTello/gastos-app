
import { useEffect, useState } from "react";
import IconClose from "../img/cerrar.svg"
import { Message } from "./Message";

export const Modal = ({setModal, animateModal, setAnimateModal, saveSpent, gastoEditar, setGastoEditar}) => {

  const [message, setMessage] = useState('');

  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fecha, setFecha] = useState('')
  const [id, setId] = useState('');


  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      setNombre(gastoEditar.nombre);
      setCantidad(gastoEditar.cantidad);
      setCategoria(gastoEditar.categoria);
      setId(gastoEditar.id);
      setFecha(gastoEditar.fecha);
    }
  }, [])
  

  const hiddenModal = () => {
    setAnimateModal(false);
    setGastoEditar({})
    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if([ nombre, cantidad, categoria ].includes('')){
      setMessage('Todos los campos son obligatorios.')

      setTimeout(() => {
        setMessage('');
      }, 3000);

      return;
    }

    saveSpent({nombre, cantidad, categoria, id, fecha})
    
  }
  
  return (
    <div className="modal">
      <div className="cerrar-modal">
          <img 
            src={IconClose} 
            alt="Icon Close Modal"
            onClick={hiddenModal}
          />
      </div>

      <form 
        className={`formulario ${animateModal ? 'animar' : 'cerrar'}`}
        onSubmit={handleSubmit}
      >
        <legend>{ gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto' }</legend>
        {message && <Message type="error" >{message}</Message>}

        <div className="campo">
          <label htmlFor="nombre">Gasto</label>
          <input 
            type="text" 
            id="nombre"
            placeholder="Nombre del gasto"
            value={ nombre }
            onChange={ e => setNombre(e.target.value) }
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input 
            type="number" 
            id="cantidad"
            placeholder="Cantidad del gasto"
            value={ cantidad }
            onChange={ e => setCantidad(Number(e.target.value)) }
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select id="categoria" onChange={e => setCategoria( e.target.value )} value={categoria}>
            <option value=""> -- Seleccione -- </option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input type="submit" value={ gastoEditar.nombre ? 'Guardar Gasto' : 'Nuevo Gasto' } />
      </form>
    </div>
  )
}
