import type { inferAsyncReturnType } from '@trpc/server'
import type { RequestEvent } from '@sveltejs/kit'

// eslint-disable-next-line require-await
export async function createContext( event: RequestEvent ) {
	return {

	}
}

export type Context = inferAsyncReturnType<typeof createContext>
