import { HeaderPlacholder } from '@/components/custom/header'
import { Button } from '@/components/ui/button'
import { AppToast } from '@/components/ui/toast'
import {
	getErrorDetailMessage,
	getErrorSumaryMessage,
} from '@/lib/tanstack.util'
import { cn } from '@/lib/utils'
import {
	resetPasswordDefaultValues,
	ResetPasswordDto,
	resetPasswordSchema,
} from '@/schemas/auth/user.schema'
import { API_URL } from '@/shared/common/constants'
import http from '@/shared/configs/http.config'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { ArrowUpRight } from 'lucide-react'
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const ResetPassword = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const {
		register,
		handleSubmit,
		formState: { errors, touchedFields },
		setValue,
		watch,
	} = useForm<ResetPasswordDto>({
		defaultValues: resetPasswordDefaultValues,
		resolver: zodResolver(resetPasswordSchema),
		mode: 'onChange',
	})

	const { mutate: reset } = useMutation({
		mutationKey: ['reset-password'],
		mutationFn: (dto: Omit<ResetPasswordDto, 'confirm_password'>) =>
			http.post(API_URL + '/auth/forgot-password/reset', dto),
		onSuccess: () => {
			AppToast.success('Đặt lại mật khẩu thành công')
			navigate('/sign-in')
		},
		onError: (error: any) => {
			const message = getErrorSumaryMessage(error)
			const detail = getErrorDetailMessage(error)
			AppToast.error(message, {
				description: detail,
			})
		},
	})

	const onSubmit: SubmitHandler<ResetPasswordDto> = (
		data: ResetPasswordDto,
	) => {
		if (!watch('token')) {
			AppToast.error('Token không hợp lệ')
		}

		reset(omit(data, 'confirm_password'))
	}

	useEffect(() => {
		const params = new URLSearchParams(location.search)
		const token = params.get('token')
		if (token) {
			setValue('token', token)
		}
	}, [location.search, setValue])

	return (
		<React.Fragment>
			<HeaderPlacholder />
			<div
				className="bg-cover bg-no-repeat pb-[65px] pr-0 ps-0 pt-[69px]"
				style={{
					backgroundImage: 'url(/assets/img/other/page-title-blog.png)',
				}}
			>
				<div className="mx-auto my-0 w-full max-w-full px-[40px]">
					<div className="text-center text-[42px] font-normal leading-[50px]">
						Đặt lại mật khẩu
					</div>
				</div>
			</div>

			<section className="container m-auto w-full py-[40px]">
				<div className="mx-auto my-0 w-full max-w-[551px]">
					{/* sign-up */}
					<div>
						<form
							id="reset-password-form"
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-3"
						>
							<div className="space-y-2">
								<div className="relative mb-[15px]">
									<input
										id="new_password"
										type="password"
										className="peer h-[50px] w-full rounded-[3px] border border-[#ebebeb] px-[18px] pb-[6px] pt-[25px] text-[14px] font-medium text-gray-600 transition-all duration-200 ease-in-out focus:outline-none"
										placeholder=" "
										{...register('new_password')}
									/>
									<label
										htmlFor="new_password"
										className={cn(
											'pointer-events-none absolute left-[18px] top-1/2 origin-left -translate-y-1/2 text-[14px] font-medium text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-focus:top-[14px] peer-focus:scale-[0.8]',
											touchedFields.new_password && 'top-[14px] scale-[0.8]',
										)}
									>
										Mật khẩu *
									</label>
								</div>
								{errors.new_password && (
									<p className="text-[0.8rem] font-medium text-destructive">
										{errors.new_password.message}
									</p>
								)}
							</div>

							<div className="mb-[30px] space-y-2">
								<div className="relative">
									<input
										id="confirm_password"
										type="password"
										className="peer h-[50px] w-full rounded-[3px] border border-[#ebebeb] px-[18px] pb-[6px] pt-[25px] text-[14px] font-medium text-gray-600 transition-all duration-200 ease-in-out focus:outline-none"
										placeholder=" "
										{...register('confirm_password')}
									/>
									<label
										htmlFor="confirm_password"
										className={cn(
											'pointer-events-none absolute left-[18px] top-1/2 origin-left -translate-y-1/2 text-[14px] font-medium text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-focus:top-[14px] peer-focus:scale-[0.8]',
											touchedFields.confirm_password &&
												'top-[14px] scale-[0.8]',
										)}
									>
										Xác nhận mật khẩu *
									</label>
								</div>
								{errors.confirm_password && (
									<p className="text-[0.8rem] font-medium text-destructive">
										{errors.confirm_password.message}
									</p>
								)}
							</div>

							{/* submit */}
							<div className="text-center">
								<Button className="mb-[15px] w-full rounded-[3px] px-[24px] py-[14px]">
									Đặt lại mật khẩu
								</Button>
								<Link
									to="/sign-in"
									className="relative inline-flex w-fit cursor-pointer items-center gap-1 border-b border-primary bg-transparent pb-[7px] pr-0 ps-0 pt-0 align-middle text-[14px] font-[600] text-primary no-underline transition-[all_0.3s_ease] hover:border-destructive hover:text-destructive"
								>
									Đã có tài khoản? Đăng nhập ngay
									<ArrowUpRight size={16} />
								</Link>
							</div>
						</form>
					</div>
				</div>
			</section>
		</React.Fragment>
	)
}

export default ResetPassword
