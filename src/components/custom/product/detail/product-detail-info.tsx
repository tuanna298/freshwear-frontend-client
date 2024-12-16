import { Ship, UndoDot } from 'lucide-react'

const ProductDetailInfo = () => {
	return (
		<div className="grid grid-cols-2 gap-10">
			<div className="flex flex-col items-center gap-[16px] rounded-[2.5px] border px-[28px] py-[30px] text-center text-sm">
				<Ship />
				<p>
					Thời gian giao hàng dự kiến:{' '}
					<span className="font-bold">2-3 ngày</span>,{' '}
					<span className="font-bold text-destructive">miễn phí</span> vận
					chuyển cho <span className="font-bold">toàn bộ đơn hàng</span>
				</p>
			</div>
			<div className="flex flex-col items-center gap-[16px] rounded-[2.5px] border px-[28px] py-[30px] text-center text-sm">
				<UndoDot />
				<p>
					Hoàn trả trong vòng <span className="font-bold">30 ngày</span> kể từ
					ngày mua hàng. Không bao gồm thuế và các chi phí.
				</p>
			</div>
		</div>
	)
}

export default ProductDetailInfo
