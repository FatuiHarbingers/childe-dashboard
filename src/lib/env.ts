import { load } from 'ts-dotenv'

export const env = load( {
	DISCORD_API: String,
	DISCORD_CLIENT_ID: String,
	DISCORD_CLIENT_SECRET: String,
	DISCORD_REDIRECT_URI: String,
	REDIS_DB: Number,
	REDIS_HOST: String,
	REDIS_PASSWORD: {
		default: '',
		type: String
	},
	REDIS_PORT: Number,
	REDIS_USERNAME: {
		default: '',
		type: String
	}
} )
