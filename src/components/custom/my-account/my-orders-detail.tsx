import { Button } from '@/components/ui/button'
import { Order, OrderStatus, PaymentMethod } from '@/schemas/order.schema'
import { HttpError, useOne } from '@refinedev/core'
import dayjs from 'dayjs'
import { ArrowUpRight } from 'lucide-react'
import { useParams } from 'react-router-dom'
import OrderStatusBadge from '../order/order-status-badge'
import OrdersDetailTabs from './sub/orders-detail-tabs'

const MyOrdersDetail = () => {
	const { id } = useParams<{ id: string }>()
	const { data: dataOne } = useOne<Order, HttpError>({
		resource: 'order',
		id,
		queryOptions: {
			enabled: !!id,
		},
	})

	const order = dataOne?.data

	return (
		<div className="border p-[30px]">
			{/* head */}
			<div className="mb-[30px] flex items-center justify-between border-b pb-[20px]">
				<div className="flex items-center gap-[12px]">
					<figure className="block h-[80px] w-[80px] rounded-[3px] border">
						<img
							src={
								order?.details?.[0]?.product_detail?.product?.thumbnail ||
								'/assets/img/other/placeholder.jpg'
							}
							alt="product"
							className="aspect-rectangle-vertical h-full w-full max-w-full object-cover align-middle"
						/>
					</figure>
					<div>
						<OrderStatusBadge status={order?.status ?? OrderStatus.PENDING} />
						<h6 className="text-[20px] font-bold leading-[30px]">
							{order?.code}
						</h6>
					</div>
				</div>

				<Button className="space-x-1 rounded-[3px] text-sm">
					<span>
						Bạn có hài lòng với dịch vụ của chúng tôi không? Đánh giá ngay!
					</span>
					<ArrowUpRight size={16} />
				</Button>
			</div>
			{/*  */}
			<div className="grid grid-cols-2 gap-[15px]">
				<div>
					<div className="text-[16px] leading-[24px] text-gray-600">
						Phương thức thanh toán
					</div>
					<div className="mt-[4px] text-[16px] font-bold leading-[24px]">
						{order?.method === PaymentMethod.CASH ? 'Tiền mặt' : 'Chuyển khoản'}
					</div>
				</div>
				<div>
					<div className="text-[16px] leading-[24px] text-gray-600">
						Ghi chú
					</div>
					<div className="mt-[4px] text-[16px] font-bold leading-[24px]">
						{order?.note}
					</div>
				</div>
				<div>
					<div className="text-[16px] leading-[24px] text-gray-600">
						Tạo lúc
					</div>
					<div className="mt-[4px] text-[16px] font-bold leading-[24px]">
						{dayjs(order?.created_at).format('LLL')}
					</div>
				</div>
				<div>
					<div className="text-[16px] leading-[24px] text-gray-600">
						Địa chỉ giao hàng
					</div>
					<div className="mt-[4px] text-[16px] font-bold leading-[24px]">
						{order?.address}
					</div>
				</div>
			</div>

			<OrdersDetailTabs order={order} />
		</div>
	)
}

export default MyOrdersDetail
