import React from 'react'

import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import { formatearFecha } from '../helpers';

import IconAhorro from '../img/icono_ahorro.svg';
import IconCasa from '../img/icono_casa.svg';
import IconComida from '../img/icono_comida.svg';
import IconGastos from '../img/icono_gastos.svg';
import IconOcio from '../img/icono_ocio.svg';
import IconSalud from '../img/icono_salud.svg';
import IconSuscripciones from '../img/icono_suscripciones.svg';


export const Spent = ({ spent, setGastoEditar, deleteSpent }) => {

  const diccionarioIconos = {
    ahorro : IconAhorro,
    comida : IconComida,
    casa : IconCasa,
    gastos : IconGastos,
    ocio : IconOcio,
    salud : IconSalud,
    suscripciones : IconSuscripciones,
  }

  const { nombre, cantidad, categoria, id, fecha } = spent;

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setGastoEditar(spent)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  )
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => deleteSpent(id)}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className='gasto sombra'>
          <div className='contenido-gasto'>

            <img src={diccionarioIconos[categoria]} alt="Icono ahorro" />
            <div className='descripcion-gasto'>
              <p className='categoria'>{ categoria }</p>
              <p className='nombre-gasto'>{ nombre }</p>
              <p className='fecha-gasto'>
                Agregado: {''}
                <span>{formatearFecha(fecha)}</span>
              </p>
            </div>
          </div>
          <p className='cantidad-gasto'>S/{cantidad}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}
