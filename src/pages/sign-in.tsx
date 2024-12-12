import { HeaderPlacholder } from '@/components/custom/header'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
	forgotPasswordDefaultValues,
	ForgotPasswordDto,
	forgotPasswordSchema,
	signInDefaultValues,
	SignInDto,
	signInSchema,
} from '@/schemas/auth/user.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForgotPassword, useLogin } from '@refinedev/core'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export type LoginVariables = {
	username: string
	password: string
}

// Animation variants for form transitions
const formVariants = {
	initial: {
		opacity: 0,
		x: 50,
		transition: { duration: 0.3 },
	},
	animate: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.3 },
	},
	exit: {
		opacity: 0,
		x: -50,
		transition: { duration: 0.3 },
	},
}

const SignIn = () => {
	const {
		register: loginRegister,
		handleSubmit: loginHandleSubmit,
		formState: { errors: loginErrors, touchedFields: loginTouchedFields },
	} = useForm<SignInDto>({
		defaultValues: signInDefaultValues,
		resolver: zodResolver(signInSchema),
		mode: 'onChange',
	})

	const {
		register: forgotPasswordRegister,
		handleSubmit: forgotPasswordHandleSubmit,
		formState: {
			errors: forgotPasswordErrors,
			touchedFields: forgotPasswordTouchedFields,
		},
	} = useForm<ForgotPasswordDto>({
		defaultValues: forgotPasswordDefaultValues,
		resolver: zodResolver(forgotPasswordSchema),
		mode: 'onChange',
	})

	const { mutate: login } = useLogin<LoginVariables>()
	const { mutate: forgotPassword } = useForgotPassword<ForgotPasswordDto>()

	const [activeForm, setActiveForm] = useState('login')
	const formRef = useRef<HTMLDivElement>(null)

	const toggleForm = (formType: string) => {
		setActiveForm(formType)
	}

	const onLoginSubmit: SubmitHandler<LoginVariables> = (
		data: LoginVariables,
	) => {
		login(data)
	}

	const onForgotPasswordSubmit: SubmitHandler<ForgotPasswordDto> = (
		data: ForgotPasswordDto,
	) => {
		forgotPassword(data)
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
						{activeForm === 'login' ? 'Đăng nhập' : 'Đặt lại mật khẩu'}
					</div>
				</div>
			</div>

			<section className="container m-auto min-h-[500px] w-full py-[80px]">
				<div className="grid grid-cols-2 gap-[30px]">
					{/* form */}
					<div className="relative mx-auto my-0 w-full max-w-[551px]">
						<AnimatePresence mode="wait">
							{/* Recover Password Form */}
							{activeForm === 'recover' && (
								<motion.div
									key="recover"
									ref={formRef}
									variants={formVariants}
									initial="initial"
									animate="animate"
									exit="exit"
								>
									<h5 className="mb-[15px] text-[28px] leading-[33.6px]">
										Đặt lại mật khẩu
									</h5>
									<p className="mb-[36px] text-sm">
										Chúng tôi sẽ gửi cho bạn một email với hướng dẫn cách đặt
										lại mật khẩu của bạn.
									</p>

									<form
										id="forgot-password-form"
										onSubmit={forgotPasswordHandleSubmit(
											onForgotPasswordSubmit,
										)}
										className="space-y-3"
									>
										<div className="space-y-2">
											<div className="relative mb-[15px]">
												<input
													id="email"
													type="text"
													className="peer h-[50px] w-full rounded-[3px] border border-[#ebebeb] px-[18px] pb-[6px] pt-[25px] text-[14px] font-medium text-gray-600 transition-all duration-200 ease-in-out focus:outline-none"
													placeholder=" "
													{...forgotPasswordRegister('email')}
												/>
												<label
													htmlFor="email"
													className={cn(
														'pointer-events-none absolute left-[18px] top-1/2 origin-left -translate-y-1/2 text-[14px] font-medium text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-focus:top-[14px] peer-focus:scale-[0.8]',
														forgotPasswordTouchedFields.email &&
															'top-[14px] scale-[0.8]',
													)}
												>
													Email *
												</label>
											</div>

											{forgotPasswordErrors.email && (
												<p className="text-[0.8rem] font-medium text-destructive">
													{forgotPasswordErrors.email.message}
												</p>
											)}
										</div>

										{/* navigate */}
										<div className="my-[20px]">
											<button
												type="button"
												onClick={() => toggleForm('login')}
												className="relative inline-flex w-fit cursor-pointer items-center gap-1 border-b border-primary bg-transparent pb-[7px] pr-0 ps-0 pt-0 align-middle text-[14px] font-[600] text-primary no-underline transition-[all_0.3s_ease] hover:border-destructive hover:text-destructive"
											>
												Quay lại đăng nhập
											</button>
										</div>

										{/* submit */}
										<div>
											<Button className="w-full rounded-[3px] px-[24px] py-[14px]">
												Đặt lại mật khẩu
											</Button>
										</div>
									</form>
								</motion.div>
							)}

							{/* Login Form */}
							{activeForm === 'login' && (
								<motion.div
									key="login"
									ref={formRef}
									variants={formVariants}
									initial="initial"
									animate="animate"
									exit="exit"
								>
									<h5 className="mb-[36px] text-[28px] leading-[33.6px]">
										Đăng nhập
									</h5>

									<form
										id="sign-in-form"
										onSubmit={loginHandleSubmit(onLoginSubmit)}
										className="space-y-3"
									>
										<div className="space-y-2">
											<div className="relative mb-[15px]">
												<input
													id="username"
													type="text"
													className="peer h-[50px] w-full rounded-[3px] border border-[#ebebeb] px-[18px] pb-[6px] pt-[25px] text-[14px] font-medium text-gray-600 transition-all duration-200 ease-in-out focus:outline-none"
													placeholder=" "
													{...loginRegister('username')}
												/>
												<label
													htmlFor="username"
													className={cn(
														'pointer-events-none absolute left-[18px] top-1/2 origin-left -translate-y-1/2 text-[14px] font-medium text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-focus:top-[14px] peer-focus:scale-[0.8]',
														loginTouchedFields.username &&
															'top-[14px] scale-[0.8]',
													)}
												>
													Tên đăng nhập *
												</label>
											</div>
											{loginErrors.username && (
												<p className="text-[0.8rem] font-medium text-destructive">
													{loginErrors.username.message}
												</p>
											)}
										</div>

										<div className="space-y-2">
											<div className="relative mb-[30px]">
												<input
													id="password"
													type="password"
													className="peer h-[50px] w-full rounded-[3px] border border-[#ebebeb] px-[18px] pb-[6px] pt-[25px] text-[14px] font-medium text-gray-600 transition-all duration-200 ease-in-out focus:outline-none"
													placeholder=" "
													{...loginRegister('password')}
												/>
												<label
													htmlFor="password"
													className={cn(
														'pointer-events-none absolute left-[18px] top-1/2 origin-left -translate-y-1/2 text-[14px] font-medium text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-focus:top-[14px] peer-focus:scale-[0.8]',
														loginTouchedFields.password &&
															'top-[14px] scale-[0.8]',
													)}
												>
													Mật khẩu *
												</label>
											</div>
											{loginErrors.password && (
												<p className="text-[0.8rem] font-medium text-destructive">
													{loginErrors.password.message}
												</p>
											)}
										</div>

										{/* navigate */}
										<div className="my-[20px]">
											<button
												type="button"
												onClick={() => toggleForm('recover')}
												className="relative inline-flex w-fit cursor-pointer items-center gap-1 border-b border-primary bg-transparent pb-[7px] pr-0 ps-0 pt-0 align-middle text-[14px] font-[600] text-primary no-underline transition-[all_0.3s_ease] hover:border-destructive hover:text-destructive"
											>
												Quên mật khẩu?
											</button>
										</div>

										{/* submit */}
										<Button
											type="submit"
											className="w-full rounded-[3px] px-[24px] py-[14px]"
										>
											Đăng nhập
										</Button>
									</form>
								</motion.div>
							)}
						</AnimatePresence>
					</div>

					{/* content */}
					<div className="mx-auto my-0 w-full max-w-[551px]">
						<h5 className="mb-[36px] text-[28px] leading-[33.6px]">
							Chưa có tài khoản?
						</h5>
						<p className="mb-[20px] text-sm">
							Đăng ký ngay để nhận quyền truy cập sớm vào các đợt giảm giá đặc
							biệt, cùng những xu hướng, sản phẩm mới và ưu đãi được cá nhân
							hóa. Nếu bạn muốn ngừng nhận thông tin, hãy nhấp vào "Hủy đăng ký"
							trong email của chúng tôi.
						</p>

						<Link
							to="/sign-up"
							className="relative inline-flex w-fit cursor-pointer items-center gap-1 border-b border-primary bg-transparent pb-[7px] pr-0 ps-0 pt-0 align-middle text-[14px] font-[600] text-primary no-underline transition-[all_0.3s_ease] hover:border-destructive hover:text-destructive"
						>
							Đăng ký ngay
							<ArrowUpRight size={16} />
						</Link>
					</div>
				</div>
			</section>
		</React.Fragment>
	)
}

export default SignIn
