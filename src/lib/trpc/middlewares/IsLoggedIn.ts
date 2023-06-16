import { TRPCError } from '@trpc/server'
import { t } from '../t'

export const isLoggedIn = t.middleware( opts => {
	if ( !opts.ctx.userId ) {
		throw new TRPCError( {
			code: 'UNAUTHORIZED'
		} )
	}

	return opts.next( {
		ctx: {
			userId: opts.ctx.userId
		}
	} )
} )
