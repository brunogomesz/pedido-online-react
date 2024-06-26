import { ReactNode, createContext, useEffect, useState } from 'react'

import { SnackData } from '../interfaces/SnackData'
import { getBurgers, getDrinks, getIceCreams, getPizzas } from '../services/api'

interface SnackContextProps {
  burgers: SnackData[]
  pizzas: SnackData[]
  drinks: SnackData[]
  iceCreams: SnackData[]
}

interface SnackProviderProps {
  children: ReactNode;
}

// usando o Context para armazenar os valores carregados em variáveis reservadas na memória, para que não seja preciso ficar chamando a api toda que vez que mudar de página
// o crateContext precisa de alguns valores por padrão
export const SnackContext = createContext({} as SnackContextProps)

export function SnackProvider({ children }: SnackProviderProps) {
  const [burgers, setBurgers] = useState<SnackData[]>([])
  const [pizzas, setPizzas] = useState<SnackData[]>([])
  const [drinks, setDrinks] = useState<SnackData[]>([])
  const [iceCreams, setIceCreams] = useState<SnackData[]>([])

  // dispara no momento que o componente está sendo exibido
  // primeiiro parametro função de execução
  // array vazio que seriam os states para serem observados
  useEffect(() => {
    (async () => {
      try {
        // burgerRequest dentro vai ter os dados que vem da API e também a resposta do AXIOS
        // porém temos que seperar isso em dados e request
        const burgerRequest = await getBurgers()
        const pizzaRequest = await getPizzas()
        const drinkRequest = await getDrinks()
        const iceCreamRequest = await getIceCreams()

        const requests = [burgerRequest, pizzaRequest, drinkRequest, iceCreamRequest]

        const [
          {data: burgerResponse},
          {data: pizzaResponse},
          {data: drinkResponse},
          {data: iceCreamResponse},
        ] = await Promise.all(requests)

        setBurgers(burgerResponse)
        setPizzas(pizzaResponse)
        setDrinks(drinkResponse)
        setIceCreams(iceCreamResponse)
      } catch (error) {
        console.error(error)
      }
    })()
  },[])

  return (
    <SnackContext.Provider value={{ burgers, pizzas, drinks, iceCreams }}>
      {children}
    </SnackContext.Provider>
  )

}
