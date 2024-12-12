import { HeaderPlacholder } from '@/components/custom/header'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
	signUpDefaultValues,
	SignUpDto,
	signUpSchema,
} from '@/schemas/auth/user.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRegister } from '@refinedev/core'
import { omit } from 'lodash'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export type RegisterVariables = {
	email: string
	username: string
	password: string
}

const SignUp = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, touchedFields },
	} = useForm<SignUpDto>({
		defaultValues: signUpDefaultValues,
		resolver: zodResolver(signUpSchema),
		mode: 'onChange',
	})

	const { mutate: signUp } = useRegister<RegisterVariables>()

	const onSubmit: SubmitHandler<RegisterVariables> = (
		data: RegisterVariables,
	) => {
		signUp(omit(data, 'confirm_password'))
	}

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
						Đăng ký
					</div>
				</div>
			</div>

			<section className="container m-auto w-full py-[80px]">
				<div className="mx-auto my-0 w-full max-w-[551px]">
					{/* sign-up */}
					<div>
						<h5 className="mb-[15px] text-[28px] leading-[33.6px]">Đăng ký</h5>
						<p className="mb-[36px] text-sm text-[#545454]">
							Đăng ký để nhận được những ưu đãi và thông tin mới nhất từ chúng
							tôi
						</p>
						<form
							id="sign-in-form"
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-3"
						>
							<div className="space-y-2">
								<div className="relative mb-[15px]">
									<input
										id="email"
										type="text"
										className="peer h-[50px] w-full rounded-[3px] border border-[#ebebeb] px-[18px] pb-[6px] pt-[25px] text-[14px] font-medium text-gray-600 transition-all duration-200 ease-in-out focus:outline-none"
										placeholder=" "
										{...register('email')}
									/>
									<label
										htmlFor="email"
										className={cn(
											'pointer-events-none absolute left-[18px] top-1/2 origin-left -translate-y-1/2 text-[14px] font-medium text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-focus:top-[14px] peer-focus:scale-[0.8]',
											touchedFields.email && 'top-[14px] scale-[0.8]',
										)}
									>
										Email *
									</label>
								</div>
								{errors.email && (
									<p className="text-[0.8rem] font-medium text-destructive">
										{errors.email.message}
									</p>
								)}
							</div>
							<div className="space-y-2">
								<div className="relative mb-[15px]">
									<input
										id="username"
										type="text"
										className="peer h-[50px] w-full rounded-[3px] border border-[#ebebeb] px-[18px] pb-[6px] pt-[25px] text-[14px] font-medium text-gray-600 transition-all duration-200 ease-in-out focus:outline-none"
										placeholder=" "
										{...register('username')}
									/>
									<label
										htmlFor="username"
										className={cn(
											'pointer-events-none absolute left-[18px] top-1/2 origin-left -translate-y-1/2 text-[14px] font-medium text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-focus:top-[14px] peer-focus:scale-[0.8]',
											touchedFields.username && 'top-[14px] scale-[0.8]',
										)}
									>
										Tên đăng nhập *
									</label>
								</div>
								{errors.username && (
									<p className="text-[0.8rem] font-medium text-destructive">
										{errors.username.message}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<div className="relative mb-[15px]">
									<input
										id="password"
										type="password"
										className="peer h-[50px] w-full rounded-[3px] border border-[#ebebeb] px-[18px] pb-[6px] pt-[25px] text-[14px] font-medium text-gray-600 transition-all duration-200 ease-in-out focus:outline-none"
										placeholder=" "
										{...register('password')}
									/>
									<label
										htmlFor="password"
										className={cn(
											'pointer-events-none absolute left-[18px] top-1/2 origin-left -translate-y-1/2 text-[14px] font-medium text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-focus:top-[14px] peer-focus:scale-[0.8]',
											touchedFields.password && 'top-[14px] scale-[0.8]',
										)}
									>
										Mật khẩu *
									</label>
								</div>
								{errors.password && (
									<p className="text-[0.8rem] font-medium text-destructive">
										{errors.password.message}
									</p>
								)}
							</div>
							<div className="space-y-2">
								<div className="relative mb-[30px]">
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
									Đăng ký
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

export default SignUp
