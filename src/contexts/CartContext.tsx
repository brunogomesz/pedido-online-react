import { createContext, ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom' // é um hook que permite extrair um método que serve para navegação
import { toast } from 'react-toastify'

import { SnackData } from '../interfaces/SnackData'

import { snackEmoji } from '../helpers/snackEmoji'
import { CustomerData } from '../interfaces/CustomerData'

interface Snack extends SnackData {
  quantity: number
  subtotal: number
}

interface CartContextProps {
// void retorna vazio, não retorna nada
  cart: Snack[]
  addSnackIntoCart: (snack: SnackData) => void
  removeSnackFromCart: (snack: Snack) => void
  snackCartIncrement: (snack: Snack) => void
  snackCartDecrement: (snack: Snack) => void
  confirmOrder: () => void
  payOrder: (customer: CustomerData) => void
}

interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextProps)

  const localStorageKey = '@FoodCommerce:cart'

export function CartProvider({ children }: CartProviderProps) {
  const navigate = useNavigate()
  const [cart, setCart] = useState<Snack[]>(() => {
    const value = localStorage.getItem(localStorageKey)

    // se value conter dados do localStorage retorna os arquivos em JSON
    if (value) {
      return JSON.parse(value)
    }

    return []

    // função vai continuar retornando dados vazios só quando não tiver dados no localStorage
  }) // recuperar as informações do localStorage usando o useState

  // salvando as informações do carrinho no localStorage
  function saveCart(items: Snack[]){
    setCart(items)
    localStorage.setItem(localStorageKey, JSON.stringify(items))
  }

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
      saveCart(newCart)

      return
    }
// função que monta um novo snack baseado no snack que tem como parametro (SnackData)
    const newSnack = { ...snack, quantity: 1, subtotal: snack.price } // construir um novo array, incorporando os atributos do snack
    //adiciona o snack no cart existente
    const newCart = [...cart, newSnack] // push de um array, coloca o novo cart no final da fila

    toast.success(`${snackEmoji(snack.snack)} ${snack.name} adicionado nos pedidos!`)
    saveCart(newCart)
  }

  function removeSnackFromCart(snack: Snack) {
    const newCart = cart.filter((item) => !(item.id === snack.id && item.snack === snack.snack))

    saveCart(newCart)
  }

  function updateSnackQuantity(snack: Snack, newQuantity: number) {
    if (newQuantity <= 0) return // não pode ter menos que 1 snack

    const snackExistentInCart = cart.find((item) => item.id === snack.id && item.snack === snack.snack)

    if(!snackExistentInCart) return

    const newCart = cart.map((item) => {
      if (item.id === snackExistentInCart.id && item.snack === snackExistentInCart.snack) {
        return {
          ...item,
          quantity: newQuantity,
          subtotal: item.price * newQuantity
        }
      }

      return item
    })

    saveCart(newCart)
  }

  function snackCartIncrement(snack: Snack) {
    updateSnackQuantity(snack, snack.quantity + 1)
  }

  function snackCartDecrement(snack: Snack) {
    updateSnackQuantity(snack, snack.quantity - 1)
  }

  //direciona para tela de pagamento
  function confirmOrder() {
    navigate('/payment')
  }

  function payOrder(customer: CustomerData) {
    console.log('payOrder', cart, customer)
    // chamada de API para o back-end
    return
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
        payOrder
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
