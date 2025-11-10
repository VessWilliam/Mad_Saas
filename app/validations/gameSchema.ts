import * as yup from 'yup'
import type { GameModel } from '~~/types/game_model'

export const gameSchema: yup.ObjectSchema<Partial<GameModel>> = yup.object({
  id: yup.number().optional(),
  title: yup.string().required('Title is required'),
  genre: yup.string().required('Genre is required'),
  platform: yup.string().optional(),
  price: yup.number().required('Price is required').min(0),
  stock: yup.number().required('Stock is required').min(0),
  status: yup.string().required('Status is required'),
})