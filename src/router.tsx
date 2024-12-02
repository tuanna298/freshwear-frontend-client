import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './layouts/app-layout'
import Checkout from './pages/checkout'
import Home from './pages/home'
import MyAccount from './pages/my-account'
import { ProductDetail } from './pages/product-detail'
import Shop from './pages/shop'
import ViewCart from './pages/view-cart'
import Wishlist from './pages/wishlist'

export const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: 'shop',
				element: <Shop />,
			},
			{
				path: 'product-detail/:id',
				element: <ProductDetail />,
			},
			{
				path: 'view-cart',
				element: <ViewCart />,
			},
			{
				path: 'wishlist',
				element: <Wishlist />,
			},
			{
				path: 'checkout',
				element: <Checkout />,
			},
			{
				path: 'my-account',
				element: <MyAccount />,
			},
		],
	},
])
