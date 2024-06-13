import React, { useState } from "react";

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
            <a href=" " className="active">
              <BurgerIcon />
              <span>Hambúrgueres</span>
            </a>
          </li>
          <li>
            <a href=" ">
              <PizzaIcon />
              <span>Pizzas</span>
            </a>
          </li>
          <li>
            <a href=" ">
              <SodaPopIcon />
              <span>Bebidas</span>
            </a>
          </li>
          <li>
            <a href=" ">
              <IceCreamIcon />
              <span>Sorvetes</span>
            </a>
          </li>
        </ul>
      </nav>
    </Container>
  )
}
