import Footer from '@/components/custom/footer'
import { Header } from '@/components/custom/header'
import ScrollToTopButton from '@/components/custom/scroll-top-btn'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
	return (
		<div>
			<Header />
			<Outlet />
			<Footer />
			<ScrollToTopButton />
		</div>
	)
}

export default AppLayout
