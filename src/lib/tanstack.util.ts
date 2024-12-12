import { AppToast } from '@/components/ui/toast'
import { BaseErrorResponse } from '@/shared/common/interfaces'
import { AxiosError } from 'axios'

export const handleError = (error: AxiosError<BaseErrorResponse>) => {
	const errorMessage = getErrorDetailMessage(error)
	AppToast.error(errorMessage)
}

export const getErrorDetailMessage = (error: AxiosError<BaseErrorResponse>) => {
	return (
		error.response?.data.error?.details ??
		(error?.response?.data as any)?.message?.join(', ') ??
		'Đã xảy ra lỗi không xác định.'
	)
}

export const getErrorSumaryMessage = (error: AxiosError<BaseErrorResponse>) => {
	return error.response?.data.error?.message ?? 'Vui lòng thử lại sau.'
}
