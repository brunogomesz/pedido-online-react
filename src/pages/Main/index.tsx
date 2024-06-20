import { Outlet } from 'react-router-dom' // componente que renderiza sub-páginas que pertence a página principal

import { Sidebar } from '../../components/Sidebar'
import { MyOrder } from '../../components/MyOrder'

import { Container } from './styles'

import logoImg from '../../assets/logo.svg'

export default function Main() {
  return (
    <Container>
      <Sidebar />
      <section>
        <img src={logoImg} />
        <Outlet />
      </section>
      <MyOrder />
    </Container>
  )

}
