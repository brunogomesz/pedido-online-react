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
  const { addSnackIntoCart } = useCart()


  return (
    <Container>
      {/* Em um ambiente normal de JavaScript colocariamos a {} depois do => porque vai vim uma função em seguida, mas em jsx colocamos () */}
      {!snacks.length ? ( // carrega o Skeleton de loading
        [1,2,3,4].map((n) => <SkeletonSnack key={n} />)
      ) : (
        snacks.map((snack) => (
          <div key={snack.id} className='snack'>
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
        ))
      )}
    </Container>
  )
}


// no commit formatando snack instalamos um biblioteca através do terminal chamando
// npm i react-icons -S (para usar o + no botão para adicionar lanche)
// npm i polished -S (Vai calcular uma cor que acrescentar, cor pode ser mais clara ou mais escura)
