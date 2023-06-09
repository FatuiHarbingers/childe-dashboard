import { createContext } from './lib/trpc/context'
import { createTRPCHandle } from 'trpc-sveltekit'
import type { Handle } from '@sveltejs/kit'
import { router } from './lib/trpc/router'

export const handle: Handle = createTRPCHandle( { createContext, router } )
