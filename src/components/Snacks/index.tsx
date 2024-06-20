import { currencyFormat } from "../../helpers/currencyFormat" // função que usa a biblioteca que está em helpers para formatar o preço
import { SnackData } from "../../interfaces/SnackData"
import { useCart } from "../../hooks/useCart"

import { SkeletonSnack } from "./SkeletonSnack"
import { Container } from "./styles"
import { FiPlus } from "react-icons/fi"

interface SnacksProps {
  snacks: SnackData[]
}

export function Snacks({ snacks }: SnacksProps){
  const { cart, addSnackIntoCart } = useCart()


  return (
    <Container>
      {/* Em um ambiente normal de JavaScript colocariamos a {} depois do => porque vai vim uma função em seguida, mas em jsx colocamos () */}
      {!snacks.length
        ? [1, 2, 3, 4].map((n) => <SkeletonSnack key={n} />)
        : snacks.map((snack) => { // para executar qualquer código JavaScript dentro da função, precisa colocar o return, mas só executa o código se for colocado a chave "{}"
            const snackExistent = cart.find(
              (item) => item.snack === snack.snack && item.id === snack.id,
            )

            return ( // refere-se a um retorno do jsx
              <div key={snack.id} className='snack'>
                {/* bolinha que mostra a quantidade de snack selecionada */}
                {snackExistent && <span>{snackExistent.quantity}</span>}
                <h2>{snack.name}</h2>
                <img src={snack.image} alt={snack.name} />
                <p>{snack.description}</p>
                <div>
                  <strong>{currencyFormat(snack.price)}</strong>
                  <button type='button' onClick={() => addSnackIntoCart(snack)}>
                    <FiPlus />
                  </button>
                </div>
              </div>
            )
          })}
    </Container>
  )
}


// no commit formatando snack instalamos um biblioteca através do terminal chamando
// npm i react-icons -S (para usar o + no botão para adicionar lanche)
// npm i polished -S (Vai calcular uma cor que acrescentar, cor pode ser mais clara ou mais escura)
