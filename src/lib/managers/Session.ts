import { Time } from '@sapphire/duration'
import { env } from '../env'
import { redis } from '../redis'
import { s } from '@sapphire/shapeshift'
import { REST } from '@discordjs/rest'

export interface SessionData {
	access_token: string
	created_at: number
	expires_in: number
	refresh_token: string
	scope: string
	token_type: string
}

export class Session {
	protected readonly data: SessionData
	public readonly rest: REST
	protected static readonly validator = s.object<SessionData>( {
		access_token: s.string,
		created_at: s.number,
		expires_in: s.number,
		refresh_token: s.string,
		scope: s.string,
		token_type: s.string
	} )

	protected constructor( data: SessionData ) {
		this.data = data
		this.rest = new REST( {
			authPrefix: 'Bearer',
			version: '10'
		} ).setToken( data.access_token )
	}

	protected static getKey( state: string ): string {
		return `childe:sessions/${ state }`
	}

	public static async create( code: string, state: string ): Promise<void> {
		const params = new URLSearchParams( {
			client_id: env.DISCORD_CLIENT_ID,
			client_secret: env.DISCORD_CLIENT_SECRET,
			code,
			grant_type: 'authorization_code',
			redirect_uri: env.DISCORD_REDIRECT_URI
		} )
		const req = await fetch( `${ env.DISCORD_API }/oauth2/token`, {
			body: params,
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			method: 'POST'
		} )
		const res = await req.json() as SessionData
		res.created_at = Date.now()

		const key = this.getKey( state )
		await redis.hset( key, res )
		await redis.expire( key, Time.Day * 6 )
	}

	public static async fetch( userId: string ): Promise<Session> {
		const key = this.getKey( userId )
		const exists = await redis.exists( key )
		if ( !exists ) throw new Error( `Invalid session: ${ userId }` )

		const cached = await redis.hgetall( key )
		const data = this.validator.parse( {
			...cached,
			created_at: parseInt( cached.created_at, 10 ),
			expires_in: parseInt( cached.expires_in, 10 )
		} )
		return new Session( data )
	}
}
