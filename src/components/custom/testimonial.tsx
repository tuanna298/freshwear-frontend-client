import { cn } from '@/lib/utils'
import { Card, CardContent } from '../ui/card'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '../ui/carousel'
import { PageSection, PageSectionHeader } from './page'

const Testimonial = () => {
	return (
		<PageSection>
			{/* title */}
			<PageSectionHeader
				title="Khách hàng nói gì về chúng tôi?"
				description="Hãy lắng nghe những cảm nhận chân thật từ họ."
			/>

			{/* testimonial */}
			<Carousel
				opts={{
					align: 'center',
				}}
				className="mb-[60px] w-full"
			>
				<CarouselContent>
					{Array.from({ length: 5 }).map((_, index) => (
						<CarouselItem key={index} className={cn('basis-1/3')}>
							<Card className="shadow-none">
								<CardContent className="flex aspect-square items-center justify-center p-6">
									<span className="text-3xl font-semibold">{index + 1}</span>
								</CardContent>
							</Card>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="-left-[84px] h-[46px] w-[46px]" />
				<CarouselNext className="-right-[84px] h-[46px] w-[46px]" />
			</Carousel>

			{/* brand */}
			<Carousel
				opts={{
					align: 'center',
				}}
				className="mb-[60px] w-full"
			>
				<CarouselContent className="m-0 pb-1">
					{Array.from({ length: 6 }).map((_, index) => (
						<CarouselItem key={index} className="basis-1/6 p-0">
							<Card
								className={cn(
									'rounded-none shadow-none',
									index !== 0 ? 'border-s-transparent' : 'rounded-l-xl',
									index === 5 && 'rounded-r-xl',
								)}
							>
								<CardContent className="flex items-center justify-center p-6">
									<img
										src={`/assets/img/brand/brand-0${index + 1}.png`}
										alt={`image-brand-${index}`}
									/>
								</CardContent>
							</Card>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</PageSection>
	)
}

export default Testimonial
