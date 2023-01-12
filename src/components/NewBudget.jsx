import { useState } from "react";
import { Message } from "./Message";

export const NewBudget = ({ budget, setBudget, setIsValidBudget }) => {

  const [message, setMessage] = useState('');

  const handleBudget = (e) => {
    e.preventDefault();

    if((!budget) || (budget) < 0){
      setMessage('No es un presupuesto valido');
      return;
    }
    setMessage('');
    setIsValidBudget(true);
  }
  
  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={ handleBudget } className="formulario">
        <div className="campo">
          <label htmlFor="">Definir Presupuesto</label>
          <input 
            className="nuevo-presupuesto"          
            type="number" 
            placeholder="Agrega tu presupuesto"
            value={budget}
            onChange={ e => setBudget(Number(e.target.value))}
          />
          <input type="submit" value="Agregar" />
          {message && <Message type="error" >{message}</Message>}
        </div>
      </form>
    </div>
  )
}
