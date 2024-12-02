import { HeaderPlacholder } from '@/components/custom/header'
import { NumberField } from '@/components/custom/number-field'
import RequiredDot from '@/components/custom/required-dot'
import { Button } from '@/components/ui/button'
import { Fragment } from 'react'

const Checkout = () => {
	return (
		<Fragment>
			<HeaderPlacholder />
			<div
				className="pb-[65px] pr-0 ps-0 pt-[69px]"
				style={{
					backgroundImage: 'url(assets/img/other/page-title-blog.png)',
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

			<section className="m-auto w-full max-w-[1540px] px-[50px] pb-[70px] pt-[80px]">
				<div className="grid grid-cols-3 gap-[3rem]">
					<div className="col-span-2">
						<h5 className="mb-[20px] text-[28px] font-[500px] leading-[33.6px]">
							Thông tin đơn hàng
						</h5>
						<form id="form-checkout">
							<fieldset className="mb-[30px] block">
								<label
									htmlFor="full_name"
									className="relative text-sm font-bold"
								>
									Họ và tên
									<RequiredDot />
								</label>
								<input
									type="text"
									required
									id="full_name"
									placeholder="Nguyễn Văn A"
									className="m-0 mt-[10px] w-full rounded-[3px] border bg-white px-[18px] py-[12px] text-[14px] font-[400] leading-[24px] shadow-none outline-0 transition-[all_0.3s_ease] "
								/>
							</fieldset>
							<fieldset className="mb-[30px] block">
								<label htmlFor="address" className="relative text-sm font-bold">
									Địa chỉ
									<RequiredDot />
								</label>
								<input
									type="text"
									required
									id="address"
									placeholder="---"
									className="m-0 mt-[10px] w-full rounded-[3px] border bg-white px-[18px] py-[12px] text-[14px] font-[400] leading-[24px] shadow-none outline-0 transition-[all_0.3s_ease] "
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
								/>
							</fieldset>
							<fieldset className="block">
								<label htmlFor="note" className="relative text-sm font-bold">
									Ghi chú (nếu có)
								</label>
								<textarea
									required
									id="note"
									className="mt-[10px] h-[112px] w-full resize-none rounded-[3px] border bg-white px-[18px] py-[12px] text-[14px] font-[400] leading-[24px] shadow-none outline-0 transition-[all_0.3s_ease] "
								/>
							</fieldset>
						</form>
					</div>
					<div className="sticky top-[100px] transition-[all_0.3s_ease]">
						<h5 className="mb-[20px] text-[28px] font-bold leading-[33.6px]">
							Đơn hàng của bạn
						</h5>
						<form
							id="checkout-cart-widget"
							className="grid gap-[20px] rounded-[2.5px] bg-[#fbfbfc] p-[30px]"
						>
							<ul className="mb-0 list-none ps-0">
								{Array.from({ length: 3 }).map((_) => (
									<li className="mb-[15px] flex items-center justify-between gap-[15px]">
										<figure className="relative h-[64px] w-[64px] rounded-[3px] border">
											<img
												src="https://picsum.photos/700/1000"
												alt="img-product-index"
												className="h-full w-full max-w-full object-contain align-middle text-transparent"
											/>
											<span className="absolute -right-[8px] -top-[8px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#666] text-[12px] text-white">
												1
											</span>
										</figure>
										<div className="flex flex-grow items-center justify-between">
											<div>
												<p>Product name</p>
												<span className="text-[12px] leading-[18px] text-primary/50">
													Color / Size
												</span>
											</div>
											<NumberField value={0} />
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
									value={0}
								/>
							</div>

							<div className="mb-[20px] flex items-center gap-[8px]">
								<input
									type="radio"
									required
									id="transfer"
									checked
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
									checked={false}
									className="before:transform-[scale(0)] checked:before:transform-[scale(1)] relative inline-flex h-[20px] w-[20px] min-w-[16px] cursor-pointer appearance-none items-center justify-center rounded-full border bg-transparent outline-0 before:absolute before:text-[8px] before:text-white before:opacity-0 before:transition-[all_0.3s_ease] before:content-['✔'] checked:bg-destructive checked:text-destructive checked:before:opacity-100"
								/>
								<label htmlFor="cod" className="mt-[2px] text-sm">
									Thanh toán khi nhận hàng
								</label>
							</div>

							{/* place order button */}
							<Button className="w-full rounded-[3px] px-[24px] py-[14px]">
								Đặt hàng
							</Button>
						</form>
					</div>
				</div>
			</section>
		</Fragment>
	)
}

export default Checkout
