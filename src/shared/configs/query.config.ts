import { AppToast } from '@/components/ui/toast'
import { QueryCache, QueryClientConfig } from '@tanstack/react-query'
import { get } from 'lodash'

export default {
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: true,
			refetchOnReconnect: true,
			refetchOnMount: false,
			onError: (error: any) => {
				const errorMessage =
					error?.response?.data?.detail?.message ||
					error?.response?.data?.detail
				const message = Array.isArray(errorMessage)
					? errorMessage.join(', ')
					: errorMessage
				AppToast.error(error?.response?.data?.status_code ?? 500, {
					description: message || 'Không xác định',
				})
			},
		},
		mutations: {
			retry: (failureCount, error) => {
				if (get(error, 'response.status') === 500 && failureCount < 2)
					return true
				return false
			},
			onError: (error: any) => {
				const errorMessage =
					error?.response?.data?.detail?.message ||
					error?.response?.data?.detail
				const message = Array.isArray(errorMessage)
					? errorMessage.join(', ')
					: errorMessage
				AppToast.error(error?.response?.data?.status_code ?? 500, {
					description: message || 'Không xác định',
				})
			},
		},
	},
	queryCache: new QueryCache({
		onError: (error) => error,
	}),
} as QueryClientConfig
