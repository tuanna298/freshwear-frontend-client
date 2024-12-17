import { cn } from '@/lib/utils'
import { Order, OrderStatus } from '@/schemas/order.schema'
import dayjs from 'dayjs'
import { useState } from 'react'
import { NumberField } from '../../number-field'
import { Timeline, TimelinePropsItem } from '../../timeline'

interface Props {
	order: Order | undefined
}

const OrdersDetailTabs = ({ order }: Props) => {
	const [activeTab, setActiveTab] = useState(0)

	const tabs = [
		{ label: 'Lịch sử hoá đơn', content: OrderHistoryContent },
		{ label: 'Sản phẩm', content: ProductsContent },
	]

	return (
		<div className="mt-[30px]">
			{/* menu tab */}
			<ul className="my-0 flex list-none gap-[50px] gap-y-[10px] overflow-x-auto border-b ps-0">
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
							'pointer-events-none invisible absolute left-0 right-0 top-0 z-[1] block transform py-[35px] opacity-0 duration-200 ease-in',
							activeTab === index &&
								'transfrom-none pointer-events-auto visible relative z-[2] opacity-100 delay-300 duration-300 ease-out',
						)}
					>
						{/* Render the content for the active tab */}
						<tab.content order={order} />
					</div>
				))}
			</div>
		</div>
	)
}

const OrderHistoryContent = ({ order }: Props) => {
	const orderHistories = order?.histories || []
	const items: TimelinePropsItem[] = orderHistories.map((history) => ({
		title: getStatusColor(history.action_status).text,
		description: (
			<div className="flex flex-col gap-1">
				<span>{dayjs(history?.created_at).format('LLL')}</span>
				<span>
					<span className="font-bold">Ghi chú: </span>
					{history.note}
				</span>
			</div>
		),
	}))

	return <Timeline items={items} activeItem={items.length - 1} />
}

const ProductsContent = ({ order }: Props) => {
	const orderDetails = order?.details || []

	return (
		<div className="px-0">
			{/* items */}
			{orderDetails.length > 0 &&
				orderDetails.map((detail) => (
					<div className="mb-[30px] flex items-center gap-[12px] border-b pb-[20px]">
						<figure className="block h-[80px] w-[80px] rounded-[3px] border">
							<img
								src={
									detail?.product_detail?.image ||
									detail.product_detail?.product?.thumbnail ||
									'/assets/img/other/placeholder.jpg'
								}
								alt="product"
								className="aspect-rectangle-vertical h-full w-full max-w-full object-cover align-middle"
							/>
						</figure>
						<div className="text-sm">
							<div className="text-[16px] font-bold leading-[24px]">
								{detail.product_detail?.product?.name} -{' '}
								{detail.product_detail?.color.name} /{' '}
								{detail.product_detail?.size.name}
							</div>
							<div className="mt-[4px] ">
								<span className="font-bold">Đơn giá : </span>
								<NumberField value={detail.price} />
							</div>
							<div className="mt-[4px] ">
								<span className="font-bold">Số lượng : </span>
								<span>{detail.quantity}</span>
							</div>
						</div>
					</div>
				))}

			<ul>
				<li className="mb-0 mt-[4px] flex list-none items-center justify-between pb-[8px] ps-0 text-[16px] leading-[24px]">
					<span>Thành tiền</span>
					<NumberField
						value={order?.total_money || 0}
						className="text-3xl font-bold"
					/>
				</li>
			</ul>
		</div>
	)
}

export default OrdersDetailTabs

const getStatusColor = (
	status: OrderStatus,
): { indicatorColor: string; backgroundColor: string; text: string } => {
	switch (status) {
		case 'PENDING':
			return {
				indicatorColor: 'orange',
				backgroundColor: '#fff7e6',
				text: 'Chờ xử lý',
			}
		case 'WAIT_FOR_CONFIRMATION':
			return {
				indicatorColor: 'cyan',
				backgroundColor: '#e6fffb',
				text: 'Đơn hàng đã được đặt',
			}
		case 'DELIVERING':
			return {
				indicatorColor: 'green',
				backgroundColor: '#e6f7ff',
				text: 'Đơn hàng đang được giao',
			}
		case 'WAIT_FOR_DELIVERY':
			return {
				indicatorColor: 'gray',
				backgroundColor: '#f1f1f1',
				text: 'Đơn hàng đã sẵn sàng giao',
			}
		case 'COMPLETED':
			return {
				indicatorColor: 'blue',
				backgroundColor: '#e6fffb',
				text: 'Đơn hàng đã hoàn thành',
			}
		case 'CANCELED':
			return {
				indicatorColor: 'purple',
				backgroundColor: '#f9f0ff',
				text: 'Đơn hàng đã bị hủy',
			}
		case 'PAYMENT_FAILED':
			return {
				indicatorColor: 'red',
				backgroundColor: '#fff1f0',
				text: 'Thanh toán thất bại',
			}
		default:
			return {
				indicatorColor: 'black',
				backgroundColor: '#ffffff',
				text: 'Unknown status',
			}
	}
}
