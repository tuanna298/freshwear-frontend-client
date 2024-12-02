import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { PageSection } from './page'

const Footer = () => {
	return (
		<PageSection>
			<Separator />
			<div className="mt-[40px] flex">
				<div className="flex flex-grow flex-col gap-3">
					<span className="mb-3 font-montserrat text-2xl font-semibold uppercase">
						freshwear
					</span>
					<p className="text-sm">
						Địa chỉ: 123 Đường ABC, Phường XYZ, Quận 123, TP. Hồ Chí Minh
					</p>
					<p className="text-sm">
						Số điện thoại: <span className="font-bold">0123 456 789</span>
					</p>
					<p className="text-sm">
						Email: <span className="font-bold">info@freshwearshop.com</span>
					</p>
					<div className="mt-3 flex gap-2">
						<Button size="icon" variant="outline" className="rounded-full">
							<Facebook size={16} />
						</Button>
						<Button size="icon" variant="outline" className="rounded-full">
							<Twitter size={16} />
						</Button>
						<Button size="icon" variant="outline" className="rounded-full">
							<Instagram size={16} />
						</Button>
						<Button size="icon" variant="outline" className="rounded-full">
							<Youtube size={16} />
						</Button>
					</div>
				</div>
				<div className="flex flex-grow flex-col gap-3">
					<span className="mb-3 font-semibold">Trợ giúp</span>
					<p className="text-sm">Chính sách bảo mật</p>
					<p className="text-sm">Chính sách đổi trả</p>
					<p className="text-sm">Chính sách vận chuyển</p>
					<p className="text-sm">Hướng dẫn thanh toán</p>
					<p className="text-sm">Hướng dẫn mua hàng</p>
				</div>
				<div className="flex flex-grow flex-col gap-3">
					<span className="mb-3 font-semibold">Về chúng tôi</span>
					<p className="text-sm">Câu chuyện phát triển</p>
					<p className="text-sm">Khám phá cửa hàng</p>
					<p className="text-sm">Liên hệ</p>
					<p className="text-sm">Giới thiệu</p>
				</div>
				<div className="flex flex-grow flex-col gap-3">
					<span className="mb-3 font-semibold">Thêm nữa</span>
					<p className="text-sm">FAQs</p>
					<p className="text-sm">So sánh</p>
					<p className="text-sm">Danh sách yêu thích</p>
				</div>
			</div>
		</PageSection>
	)
}

export default Footer
