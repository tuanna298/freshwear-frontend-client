import { cn } from '@/lib/utils'
import {
	Box,
	CreditCard,
	HandHelping,
	Handshake,
	Headset,
	Scroll,
} from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import { PageSection } from './page'

const features = [
	{
		id: 1,
		title: 'Miễn phí vận chuyển',
		description: 'Miễn phí vận chuyển cho mọi đơn hàng.',
		icon: <Box />,
	},
	{
		id: 2,
		title: 'Thanh toán linh hoạt',
		description: 'Thanh toán bằng nhiều phương thức khác nhau.',
		icon: <CreditCard />,
	},
	{
		id: 3,
		title: 'Chăm sóc khách hàng',
		description: 'Hỗ trợ khách hàng 24/7.',
		icon: <Headset />,
	},
	{
		id: 4,
		title: 'Bảo hành dài hạn',
		description: 'Bảo hành dài hạn cho tất cả sản phẩm.',
		icon: <Scroll />,
	},
	{
		id: 5,
		title: 'Ưu đãi hàng tháng',
		description: 'Ưu đãi hàng tháng cho khách hàng thân thiết.',
		icon: <HandHelping />,
	},
	{
		id: 6,
		title: 'Chất lượng đảm bảo',
		description: 'Chất lượng sản phẩm được đảm bảo.',
		icon: <Handshake />,
	},
]

const Feature = () => {
	return (
		<PageSection>
			<Carousel
				opts={{
					align: 'center',
				}}
				className="mb-[60px] w-full"
			>
				<CarouselContent>
					{features.map((feat) => (
						<CarouselItem key={feat.id} className="basis-1/4">
							<Card className={cn('h-full shadow-none')}>
								<CardContent className="flex flex-col items-center justify-center p-6">
									<div className="mb-[34px]">{feat.icon}</div>
									<h3 className="text-md mb-[10px] text-center font-semibold">
										{feat.title}
									</h3>
									<p className="text-s-dark text-center text-sm">
										{feat.description}
									</p>
								</CardContent>
							</Card>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</PageSection>
	)
}

export default Feature
