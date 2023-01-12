import { ControlBudget } from "./ControlBudget"
import { NewBudget } from "./NewBudget"

export const Header = ({ budget, setBudget, isValidBudget, setIsValidBudget, spents, setSpents }) => {
  return (
    <header>
      <h1>Planificador de gastos</h1>
      {
        isValidBudget ? (
          <ControlBudget 
            budget={ budget }
            setBudget={setBudget}
            spents={spents}
            setSpents={setSpents}
            setIsValidBudget={setIsValidBudget}
          />
        ) : (
          <NewBudget 
            budget={ budget } 
            setBudget={ setBudget }
            setIsValidBudget={setIsValidBudget}
          />
        )
      }
    </header>
  )
}
