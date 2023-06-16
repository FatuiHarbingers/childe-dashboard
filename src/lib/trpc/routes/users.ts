import { Session } from '$lib/managers'
import { redis } from '$lib/redis'
import { type APIUser, Routes } from 'discord-api-types/v10'
import { isLoggedIn } from '../middlewares/IsLoggedIn'
import { t } from '../t'

const procedure = t.procedure.use( isLoggedIn )

const me = procedure.query( async opts => {
	const { userId } = opts.ctx

	const cacheKey = `childe:users/${ userId }`
	const cacheExists = await redis.exists( cacheKey )
	if ( cacheExists ) {
		return await redis.hgetall( cacheKey ) as unknown as APIUser
	}

	const session = await Session.fetch( userId )
	const user = await session.rest.get( Routes.user() ) as APIUser

	await redis.hset( cacheKey, user )
	await redis.expire( cacheKey, 60 * 15 )
	return user
} )

export const users = t.router( {
	me
} )
