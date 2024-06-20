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
  removeSnackFromCart: ({id, snack}: RemoveSnackFromCart) => void
  updateCart: ({id, snack, newQuantity}: UpdateCartProps) => void
}

interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextProps)

export function CartProvider({ children }: CartProviderProps){
  //
}
