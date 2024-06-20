import { ReactNode, createContext, useEffect, useState } from 'react'
import { SnackData } from '../interfaces/SnackData'

interface Snack extends SnackData{
  quantity: number
  subtotal: number
}

interface RemoveSnackFromCart {
  id: number
  snack: string
  newQuantity: number
}

interface UpdateCartProps {
  id: number
  snack: string
  newQuantity: number
}

interface CartContextProps {
  cart: Snack[]
  addSnackIntoCart: (snack: SnackData) => void // função de adicionar no carrinho - void retorna vazio, não retorna nada
  // removeSnackFromCart: ({id, snack}: RemoveSnackFromCart) => void
  // updateCart: ({id, snack, newQuantity}: UpdateCartProps) => void
}

interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextProps)

export function CartProvider({ children }: CartProviderProps){
  const [cart, setCart] = useState<Snack[]>([])

  //função de adicionar
  function addSnackIntoCart (snack: SnackData): void {

      //buscar
  const snackExistentInCart = cart.find((item) => item.snack === snack.snack && item.id === snack.id)

  //atualizar
  if (snackExistentInCart) {
    // map vai passar por todos os itens do array e atualizar com a função abaixo e vai retornar o novo array para o newCart do escopo
    const newCart = cart.map((item) => {
      if (item.id === snack.id) {
        const quantity = item.quantity + 1
        const subtotal = item.price * quantity

        return {...item, quantity, subtotal} // vai retornar o valor substituindo as propriedades
      }

      return item
    })
    console.log(`newCart atualização`, newCart)
    setCart(newCart)

    return
  }

    // função que monta um novo snack baseado no snack que tem como parametro (SnackData)
    const newSnack = {...snack, quantity: 1, subtotal:snack.price} // construir um novo array, incorporando os atributos do snack
    //adiciona o snack no cart existente
    const newCart = [...cart, newSnack] // push de um array, coloca o novo cart no final da fila

    console.log(`newCart adição`, newCart)

    setCart(newCart)
  }

  return (
    <CartContext.Provider value={{ cart, addSnackIntoCart}}>
      {children}
    </CartContext.Provider>
  )
}
