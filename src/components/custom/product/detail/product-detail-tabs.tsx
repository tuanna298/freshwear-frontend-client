import { cn } from '@/lib/utils'
import { ProductClient } from '@/schemas/product.schema'
import { CircleSlash2, Dam, Flame, WashingMachine } from 'lucide-react'
import { useState } from 'react'

interface Props {
	product: ProductClient
}

const ProductDetailTabs = ({ product }: Props) => {
	const [activeTab, setActiveTab] = useState(0)

	const tabs = [
		{ label: 'Mô tả', content: DescriptionContent },
		{ label: 'Đánh giá', content: ReviewContent },
		{ label: 'Vận chuyển', content: ShippingContent },
		{ label: 'Chính sách', content: PolicyContent },
	]

	return (
		<div className="mb-[80px] border">
			{/* menu tab */}
			<ul className="mx-[38px] my-0 flex list-none gap-[50px] gap-y-[10px] overflow-x-auto border-b ps-0">
				{tabs.map((tab, index) => (
					<li
						key={index}
						onClick={() => setActiveTab(index)}
						className={cn(
							'relative mb-0 cursor-pointer list-none px-0 py-[15px] text-[18px] font-[600] leading-[30px]',
							activeTab === index &&
								'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary after:transition-[all_0.3s_ease] after:content-[""]',
						)}
					>
						{tab.label}
					</li>
				))}
			</ul>

			{/* content tab */}
			<div className="relative overflow-hidden">
				{tabs.map((tab, index) => (
					<div
						key={index}
						className={cn(
							'pointer-events-none invisible absolute left-0 right-0 top-0 z-[1] block transform p-[35px] opacity-0 duration-200 ease-in',
							activeTab === index &&
								'transfrom-none pointer-events-auto visible relative z-[2] opacity-100 delay-300 duration-300 ease-out',
						)}
					>
						{/* Render the content for the active tab */}
						<tab.content product={product} />
					</div>
				))}
			</div>
		</div>
	)
}

// Description Tab Content
const DescriptionContent = ({ product }: Props) => (
	<div>
		<p className="mb-[30px]">{product.description}</p>

		{/* Đặc điểm */}
		<div className="grid grid-cols-3 gap-[30px]">
			<div>
				<h3 className="mb-[22px] !text-[16px] !font-bold leading-[19px]">
					Đặc điểm sản phẩm
				</h3>
				<ul className="mb-[30px] mt-[15px] list-disc ps-0">
					<li className="relative mb-[15px] list-inside ps-[20px] text-sm leading-[25px] text-[#909090]">
						Đường nút phía trước
					</li>
					<li className="relative mb-[15px] list-inside ps-[20px] text-sm leading-[25px] text-[#909090]">
						Nẹp tay áo có thể điều chỉnh
					</li>
					<li className="relative mb-[15px] list-inside ps-[20px] text-sm leading-[25px] text-[#909090]">
						Thêu logo Babaton ở nẹp và đường viền
					</li>
				</ul>

				<h3 className="mb-[22px] !text-[16px] !font-bold leading-[19px]">
					Chăm sóc sản phẩm
				</h3>
				<ul className="mb-[30px] mt-[15px] list-disc ps-0">
					<li className="relative mb-[15px] list-inside ps-[20px] text-sm leading-[25px] text-[#909090]">
						Chất liệu: 100% LENZING™ ECOVERO™ Viscose
					</li>
					<li className="relative mb-[15px] list-inside ps-[20px] text-sm leading-[25px] text-[#909090]">
						Cách giặt: Giặt tay
					</li>
					<li className="relative mb-[15px] list-inside ps-[20px] text-sm leading-[25px] text-[#909090]">
						Xuất xứ: Nhập khẩu
					</li>
				</ul>
			</div>
			<div className="col-span-2">
				<h3 className="mb-[22px] !text-[16px] !font-bold leading-[19px]">
					Hướng dẫn giặt ủi
				</h3>

				<div className="mb-[15px] flex items-center gap-[10px]">
					<div className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-primary">
						<WashingMachine size={16} />
					</div>
					<span className="text-sm text-[#909090]">
						Giặt máy tối đa 30ºC. Vắt ngắn.
					</span>
				</div>
				<div className="mb-[15px] flex items-center gap-[10px]">
					<div className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-primary">
						<Flame size={16} />
					</div>
					<span className="text-sm text-[#909090]">Ủi tối đa 110ºC.</span>
				</div>
				<div className="mb-[15px] flex items-center gap-[10px]">
					<div className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-primary">
						<CircleSlash2 size={16} />
					</div>
					<span className="text-sm text-[#909090]">Không được tẩy.</span>
				</div>
				<div className="mb-[15px] flex items-center gap-[10px]">
					<div className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-primary">
						<CircleSlash2 size={16} />
					</div>
					<span className="text-sm text-[#909090]">Không được giặt khô.</span>
				</div>
				<div className="mb-[15px] flex items-center gap-[10px]">
					<div className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-primary">
						<Dam size={16} />
					</div>
					<span className="text-sm text-[#909090]">
						Sấy khô ở nhiệt độ trung bình.
					</span>
				</div>
			</div>
		</div>
	</div>
)

// Review Tab Content
const ReviewContent = ({ product }: Props) => (
	<div>
		<h3 className="mb-[22px] !text-[16px] !font-bold leading-[19px]">
			Đánh giá sản phẩm
		</h3>
		<p className="text-sm text-[#909090]">
			Hiện tại chưa có đánh giá nào cho sản phẩm này.
		</p>
	</div>
)

// Shipping Tab Content
const ShippingContent = ({ product }: Props) => (
	<div>
		<h3 className="mb-[22px] !text-[16px] !font-bold leading-[19px]">
			Thông tin vận chuyển
		</h3>
		<p className="text-sm text-[#909090]">
			Miễn phí vận chuyển cho đơn hàng trên 500.000đ. Thời gian giao hàng: 2-3
			ngày làm việc.
		</p>
	</div>
)

// Policy Tab Content
const PolicyContent = ({ product }: Props) => (
	<div>
		<h3 className="mb-[22px] !text-[16px] !font-bold leading-[19px]">
			Chính sách đổi trả
		</h3>
		<p className="text-sm text-[#909090]">
			Sản phẩm được đổi trả trong vòng 7 ngày kể từ ngày nhận hàng. Sản phẩm
			phải còn nguyên nhãn mác và chưa qua sử dụng.
		</p>
	</div>
)

export default ProductDetailTabs
