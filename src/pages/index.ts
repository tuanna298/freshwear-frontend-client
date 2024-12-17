import { lazy } from 'react'

const Home = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./home')
})

const Shop = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./shop')
})

const ProductDetail = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./product-detail')
})

const ViewCart = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./view-cart')
})

const Wishlist = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./wishlist')
})

const Compare = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./compare')
})

const Checkout = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./checkout')
})

const MyAccount = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./my-account')
})

const OrderSuccess = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./order-success')
})

const OrderFailed = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./order-failed')
})

const Contact = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./contact')
})

const AboutUs = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./about-us')
})

const ResetPassword = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./reset-password')
})

const SignIn = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./sign-in')
})

const SignUp = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./sign-up')
})

const ErrorComponent = lazy(async () => {
	await new Promise((r) => setTimeout(r, 300))
	return import('./error-component')
})

export {
	AboutUs,
	Checkout,
	Compare,
	Contact,
	ErrorComponent,
	Home,
	MyAccount,
	OrderFailed,
	OrderSuccess,
	ProductDetail,
	ResetPassword,
	Shop,
	SignIn,
	SignUp,
	ViewCart,
	Wishlist,
}
