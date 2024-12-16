import Footer from '@/components/custom/footer'
import { Header } from '@/components/custom/header'
import ScrollToTop from '@/components/custom/scroll-to-top'
import ScrollToTopButton from '@/components/custom/scroll-top-btn'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import authApi from '../apis/auth.api'
import { useAuthStore } from '../hooks/use-auth-store'

const AppLayout = () => {
	const { accessToken } = useAuthStore()

	const { mutate } = useMutation({
		mutationKey: ['checkAuth'],
		mutationFn: (token: string) => authApi.introspect(token),
	})

	useEffect(() => {
		if (accessToken) {
			mutate(accessToken)
		}
	}, [accessToken])

	return (
		<div className="flex min-h-[700px] flex-col justify-between gap-0">
			<ScrollToTop />
			<Header />
			<Outlet />
			<Footer />
			<ScrollToTopButton />
		</div>
	)
}

export default AppLayout
