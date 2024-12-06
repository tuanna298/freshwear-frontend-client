import { lazy } from 'react'

const AppLayout = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./app-layout')
})

export { AppLayout }
