import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import {
	Checkout,
	Home,
	MyAccount,
	OrderSuccess,
	ProductDetail,
	Shop,
	ViewCart,
	Wishlist,
} from './pages'
import Compare from './pages/compare'
import { AppLayout } from './shared/layouts'

export default () => (
	<Routes>
		<Route element={<AppLayout />}>
			<Route
				path="/"
				element={
					<Suspense fallback={null}>
						<Home />
					</Suspense>
				}
			/>
			<Route
				path="/shop"
				element={
					<Suspense fallback={null}>
						<Shop />
					</Suspense>
				}
			/>
			<Route
				path="/product-detail/:id"
				element={
					<Suspense fallback={null}>
						<ProductDetail />
					</Suspense>
				}
			/>
			<Route
				path="/view-cart"
				element={
					<Suspense fallback={null}>
						<ViewCart />
					</Suspense>
				}
			/>
			<Route
				path="/wishlist"
				element={
					<Suspense fallback={null}>
						<Wishlist />
					</Suspense>
				}
			/>
			<Route
				path="/checkout"
				element={
					<Suspense fallback={null}>
						<Checkout />
					</Suspense>
				}
			/>
			<Route
				path="/my-account"
				element={
					<Suspense fallback={null}>
						<MyAccount />
					</Suspense>
				}
			/>
			<Route
				path="/compare"
				element={
					<Suspense fallback={null}>
						<Compare />
					</Suspense>
				}
			/>
			<Route
				path="/order-success"
				element={
					<Suspense fallback={null}>
						<OrderSuccess />
					</Suspense>
				}
			/>
		</Route>
	</Routes>
)
