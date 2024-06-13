import { useState } from "react";
import { NavLink } from "react-router-dom"; // ajuda a criar o componente href por baixo dos panos, além de tratar algumas questões do react dom, também acrescenta o className='active" em função do path corrente

import { Container } from './styles'

import { ReactComponent as BurgerIcon } from '../../assets/burger.svg'
import { ReactComponent as PizzaIcon } from '../../assets/pizza.svg'
import { ReactComponent as SodaPopIcon } from '../../assets/soda.svg'
import { ReactComponent as IceCreamIcon } from '../../assets/ice-cream.svg'

import menuImg from '../../assets/menu.svg'

export function Sidebar() {
  // para fazer a função do menu expandir primeiro temos que definir um state, para que quando o botão sofra um click ele altere esse state, esse valor de estado
  const [menuOpen, setMenuOpen] = useState(false) // declaração de constante do state do menu

  // função que vai manipular esse state, essa função que vai estar no onClick do button
  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen) // inverte o valor do meunuOpen
    // set menuOpen vai receber o valor do menuOpen invertido
  // o "!" serve para valores booleanos
  }

  return (
    <Container isMenuOpen={menuOpen}>
    {/* Container é um styled.components, então eu tenho que ter a possibilidade com o styled.components receber props (propriedade) e fazer alguma com isso.

    Porque se fosse em um componente react normal daria para fazer, então também tras essa possibilidade de enviar propriedade para ele

    isMenuOpen é uma propriedade

    Para que o menu tenha a função de expandir eu tenho que passar o valor de state para o Container e o Container vai decidir o que fazer com isso, então ele vai fazer a lógica if dentro da largura */}
      <button type='button' onClick={handleToggleMenu}>
        <img src={menuImg} alt='Abrir e fechar o menu' />
      </button>
      <nav>
        <ul>
          <li>
            <NavLink to="/" >
              <BurgerIcon />
              <span>Hambúrgueres</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="pizzas">
              <PizzaIcon />
              <span>Pizzas</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="drinks">
              <SodaPopIcon />
              <span>Bebidas</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="ice-creams">
              <IceCreamIcon />
              <span>Sorvetes</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </Container>
  )
}
