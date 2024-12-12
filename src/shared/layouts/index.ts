import { lazy } from 'react'

const AppLayout = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./app-layout')
})

const ProtectedLayout = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./protected-layout')
})

const PublicLayout = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./public-layout')
})

export { AppLayout, ProtectedLayout, PublicLayout }
