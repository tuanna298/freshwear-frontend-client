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

export {
	Checkout,
	Compare,
	Home,
	MyAccount,
	OrderSuccess,
	ProductDetail,
	Shop,
	ViewCart,
	Wishlist,
}
