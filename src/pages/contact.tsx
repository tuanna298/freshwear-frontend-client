import GoogleMap from '@/components/custom/google-map'
import { HeaderPlacholder } from '@/components/custom/header'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ContactFormValues, contactSchema } from '@/schemas/contact.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import emailjs from 'emailjs-com'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { Fragment, useRef } from 'react'
import { useForm } from 'react-hook-form'

const Contact = () => {
	const form = useRef<HTMLFormElement>(null)

	const {
		register,
		handleSubmit,
		formState: { errors, touchedFields },
		reset,
	} = useForm<ContactFormValues>({
		resolver: zodResolver(contactSchema),
	})

	const onSubmit = (data: ContactFormValues) => {
		if (form.current) {
			emailjs
				.send('service_rpuyz47', 'template_2jf8vdh', data, 'sX16hzjGZqeuTJrUq')
				.then(
					(result) => {
						console.log(result.text)
						reset()
						alert('Message sent successfully!')
					},
					(error) => {
						console.log(error.text)
						alert('Failed to send message. Please try again later.')
					},
				)
		} else {
			alert('Form not found. Please try again later.')
		}
	}

	return (
		<Fragment>
			<HeaderPlacholder />
			<div
				className="pb-[65px] pr-0 ps-0 pt-[69px]"
				style={{
					backgroundImage: 'url(/assets/img/other/page-title-blog.png)',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
				}}
			>
				<div className="mx-auto my-0 w-full max-w-full pr-[40px] ps-[40px]">
					<div className="text-center text-[42px] font-[400] leading-[50px]">
						Liên hệ
					</div>
				</div>
			</div>

			<GoogleMap lat={47.444} lng={-122.176} />
			<section className="container m-auto grid w-full grid-cols-2 pb-[70px] pt-[45px]">
				<div className="ms-[112px]">
					<h5 className="mb-[20px] text-[28px] leading-[33.6px]">
						Ghé thăm cửa hàng của chúng tôi
					</h5>
					<div className="mb-[20px] text-sm">
						<p className="mb-[15px] font-bold">Địa chỉ</p>
						<p>1234 Tên Đường, Tên Thành Phố, Việt Nam</p>
					</div>
					<div className="mb-[20px] text-sm">
						<p className="mb-[15px] font-bold">Điện thoại</p>
						<p>123-456-7890</p>
					</div>
					<div className="mb-[20px] text-sm">
						<p className="mb-[15px] font-bold">Email</p>
						<p>feshwear.fashion@gmail.com</p>
					</div>
					<div className="mb-[20px] text-sm">
						<p className="mb-[15px] font-bold">Giờ làm việc</p>
						<p>Thứ Hai - Thứ Sáu: 8:00 Sáng - 7:00 Tối</p>
						<p>Thứ Bảy - Chủ Nhật: 9:00 Sáng - 5:00 Chiều</p>
					</div>
					<div className="flex gap-5">
						<Facebook size={16} />
						<Twitter size={16} />
						<Instagram size={16} />
						<Youtube size={16} />
					</div>
				</div>
				<div className="mr-[112px]">
					<h5 className="mb-[20px] text-[28px] leading-[33.6px]">
						Liên hệ với chúng tôi
					</h5>
					<p className="mb-[24px] text-sm">
						Nếu bạn đang có những sản phẩm tuyệt vời hoặc muốn hợp tác với chúng
						tôi, hãy gửi tin nhắn ngay.
					</p>
					<div>
						<form ref={form} onSubmit={handleSubmit(onSubmit)}>
							<div className="mb-[15px] flex gap-[15px]">
								<fieldset className="relative w-full">
									<input
										type="text"
										id="name"
										{...register('name')}
										className="peer h-[50px] w-full rounded-[3px] border border-[#ebebeb] px-[18px] pb-[6px] pt-[25px] text-[14px] font-medium text-gray-600 transition-all duration-200 ease-in-out focus:outline-none"
										placeholder=" "
									/>
									<label
										htmlFor="name"
										className={cn(
											'pointer-events-none absolute left-[18px] top-1/2 origin-left -translate-y-1/2 text-[14px] font-medium text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-focus:top-[14px] peer-focus:scale-[0.8]',
											touchedFields.name && 'top-[14px] scale-[0.8]',
										)}
									>
										Tên *
									</label>
									{errors.name && (
										<p className="mt-1 text-xs text-red-500">
											{errors.name.message}
										</p>
									)}
								</fieldset>

								<fieldset className="relative w-full">
									<input
										type="text"
										id="email"
										{...register('email')}
										className="peer h-[50px] w-full rounded-[3px] border border-[#ebebeb] px-[18px] pb-[6px] pt-[25px] text-[14px] font-medium text-gray-600 transition-all duration-200 ease-in-out focus:outline-none"
										placeholder=" "
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
									{errors.email && (
										<p className="mt-1 text-xs text-red-500">
											{errors.email.message}
										</p>
									)}
								</fieldset>
							</div>
							<div className="mb-[15px]">
								<fieldset className="relative w-full">
									<textarea
										id="message"
										{...register('message')}
										className="peer h-[112px] w-full resize-none rounded-[3px] border border-[#ebebeb] px-[18px] pb-[6px] pt-[25px] text-[14px] font-medium text-gray-600 transition-all duration-200 ease-in-out focus:outline-none"
										placeholder=" "
									/>
									<label
										htmlFor="message"
										className={cn(
											'pointer-events-none absolute left-[18px] top-1/2 origin-left -translate-y-1/2 text-[14px] font-medium text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-focus:top-[14px] peer-focus:scale-[0.8]',
											touchedFields.message && 'top-[14px] scale-[0.8]',
										)}
									>
										Tin nhắn *
									</label>
									{errors.message && (
										<p className="mt-1 text-xs text-red-500">
											{errors.message.message}
										</p>
									)}
								</fieldset>
							</div>
							<Button className="h-[50px] w-full rounded-[3px]">
								Gửi Tin Nhắn
							</Button>
						</form>
					</div>
				</div>
			</section>
		</Fragment>
	)
}

export default Contact
