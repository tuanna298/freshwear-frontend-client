import { Button } from '@/components/ui/button'
import { Order, OrderStatusLabel } from '@/schemas/order.schema'
import { useAuthStore } from '@/shared/hooks/use-auth-store'
import { useList } from '@refinedev/core'
import dayjs from 'dayjs'
import { ArrowUpRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { NumberField } from '../number-field'

const MyOrders = () => {
	const navigate = useNavigate()
	const { profile } = useAuthStore()
	const { data } = useList<Order>({
		resource: 'order',
		pagination: {
			pageSize: 100,
		},
		filters: [
			{
				field: 'where',
				operator: 'eq',
				value: JSON.stringify({
					user_id: profile?.id,
				}),
			},
		],
		queryOptions: {
			enabled: !!profile?.id,
		},
	})

	const orders = data?.data || []

	return (
		<div className="overflow-x-auto">
			<table className="w-full min-w-[700px]">
				<thead>
					<tr className="border bg-muted">
						<th className="px-[20px] py-[15px] text-sm font-[600]">Hoá đơn</th>
						<th className="px-[20px] py-[15px] text-sm font-[600]">Ngày tạo</th>
						<th className="px-[20px] py-[15px] text-sm font-[600]">
							Trạng thái
						</th>
						<th className="px-[20px] py-[15px] text-sm font-[600]">
							Tổng tiền
						</th>
						<th className="px-[20px] py-[15px] text-sm font-[600]">
							Hành động
						</th>
					</tr>
				</thead>
				<tbody className="border border-t-0">
					{orders.length > 0 &&
						orders.map((order) => (
							<tr key={order.id} className="border-b">
								<td className="px-[20px] py-[15px] text-center text-sm">
									{order.code}
								</td>
								<td className="px-[20px] py-[15px] text-center text-sm">
									{dayjs(order.created_at).format('LLL')}
								</td>
								<td className="px-[20px] py-[15px] text-center text-sm">
									{
										OrderStatusLabel[
											order.status as keyof typeof OrderStatusLabel
										]
									}
								</td>
								<td className="px-[20px] py-[15px] text-center text-sm">
									<NumberField value={order?.total_money || 0} />
								</td>
								<td className="px-[20px] py-[15px] text-center text-sm">
									<Button
										className="space-x-1 rounded-[3px] text-sm"
										onClick={() => navigate(`/my-account/orders/${order.id}`)}
									>
										<span>Xem chi tiết</span>
										<ArrowUpRight size={16} />
									</Button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	)
}

export default MyOrders
