import { users } from './routes'
import { t } from './t'

export const router = t.router( {
	users
} )

export type Router = typeof router
