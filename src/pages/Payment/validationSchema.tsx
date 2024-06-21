import { isValidPhone } from '@brazilian-utils/brazilian-utils'
import * as yup from 'yup'

// yup / react-hook-form
export const schema = yup
  .object({
    fullName: yup
      .string()
      .required('O nome é obrigatório.')
      .min(3, 'O nome deve ser completo.')
      .matches(/(\w.+\s).+/gi, 'O nome deve conter o sobrenome.'),
    email: yup.string().required('O email é obrigatório.').email('O email deve ser válido.'),
    mobile: yup
      .string()
      .required('O celular é obrigatório.')
      .transform((value) => value.replace(/[^\d]/g, '')) // transform - porque vai substituir tudo que não é número exemplo (), -, " " por vazio, por nada, ficando apenas os números
      .test('validateMobile', 'O celular inválido.', (value) => isValidPhone(value)),
  })
  .required()

export type FieldValues = yup.InferType<typeof schema>
