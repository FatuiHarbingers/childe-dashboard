import { error, redirect } from '@sveltejs/kit'
import { randomUUID } from 'crypto'
import type { RequestEvent } from './$types'
import { Time } from '@sapphire/duration'
import { CookieKey } from '$lib/constants'
import { env } from '$lib/env'
import { Session } from '$lib/managers'

export async function GET( req: RequestEvent ) {
	const code = req.url.searchParams.get( 'code' )
	const state = req.url.searchParams.get( 'state' )

	if ( !code || !state ) {
		const userId = randomUUID()
		req.cookies.set( CookieKey.UserId, userId, {
			expires: new Date( Date.now() + Time.Day * 6 ),
			path: '/'
		} )
		const url = new URL( 'https://discord.com/api/oauth2/authorize' )
		url.searchParams.set( 'client_id', env.DISCORD_CLIENT_ID )
		url.searchParams.set( 'redirect_uri', env.DISCORD_REDIRECT_URI )
		url.searchParams.set( 'response_type', 'code' )
		url.searchParams.set( 'scope', 'identify guilds guilds.members.read' )
		url.searchParams.set( 'state', userId )
		throw redirect( 302, url.href )
	}

	if ( req.cookies.get( CookieKey.UserId ) !== state ) {
		throw error( 400 )
	}

	await Session.create( code, state )

	throw redirect( 302, '/' )
}
