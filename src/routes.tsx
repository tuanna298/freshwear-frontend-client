import { Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import MyAccountOverview from './components/custom/my-account/my-account-overview'
import MyOrders from './components/custom/my-account/my-orders'
import MyProfile from './components/custom/my-account/my-profile'
import {
	Checkout,
	ErrorComponent,
	Home,
	MyAccount,
	OrderFailed,
	OrderSuccess,
	ProductDetail,
	Shop,
	SignIn,
	SignUp,
	ViewCart,
	Wishlist,
} from './pages'
import Compare from './pages/compare'
import { AppLayout, ProtectedLayout, PublicLayout } from './shared/layouts'

export default () => {
	const location = useLocation()

	return (
		<Routes location={location}>
			<Route element={<AppLayout />}>
				<Route element={<PublicLayout />}>
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
					<Route
						path="/order-failed"
						element={
							<Suspense fallback={null}>
								<OrderFailed />
							</Suspense>
						}
					/>

					<Route
						path="/sign-in"
						element={
							<Suspense fallback={null}>
								<SignIn />
							</Suspense>
						}
					/>
					<Route
						path="/sign-up"
						element={
							<Suspense fallback={null}>
								<SignUp />
							</Suspense>
						}
					/>
				</Route>

				<Route element={<ProtectedLayout />}>
					<Route
						path="/my-account"
						element={
							<Suspense fallback={null}>
								<MyAccount />
							</Suspense>
						}
					>
						<Route
							path="/my-account/"
							element={
								<Suspense fallback={null}>
									<MyAccountOverview />
								</Suspense>
							}
						/>
						<Route
							path="/my-account/orders"
							element={
								<Suspense fallback={null}>
									<MyOrders />
								</Suspense>
							}
						/>
						<Route
							path="/my-account/profile"
							element={
								<Suspense fallback={null}>
									<MyProfile />
								</Suspense>
							}
						/>
					</Route>
				</Route>

				<Route path="*" element={<ErrorComponent />} />
			</Route>
		</Routes>
	)
}
