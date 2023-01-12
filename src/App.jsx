import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Modal } from "./components/Modal";
import { ListSpent } from "./components/ListSpent";
import { generarId } from "./helpers";
import IconNewSpent from "./img/nuevo-gasto.svg";
import { Filter } from "./components/Filter";

function App() {

  const [spents, setSpents] = useState(JSON.parse(localStorage.getItem('gastos')) ?? []);

  const [budget, setBudget] = useState(Number(localStorage.getItem('presuesto')) ?? 0);
  const [isValidBudget, setIsValidBudget] = useState(false);
  const [modal, setModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  const [gastoEditar, setGastoEditar] = useState({});

  const [filter, setFilter] = useState('');
  const [spentFilter, setSpentFilter] = useState([]);

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      setModal(true);
      setTimeout(() => {
        setAnimateModal(true)
      }, 500);
    }
  }, [gastoEditar])
  
  useEffect(() => {
    localStorage.setItem('presuesto', budget ?? 0)
  }, [budget])
  
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(spents) ?? [])
  }, [spents])

  useEffect(() => {
    if(filter){
      const gastosFiltrados = spents.filter( spent => spent.categoria === filter);
      setSpentFilter(gastosFiltrados);
    }
  }, [filter])
  
  
  useEffect(() => {
    if(budget > 0){
      setIsValidBudget(true);
    }
  }, [])
  

  const handleNewSpent = () => {
    setModal(true);
    setGastoEditar({})
    setTimeout(() => {
      setAnimateModal(true)
    }, 500);
  }

  const saveSpent = (gasto) => {

    if(gasto.id){
      const gastosActualizados = spents.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setSpents(gastosActualizados);
      setGastoEditar({});
    }else{
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setSpents([...spents, gasto]);
    }


    setAnimateModal(false)
    setTimeout(() => {
      setModal(false);
    }, 500);

  }

  const deleteSpent = (id) => {
    const gastosActualizados = spents.filter( gastoState => gastoState.id !== id);
    setSpents(gastosActualizados);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        budget={ budget }
        setSpents={ setSpents } 
        setBudget={ setBudget }
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
        spents={spents}
      />

      {
        isValidBudget && (
          <>
            <main>
              <Filter 
                setFilter={setFilter}
                filter={filter}
              />
              <ListSpent
                spents={spents}
                setGastoEditar={setGastoEditar}
                deleteSpent={deleteSpent}
                filter={filter}
                spentFilter={spentFilter}
              />
            </main>
            <div className="nuevo-gasto">
                <img 
                  src={IconNewSpent} 
                  alt="Icon New Spent" 
                  onClick={handleNewSpent}
                />
            </div>
          </>
        )
      }

      {
        modal && 
          <Modal 
            setModal={setModal} 
            animateModal={animateModal} 
            setAnimateModal={setAnimateModal} 
            saveSpent={saveSpent}
            gastoEditar={gastoEditar}
            setGastoEditar={setGastoEditar}
          />
      }

    </div>
  )
}

export default App
