import { createContext, ReactNode, useState } from 'react'
import { toast } from 'react-toastify'

import { SnackData } from '../interfaces/SnackData'

import { snackEmoji } from '../helpers/snackEmoji'

interface Snack extends SnackData {
  quantity: number
  subtotal: number
}

interface CartContextProps {
// void retorna vazio, não retorna nada
  cart: Snack[]
  addSnackIntoCart: (snack: SnackData) => void
  removeSnackFromCart: (id: number, snack: Snack) => void
  snackCartIncrement: (id: number, snack: Snack) => void
  snackCartDecrement: (id: number, snack: Snack) => void
  confirmOrder: () => void
}

interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextProps)

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Snack[]>([])

//função de adicionar
  function addSnackIntoCart(snack: SnackData): void {

  //buscar
    const snackExistentInCart = cart.find(
      (item) => item.snack === snack.snack && item.id === snack.id,
    )

    if (snackExistentInCart) {
	 // map vai passar por todos os itens do array e atualizar com a função abaixo e vai retornar o novo array para o newCart do escopo
      const newCart = cart.map((item) => {
        if (item.id === snack.id) {
          const quantity = item.quantity + 1
          const subtotal = item.price * quantity

          return { ...item, quantity, subtotal } // vai retornar o valor substituindo as propriedades
        }

        return item
      })

      toast.success(`Outro(a) ${snackEmoji(snack.snack)} ${snack.name} adicionado nos pedidos!`)
      setCart(newCart)

      return
    }
// função que monta um novo snack baseado no snack que tem como parametro (SnackData)
    const newSnack = { ...snack, quantity: 1, subtotal: snack.price } // construir um novo array, incorporando os atributos do snack
    //adiciona o snack no cart existente
    const newCart = [...cart, newSnack] // push de um array, coloca o novo cart no final da fila

    toast.success(`${snackEmoji(snack.snack)} ${snack.name} adicionado nos pedidos!`)
    setCart(newCart)
  }

  function removeSnackFromCart(id: number, snack: Snack) {
    //
  }

  function updateSnackQuantity(id: number, snack: Snack, newQuantity: number) {
    //
  }

  function snackCartIncrement(id: number, snack: Snack) {
    updateSnackQuantity(id, snack, snack.quantity + 1)
  }

  function snackCartDecrement(id: number, snack: Snack) {
    updateSnackQuantity(id, snack, snack.quantity - 1)
  }

  function confirmOrder() {
    //
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addSnackIntoCart,
        removeSnackFromCart,
        snackCartIncrement,
        snackCartDecrement,
        confirmOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
