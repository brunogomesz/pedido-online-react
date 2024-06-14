interface HeadProps {
  title: string
  description?: string // interrogação porque a descrição é opcional
}

// title, description desconstruiram o props de acordo com a minha interface
export function Head ({title, description = ''} : HeadProps){ // Ajustar os títulos e a descrição do document
  document.title = `Food Commerce | ${title}`
  document.querySelector('[name=description]')?.setAttribute('content', description)
  // o "?" siginifica que caso o retorno da função seja nulo, ignora do ? para frente

  return null
}
