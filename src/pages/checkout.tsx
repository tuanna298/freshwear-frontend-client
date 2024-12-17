import { HeaderPlacholder } from '@/components/custom/header'
import { NumberField } from '@/components/custom/number-field'
import RequiredDot from '@/components/custom/required-dot'
import { Button } from '@/components/ui/button'
import {
	Order,
	orderDefaultValues,
	orderSchema,
	PaymentMethod,
} from '@/schemas/order.schema'
import ProductHelper from '@/shared/helpers/product.helper'
import { useAuthStore } from '@/shared/hooks/use-auth-store'
import { useCartStore } from '@/shared/hooks/use-cart-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreate } from '@refinedev/core'
import { Fragment } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
	const navigate = useNavigate()
	const { items, deleteAll } = useCartStore()
	const { profile } = useAuthStore()
	const totalPrice = ProductHelper.getTotalCartPrice(items)

	const { mutate } = useCreate<Order>({
		resource: 'order',
		successNotification() {
			return {
				message: 'Đặt hàng thành công',
				type: 'success',
			}
		},
	})
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Order>({
		defaultValues: orderDefaultValues,
		resolver: zodResolver(orderSchema),
	})
	const onSubmit: SubmitHandler<Order> = (data: Order) => {
		mutate(
			{
				values: {
					...data,
					user_id: profile?.id,
					cartItems: (items || []).map((item: any) => ({
						product_detail_id: item?.size?.product_detail_id,
						quantity: item?.quantity,
						price: item?.size?.price,
						total: item?.size?.price * item?.quantity,
					})),
				},
			},
			{
				onSuccess(data, variables) {
					if (
						(variables?.values as Order)?.method === PaymentMethod.TRANSFER &&
						typeof data.data === 'string'
					) {
						window.location.href = data.data
						return
					}

					navigate('/order-success', {
						preventScrollReset: false,
					})
					deleteAll()
				},
			},
		)
	}

	console.log('errors', errors)

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
						Thanh toán
					</div>
				</div>
			</div>
			<form id="form-checkout" onSubmit={handleSubmit(onSubmit)}>
				<section className="container m-auto w-full pb-[70px] pt-[80px]">
					<div className="grid grid-cols-3 gap-[3rem]">
						<div className="col-span-2">
							<h5 className="mb-[20px] text-[28px] font-[500px] leading-[33.6px]">
								Thông tin đơn hàng
							</h5>
							<div>
								<fieldset className="mb-[30px] block">
									<label
										htmlFor="receiver_name"
										className="relative text-sm font-bold"
									>
										Họ và tên
										<RequiredDot />
									</label>
									<input
										type="text"
										required
										id="receiver_name"
										placeholder="Nguyễn Văn A"
										className="m-0 mt-[10px] w-full rounded-[3px] border bg-white px-[18px] py-[12px] text-[14px] font-[400] leading-[24px] shadow-none outline-0 transition-[all_0.3s_ease] "
										{...register('receiver_name', {
											required: 'Vui lòng nhập họ và tên',
										})}
									/>
								</fieldset>
								<fieldset className="mb-[30px] block">
									<label
										htmlFor="address"
										className="relative text-sm font-bold"
									>
										Địa chỉ
										<RequiredDot />
									</label>
									<input
										type="text"
										required
										id="address"
										placeholder="---"
										className="m-0 mt-[10px] w-full rounded-[3px] border bg-white px-[18px] py-[12px] text-[14px] font-[400] leading-[24px] shadow-none outline-0 transition-[all_0.3s_ease] "
										{...register('address', {
											required: 'Vui lòng nhập địa chỉ',
										})}
									/>
								</fieldset>
								<fieldset className="mb-[30px] block">
									<label
										htmlFor="phone_number"
										className="relative text-sm font-bold"
									>
										Số điện thoại
										<RequiredDot />
									</label>
									<input
										type="text"
										required
										id="phone_number"
										className="m-0 mt-[10px] w-full rounded-[3px] border bg-white px-[18px] py-[12px] text-[14px] font-[400] leading-[24px] shadow-none outline-0 transition-[all_0.3s_ease] "
										{...register('phone_number', {
											required: 'Vui lòng nhập số điện thoại',
										})}
									/>
								</fieldset>
								<fieldset className="mb-[30px] block">
									<label htmlFor="email" className="relative text-sm font-bold">
										Email
										<RequiredDot />
									</label>
									<input
										type="text"
										required
										id="email"
										className="m-0 mt-[10px] w-full rounded-[3px] border bg-white px-[18px] py-[12px] text-[14px] font-[400] leading-[24px] shadow-none outline-0 transition-[all_0.3s_ease] "
										{...register('email', {
											required: 'Vui lòng nhập email',
										})}
									/>
								</fieldset>
								<fieldset className="block">
									<label htmlFor="note" className="relative text-sm font-bold">
										Ghi chú (nếu có)
									</label>
									<textarea
										id="note"
										className="mt-[10px] h-[112px] w-full resize-none rounded-[3px] border bg-white px-[18px] py-[12px] text-[14px] font-[400] leading-[24px] shadow-none outline-0 transition-[all_0.3s_ease] "
										{...register('note')}
									/>
								</fieldset>
							</div>
						</div>
						<div className="sticky top-[100px] transition-[all_0.3s_ease]">
							<h5 className="mb-[20px] text-[28px] font-bold leading-[33.6px]">
								Đơn hàng của bạn
							</h5>
							<div
								id="checkout-cart-widget"
								className="grid gap-[20px] rounded-[2.5px] bg-[#fbfbfc] p-[30px]"
							>
								<ul className="mb-0 list-none ps-0">
									{items.map((item) => (
										<li className="mb-[15px] flex items-center justify-between gap-[15px]">
											<figure className="relative h-[64px] w-[64px] rounded-[3px] border">
												<img
													src={
														item.image || '/assets/img/other/placeholder.jpg'
													}
													alt="img-product-index"
													className="h-full w-full max-w-full object-contain align-middle text-transparent"
												/>
												<span className="absolute -right-[8px] -top-[8px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#666] text-[12px] text-white">
													{item.quantity}
												</span>
											</figure>
											<div className="flex flex-grow items-center justify-between">
												<div>
													<p>{item.name}</p>
													<span className="text-[12px] leading-[18px] text-primary/50">
														{item.color.name}/ {item.size.name}
													</span>
												</div>
												<NumberField value={item.size.price} />
											</div>
										</li>
									))}
								</ul>

								<div className="flex justify-between border-b pb-[20px]">
									<h6 className="text-[20px] font-bold leading-[30px]">
										Thành tiền
									</h6>
									<NumberField
										className="text-[20px] font-bold leading-[30px]"
										value={totalPrice}
									/>
								</div>

								<div className="mb-[20px] flex items-center gap-[8px]">
									<input
										type="radio"
										required
										value={PaymentMethod.TRANSFER}
										id="transfer"
										{...register('method', {
											required: 'Vui lòng chọn phương thức thanh toán',
										})}
										className="before:transform-[scale(0)] checked:before:transform-[scale(1)] relative inline-flex h-[20px] w-[20px] min-w-[16px] cursor-pointer appearance-none items-center justify-center rounded-full border bg-transparent outline-0 before:absolute before:text-[8px] before:text-white before:opacity-0 before:transition-[all_0.3s_ease] before:content-['✔'] checked:bg-destructive checked:text-destructive checked:before:opacity-100"
									/>
									<label htmlFor="transfer" className="mt-[2px] text-sm">
										Thanh toán bằng hình thức chuyển khoản
									</label>
								</div>
								<div className="mb-[20px] flex items-center gap-[8px]">
									<input
										type="radio"
										required
										id="cod"
										value={PaymentMethod.CASH}
										{...register('method', {
											required: 'Vui lòng chọn phương thức thanh toán',
										})}
										className="before:transform-[scale(0)] checked:before:transform-[scale(1)] relative inline-flex h-[20px] w-[20px] min-w-[16px] cursor-pointer appearance-none items-center justify-center rounded-full border bg-transparent outline-0 before:absolute before:text-[8px] before:text-white before:opacity-0 before:transition-[all_0.3s_ease] before:content-['✔'] checked:bg-destructive checked:text-destructive checked:before:opacity-100"
									/>
									<label htmlFor="cod" className="mt-[2px] text-sm">
										Thanh toán khi nhận hàng
									</label>
								</div>

								{/* place order button */}
								<Button
									type="submit"
									className="w-full rounded-[3px] px-[24px] py-[14px]"
								>
									Đặt hàng
								</Button>
							</div>
						</div>
					</div>
				</section>
			</form>
		</Fragment>
	)
}

export default Checkout
