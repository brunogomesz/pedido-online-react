import { ReactNode } from "react";
import { Title } from "./styles";

// definando o tipo da propriedade pois no TypeScript precisamos definir explicitamente o tipo das coisas
interface TitleProps {
  children: ReactNode
}

export function SnackTitle({ children }: TitleProps){
  return <Title>{children}</Title>
  // children é uma propriedade especial do react que é passada como propriedade do componente, que é passada "automaticamente"
}
