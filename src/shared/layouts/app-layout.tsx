import Footer from '@/components/custom/footer'
import { Header } from '@/components/custom/header'
import ScrollToTop from '@/components/custom/scroll-to-top'
import ScrollToTopButton from '@/components/custom/scroll-top-btn'
import { AppToast } from '@/components/ui/toast'
import {
	getErrorDetailMessage,
	getErrorSumaryMessage,
} from '@/lib/tanstack.util'
import { User } from '@/schemas/auth/user.schema'
import { useGetIdentity } from '@refinedev/core'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import authApi from '../apis/auth.api'
import { AUTH_KEYS } from '../common/constants'
import { useAuthStore } from '../hooks/use-auth-store'

const { AUTH, PROFILE } = AUTH_KEYS

const AppLayout = () => {
	const { accessToken, refreshToken, setProfile } = useAuthStore()
	const { mutate, isSuccess } = useMutation({
		mutationKey: ['checkAuth'],
		mutationFn: (token: string) => authApi.introspect(token),
		onError: (error: any) => {
			const message = getErrorSumaryMessage(error)
			const detail = getErrorDetailMessage(error)
			AppToast.error(message, {
				description: detail,
			})
		},
	})

	const { data } = useGetIdentity<User>({
		queryOptions: {
			queryKey: [AUTH, PROFILE, accessToken, refreshToken],
			enabled: isSuccess,
		},
	})

	useEffect(() => {
		if (data) {
			setProfile(data)
		}
	}, [data])

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (accessToken) {
				mutate(accessToken)
			}
		}, 100)

		return () => clearTimeout(timeoutId)
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
