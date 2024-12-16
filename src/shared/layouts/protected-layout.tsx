import { ROUTE_PATHS } from '@/shared/common/constants'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../hooks/use-auth-store'

const { SIGN_IN } = ROUTE_PATHS

const ProtectedLayout = () => {
	const { accessToken, refreshToken } = useAuthStore()

	if (!accessToken || !refreshToken) {
		return <Navigate to={SIGN_IN} />
	}

	return <Outlet />
}

export default ProtectedLayout
