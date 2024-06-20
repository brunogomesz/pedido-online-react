import { Link } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'

import { Container } from './styles'

export function OrderHeader() {
  return (
    <Container>
      <Link to='/'> {/* vai para o endereço principal */}
        <img src={logoImg} alt='Food Commerce' />
      </Link>
    </Container>
  )
}
