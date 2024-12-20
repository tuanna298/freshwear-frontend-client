import { AppToast } from '@/components/ui/toast'
import { handleError } from '@/lib/axios.util'
import authApi from '@/shared/apis/auth.api'
import { ROUTE_PATHS } from '@/shared/common/constants'
import { useAuthStore } from '@/shared/hooks/use-auth-store'
import { AuthProvider } from '@refinedev/core'

const { ROOT, SIGN_IN } = ROUTE_PATHS

export default {
	login: async ({ username, password }) => {
		const { setAccessToken, setRefreshToken, clear } = useAuthStore.getState()
		try {
			const {
				data: { access_token, refresh_token },
			} = await authApi.signIn({
				username,
				password,
			})

			setAccessToken(access_token)
			setRefreshToken(refresh_token)

			return Promise.resolve({
				success: true,
				redirectTo: ROOT,
				successNotification: {
					message: 'Chào mừng bạn quay trở lại!',
				},
			})
		} catch (error) {
			clear()
			const { errorMessage, errorDescription } = handleError(error)

			return Promise.resolve({
				success: false,
				error: {
					message: errorDescription,
					name: errorMessage,
				},
			})
		}
	},
	register: async ({ email, username, password }) => {
		try {
			const { data } = await authApi.signUp({
				email,
				username,
				password,
			})

			AppToast.success('Đăng ký thành công!')
			return {
				success: true,
				redirectTo: SIGN_IN,
				data,
			}
		} catch (error) {
			const { errorMessage, errorDescription } = handleError(error)

			return {
				success: false,
				error: {
					message: errorDescription,
					name: errorMessage,
				},
			}
		}
	},
	logout: async () => {
		const { accessToken, clear } = useAuthStore.getState()
		try {
			authApi.signOut({
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
		} catch (error) {
			console.error('Error logging out in server', error)
		} finally {
			clear()
		}

		return {
			success: true,
			redirectTo: SIGN_IN,
		}
	},
	check: async () => {
		const { accessToken, clear } = useAuthStore.getState()

		if (accessToken) {
			try {
				authApi.signOut({
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				})

				return {
					authenticated: true,
				}
			} catch (error) {
				clear()
				console.error('Error fetching identity:', error)
				return {
					authenticated: false,
					error: { message: 'Kiểm tra thất bại', name: 'Token không hợp lệ' },
					logout: true,
					redirectTo: SIGN_IN,
				}
			}
		} else {
			return {
				authenticated: false,
				error: { message: 'Kiểm tra thất bại', name: 'Token không hợp lệ' },
				logout: true,
				redirectTo: SIGN_IN,
			}
		}
	},
	forgotPassword: async ({ email }) => {
		try {
			await authApi.requestForgotPassword(email)

			AppToast.success(
				'Gửi yêu cầu thành công!, chúng tôi sẽ gửi email hướng dẫn đặt lại mật khẩu cho bạn',
			)
			return {
				success: true,
				redirectTo: ROOT,
			}
		} catch (error) {
			const { errorMessage, errorDescription } = handleError(error)

			return {
				success: false,
				error: {
					message: errorDescription,
					name: errorMessage,
				},
			}
		}
	},
	getPermissions: async () => null,
	getIdentity: async () => {
		const { accessToken } = useAuthStore.getState()
		if (!accessToken) return null

		try {
			return (await authApi.getProfile()).data
		} catch (error) {
			console.error('Error fetching user identity', error)
			return null
		}
	},
	onError: async (error) => {
		return { error }
	},
} as AuthProvider
