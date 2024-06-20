import { darken } from "polished"; // vem do npm polished

import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat();
  grid-template-columns: repeat(auto-fit, minmax(300px, auto));
  gap: 1.75rem;

  @media (max-width: 500px) {
    grid-template-columns: 1fr; // quando o tamanho da tela estiver em 500px exibirá só snack por linha
  }

  .snack {
    position: relative;
    background: ${({ theme }) => theme.colors.black};
    padding: 1.75rem 1.5rem;
    border-radius: 30px;


    span { // bolinha que mostra a quantidade de snack selecionado
      position: absolute;
      top: -0.5rem;
      left: -0.5rem;

      background: ${({ theme }) => theme.colors.red};
      width: 2rem;
      height: 2rem;
      border-radius: 50%;

      display: flex;
      align-items: center;
      justify-content: center;

      font-weight: 500;
      font-size: 1.125rem;
    }

    h2{
      margin-bottom: 0.75rem;
      font-weight: 700;
      font-size: 1.5rem;
      text-align: center;
    }

    img {
      object-fit: cover; // para a imagem expandir e cobrir
      width: 100%;
      height: 11.25rem;
      border-radius: 4px;
      margin-bottom: 0.375rem;
    }

    p {
      font-size: 0.875rem;
    }

    div {
      margin-top: .875rem;

      display: flex;
      align-items: center;
      justify-content: space-between;

      strong {
        font-size: 2rem;
        font-weight: 500;
      }

      button {
        background: ${({ theme }) => theme.colors.red};
        width: 3rem;
        height: 3rem;
        border: none;
        border-radius: 50%;

        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          stroke: ${({ theme }) => theme.colors.white};
          width: 1.5rem;
          height: 1.5rem;
        }

        &:hover {
          background: ${darken(0.1, '#AA2424')};
        }


      }
    }
  }
`;


// no commit formatando snack instalamos um biblioteca através do terminal chamando
// npm i react-icons -S (para usar o + no botão para adicionar lanche)
// npm i polished -S (Vai calcular uma cor que acrescentar, cor pode ser mais clara ou mais escura)
