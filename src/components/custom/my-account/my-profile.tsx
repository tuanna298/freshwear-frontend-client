import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
	changePasswordDefaultValues,
	ChangePasswordDto,
	changePasswordSchema,
	updateProfileDefaultValues,
	UpdateProfileDto,
	updateProfileSchema,
} from '@/schemas/auth/user.schema'
import authApi from '@/shared/apis/auth.api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'

const MyProfile = () => {
	const {
		register: updateProfileRegister,
		handleSubmit: updateProfileHandleSubmit,
		formState: {
			errors: updateProfileErrors,
			touchedFields: updateProfileTouchedFields,
		},
	} = useForm<UpdateProfileDto>({
		defaultValues: updateProfileDefaultValues,
		resolver: zodResolver(updateProfileSchema),
		mode: 'onChange',
	})

	const {
		register: changePasswordProfileRegister,
		handleSubmit: changePasswordProfileHandleSubmit,
		formState: {
			errors: changePasswordProfileErrors,
			touchedFields: changePasswordProfileTouchedFields,
		},
	} = useForm<ChangePasswordDto>({
		defaultValues: changePasswordDefaultValues,
		resolver: zodResolver(changePasswordSchema),
		mode: 'onChange',
	})

	const { mutate: updateProfile } = useMutation({
		mutationKey: ['updateProfile'],
		mutationFn: (dto: UpdateProfileDto) => authApi.updateProfile(dto),
	})

	const { mutate: changePassword } = useMutation({
		mutationKey: ['changePassword'],
		mutationFn: (dto: ChangePasswordDto) => authApi.changePassword(dto),
	})

	const onUpdateProfileSubmit: SubmitHandler<UpdateProfileDto> = (
		data: UpdateProfileDto,
	) => {
		updateProfile(data)
	}

	const onChangePasswordSubmit: SubmitHandler<ChangePasswordDto> = (
		data: ChangePasswordDto,
	) => {
		changePassword(data)
	}

	return (
		<div className="space-y-6">
			<h6 className="text-[20px] leading-[30px]">Thông tin cá nhân</h6>

			<form
				id="update-profile-form"
				className="space-y-3"
				onSubmit={updateProfileHandleSubmit(onUpdateProfileSubmit)}
			>
				<div className="space-y-2">
					<div className="relative mb-[15px]">
						<input
							id="full_name"
							type="text"
							className="peer h-[50px] w-full rounded-[3px] border border-[#ebebeb] px-[18px] pb-[6px] pt-[25px] text-[14px] font-medium text-gray-600 transition-all duration-200 ease-in-out focus:outline-none"
							placeholder=" "
							{...updateProfileRegister('full_name')}
						/>
						<label
							htmlFor="full_name"
							className={cn(
								'pointer-events-none absolute left-[18px] top-1/2 origin-left -translate-y-1/2 text-[14px] font-medium text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-focus:top-[14px] peer-focus:scale-[0.8]',
								updateProfileTouchedFields.full_name &&
									'top-[14px] scale-[0.8]',
							)}
						>
							Họ và tên
						</label>
					</div>

					{updateProfileErrors.full_name && (
						<p className="text-[0.8rem] font-medium text-destructive">
							{updateProfileErrors.full_name.message}
						</p>
					)}
				</div>

				<div className="space-y-2">
					<div className="relative mb-[15px]">
						<input
							id="phone_number"
							type="text"
							className="peer h-[50px] w-full rounded-[3px] border border-[#ebebeb] px-[18px] pb-[6px] pt-[25px] text-[14px] font-medium text-gray-600 transition-all duration-200 ease-in-out focus:outline-none"
							placeholder=" "
							{...updateProfileRegister('phone_number')}
						/>
						<label
							htmlFor="phone_number"
							className={cn(
								'pointer-events-none absolute left-[18px] top-1/2 origin-left -translate-y-1/2 text-[14px] font-medium text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-focus:top-[14px] peer-focus:scale-[0.8]',
								updateProfileTouchedFields.phone_number &&
									'top-[14px] scale-[0.8]',
							)}
						>
							Số điện thoại
						</label>
					</div>

					{updateProfileErrors.phone_number && (
						<p className="text-[0.8rem] font-medium text-destructive">
							{updateProfileErrors.phone_number.message}
						</p>
					)}
				</div>

				<div className="space-y-2">
					<div className="relative mb-[15px]">
						<input
							id="address"
							type="text"
							className="peer h-[50px] w-full rounded-[3px] border border-[#ebebeb] px-[18px] pb-[6px] pt-[25px] text-[14px] font-medium text-gray-600 transition-all duration-200 ease-in-out focus:outline-none"
							placeholder=" "
							{...updateProfileRegister('address')}
						/>
						<label
							htmlFor="address"
							className={cn(
								'pointer-events-none absolute left-[18px] top-1/2 origin-left -translate-y-1/2 text-[14px] font-medium text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-focus:top-[14px] peer-focus:scale-[0.8]',
								updateProfileTouchedFields.address && 'top-[14px] scale-[0.8]',
							)}
						>
							Địa chỉ
						</label>
					</div>

					{updateProfileErrors.address && (
						<p className="text-[0.8rem] font-medium text-destructive">
							{updateProfileErrors.address.message}
						</p>
					)}
				</div>

				{/* submit */}
				<div>
					<Button className="w-full rounded-[3px] px-[24px] py-[14px]">
						Cập nhật thông tin
					</Button>
				</div>
			</form>

			<h6 className="text-[20px] leading-[30px]">Đổi mật khẩu</h6>

			<form
				id="change-password-form"
				className="space-y-3"
				onSubmit={changePasswordProfileHandleSubmit(onChangePasswordSubmit)}
			>
				<div className="space-y-2">
					<div className="relative mb-[15px]">
						<input
							id="current_password"
							type="text"
							className="peer h-[50px] w-full rounded-[3px] border border-[#ebebeb] px-[18px] pb-[6px] pt-[25px] text-[14px] font-medium text-gray-600 transition-all duration-200 ease-in-out focus:outline-none"
							placeholder=" "
							{...changePasswordProfileRegister('current_password')}
						/>
						<label
							htmlFor="current_password"
							className={cn(
								'pointer-events-none absolute left-[18px] top-1/2 origin-left -translate-y-1/2 text-[14px] font-medium text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-focus:top-[14px] peer-focus:scale-[0.8]',
								changePasswordProfileTouchedFields.current_password &&
									'top-[14px] scale-[0.8]',
							)}
						>
							Mật khẩu hiện tại
						</label>
					</div>

					{changePasswordProfileErrors.current_password && (
						<p className="text-[0.8rem] font-medium text-destructive">
							{changePasswordProfileErrors.current_password.message}
						</p>
					)}
				</div>

				<div className="space-y-2">
					<div className="relative mb-[15px]">
						<input
							id="new_password"
							type="text"
							className="peer h-[50px] w-full rounded-[3px] border border-[#ebebeb] px-[18px] pb-[6px] pt-[25px] text-[14px] font-medium text-gray-600 transition-all duration-200 ease-in-out focus:outline-none"
							placeholder=" "
							{...changePasswordProfileRegister('new_password')}
						/>
						<label
							htmlFor="new_password"
							className={cn(
								'pointer-events-none absolute left-[18px] top-1/2 origin-left -translate-y-1/2 text-[14px] font-medium text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-focus:top-[14px] peer-focus:scale-[0.8]',
								changePasswordProfileTouchedFields.new_password &&
									'top-[14px] scale-[0.8]',
							)}
						>
							Mật khẩu mới
						</label>
					</div>

					{changePasswordProfileErrors.new_password && (
						<p className="text-[0.8rem] font-medium text-destructive">
							{changePasswordProfileErrors.new_password.message}
						</p>
					)}
				</div>

				<div className="space-y-2">
					<div className="relative mb-[15px]">
						<input
							id="confirm_password"
							type="text"
							className="peer h-[50px] w-full rounded-[3px] border border-[#ebebeb] px-[18px] pb-[6px] pt-[25px] text-[14px] font-medium text-gray-600 transition-all duration-200 ease-in-out focus:outline-none"
							placeholder=" "
							{...changePasswordProfileRegister('confirm_password')}
						/>
						<label
							htmlFor="confirm_password"
							className={cn(
								'pointer-events-none absolute left-[18px] top-1/2 origin-left -translate-y-1/2 text-[14px] font-medium text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-focus:top-[14px] peer-focus:scale-[0.8]',
								changePasswordProfileTouchedFields.confirm_password &&
									'top-[14px] scale-[0.8]',
							)}
						>
							Xác nhận mật khẩu mới
						</label>
					</div>
					{changePasswordProfileErrors.confirm_password && (
						<p className="text-[0.8rem] font-medium text-destructive">
							{changePasswordProfileErrors.confirm_password.message}
						</p>
					)}
				</div>

				{/* submit */}
				<div>
					<Button className="w-full rounded-[3px] px-[24px] py-[14px]">
						Thay đổi mật khẩu
					</Button>
				</div>
			</form>
		</div>
	)
}

export default MyProfile
