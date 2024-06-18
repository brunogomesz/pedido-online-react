import { createContext, useEffect, useState } from 'react'

import { BrowserRouter } from 'react-router-dom'

import { AppRoutes } from './routes'

import { Normalize } from 'styled-normalize'
import { GlobalStyle } from './styles/global'
import { Theme } from './styles/Theme'

import { SnackData } from './interfaces/SnackData'
import { getBurgers } from './services/api'

interface SnackContextProps {
  burgers: SnackData[]
  // pizzas: SnackData[]
  // drinks: SnackData[]
  // iceCreams: SnackData[]
}

// usando o Context para armazenar os valores carregados em variáveis reservadas na memória, para que não seja preciso ficar chamando a api toda que vez que mudar de página
// o crateContext precisa de alguns valores por padrão
export const SnackContext = createContext({} as SnackContextProps)

export default function App() {

  const [burgers, setBurgers] = useState<SnackData[]>([])

  // dispara no momento que o componente está sendo exibido
  // primeiiro parametro função de execução
  // array vazio que seriam os states para serem observados
  useEffect(() => {
    (async () => {
      // burgerRequest dentro vai ter os dados que vem da API e também a resposta do AXIOS
      // porém temos que seperar isso em dados e request
      const burgerRequest = await getBurgers()

      setBurgers(burgerRequest.data)
    })()
  },[])

  return (
    <BrowserRouter>
      <Theme>
        <SnackContext.Provider value={{ burgers }}>
          <AppRoutes />
          <GlobalStyle />
          <Normalize />
        </SnackContext.Provider>
      </Theme>
    </BrowserRouter>
  )
}
