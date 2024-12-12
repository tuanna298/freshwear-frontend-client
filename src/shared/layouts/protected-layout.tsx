import { User } from '@/schemas/auth/user.schema'
import { AUTH_KEYS, ROUTE_PATHS } from '@/shared/common/constants'
import { useGetIdentity } from '@refinedev/core'
import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../hooks/use-auth-store'

const { SIGN_IN } = ROUTE_PATHS
const { AUTH, PROFILE } = AUTH_KEYS

const ProtectedLayout = () => {
	const { accessToken, setProfile } = useAuthStore()
	const { data } = useGetIdentity<User>({
		queryOptions: {
			queryKey: [AUTH, PROFILE, accessToken],
		},
	})

	useEffect(() => {
		if (data) {
			setProfile(data)
		}
	}, [data])

	if (!accessToken) {
		return <Navigate to={SIGN_IN} />
	}

	return <Outlet />
}

export default ProtectedLayout
