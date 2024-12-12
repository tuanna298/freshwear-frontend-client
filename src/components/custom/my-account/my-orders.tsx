import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'

const MyOrders = () => {
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
					<tr className="border-b">
						<td className="px-[20px] py-[15px] text-center text-sm">#123</td>
						<td className="px-[20px] py-[15px] text-center text-sm">
							August 1, 2024
						</td>
						<td className="px-[20px] py-[15px] text-center text-sm">On hold</td>
						<td className="px-[20px] py-[15px] text-center text-sm">
							$200.0 for 1 items
						</td>
						<td className="px-[20px] py-[15px] text-center text-sm">
							<Button className="space-x-1 rounded-[3px] text-sm">
								<span>Xem chi tiết</span>
								<ArrowUpRight size={16} />
							</Button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default MyOrders
