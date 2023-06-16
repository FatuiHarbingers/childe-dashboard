import type { inferAsyncReturnType } from '@trpc/server'
import type { RequestEvent } from '@sveltejs/kit'
import { CookieKey } from '$lib/constants'

// eslint-disable-next-line require-await
export async function createContext( event: RequestEvent ) {
	const userId = event.cookies.get( CookieKey.UserId )

	return {
		userId
	}
}

export type Context = inferAsyncReturnType<typeof createContext>
