import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Checkout, Home, MyAccount, ProductDetail, Wishlist } from './pages'
import { AppLayout } from './shared/layouts'

export default () => (
	<Routes>
		<Route element={<AppLayout />}>
			<Route
				path="/"
				element={
					<Suspense>
						<Home />
					</Suspense>
				}
			/>
			<Route
				path="/shop"
				element={
					<Suspense>
						<Home />
					</Suspense>
				}
			/>
			<Route
				path="/product-detail/:id"
				element={
					<Suspense>
						<ProductDetail />
					</Suspense>
				}
			/>
			<Route
				path="/view-cart"
				element={
					<Suspense>
						<ProductDetail />
					</Suspense>
				}
			/>
			<Route
				path="/wishlist"
				element={
					<Suspense>
						<Wishlist />
					</Suspense>
				}
			/>
			<Route
				path="/checkout"
				element={
					<Suspense>
						<Checkout />
					</Suspense>
				}
			/>
			<Route
				path="/my-account"
				element={
					<Suspense>
						<MyAccount />
					</Suspense>
				}
			/>
		</Route>
	</Routes>
)
