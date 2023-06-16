import { Redis } from 'ioredis'
import { env } from './env'

export const redis = new Redis( {
	db: env.REDIS_DB,
	host: env.REDIS_HOST,
	password: env.REDIS_PASSWORD,
	port: env.REDIS_PORT,
	username: env.REDIS_USERNAME
} )
