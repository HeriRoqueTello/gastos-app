import { useEffect, useState } from 'react'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const ControlBudget = ({ budget, spents, setSpents, setBudget, setIsValidBudget }) => {

  const [porcentaje, setPorcentaje] = useState(0)
  const [available, setAvailable] = useState(0);
  const [gastado, setGastado] = useState(0);
  
  useEffect(() => {
    const totalGastado = spents.reduce( (total, gasto) => gasto.cantidad + total, 0 );
    const totalDisponible = budget - totalGastado;

    // const porcent = ((gastado * 100)/ budget).toFixed(2);
    const porcent = (((budget - totalDisponible) / budget) * 100).toFixed(2);
    setAvailable(totalDisponible)
    setGastado(totalGastado);
    
    setTimeout(() => {
      setPorcentaje(porcent);
    }, 800);

  }, [spents]);


  
  
  
  const formatAmount = (amount) => {
    return Number(amount).toLocaleString('es-PE', {
      style:'currency',
      currency: 'PEN'
    });
  };

  const handleReset = () => {
    const resultado = confirm('Estas seguro que quieres reiniciar la APP?');
    if(resultado){
      setSpents([]);
      setBudget('');
      setIsValidBudget(false);
    }
  }  

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div>
        <CircularProgressbar 
          value={porcentaje} 
          text={`${porcentaje}% Gastado`} 
          styles={buildStyles({
            pathColor: porcentaje > 100 ? '#A01112' : '#7433FF',
            trailColor: '#483B79',
            textColor: available < 0 ? '#A01112' : '#7433FF'
          })}
        />;
      </div>
      <div className='contenido-presupuesto'>
        <button className='reset-app' type='button' onClick={handleReset}>Resetear APP</button>
        <p>
          <span>Presupuesto: </span> {formatAmount(budget)}
        </p>
        <p className={`${available < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span> {formatAmount(available)}
        </p>
        <p>
          <span>Gastado: </span> {formatAmount(gastado)}
        </p>
      </div>
    </div>
  )
}
