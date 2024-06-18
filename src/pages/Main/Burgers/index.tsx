import { useState, useEffect } from "react"

import { Head } from "../../../components/Head"
import { SnackTitle } from "../../../components/SnackTitle"
import { Snacks } from "../../../components/Snacks"

import { getBurgers } from "../../../services/api"
import { SnackData } from "../../../interfaces/SnackData"

export default function Burgers() {
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
    <>
      <Head title="Hambúrgueres" description="Nossos melhores burguers"/>
      <SnackTitle>Hambúrgueres</SnackTitle>
      <Snacks snacks={burgers}></Snacks>
    </>
  )
}
