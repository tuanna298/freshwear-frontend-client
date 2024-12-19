import { HeaderPlacholder } from '@/components/custom/header'
import OrdersDetailTabs from '@/components/custom/my-account/sub/orders-detail-tabs'
import OrderStatusBadge from '@/components/custom/order/order-status-badge'
import { Order, OrderStatus, PaymentMethod } from '@/schemas/order.schema'
import { useList } from '@refinedev/core'
import dayjs from 'dayjs'
import { Fragment } from 'react'
import { useParams } from 'react-router-dom'

const OrderDetails = () => {
	const { code } = useParams<{ code: string }>()
	const { data } = useList<Order>({
		resource: 'order',
		filters: [
			{
				field: 'where',
				operator: 'eq',
				value: JSON.stringify({ code }),
			},
		],
		queryOptions: {
			enabled: !!code,
		},
	})

	const order = data?.data?.[0]

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

			{order && <OrdersDetailTabs order={order} />}
		</div>
	)
}

const TrackingOrder = () => {
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
						Tra cứu đơn hàng
					</div>
				</div>
			</div>

			{/* content */}
			<section className="container m-auto w-full pb-[70px] pt-[80px]">
				<OrderDetails />
			</section>
		</Fragment>
	)
}

export default TrackingOrder
