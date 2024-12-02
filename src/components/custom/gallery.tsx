import { ShoppingBag } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { PageSection, PageSectionHeader } from './page'

const Gallery = () => {
	return (
		<PageSection>
			<PageSectionHeader
				title="Phong Cách Trẻ Trung"
				description="Sản phẩm mới dành riêng cho bạn trẻ năng động."
			/>
			<div className="flex gap-[7px]">
				{Array.from({ length: 5 }).map((_, index) => (
					<Card key={index} className="group flex-grow shadow-none">
						<CardContent className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl border-none p-0">
							<div className="image-gallery relative h-full w-full overflow-hidden">
								<img
									src="https://picsum.photos/700/1000"
									alt={`image-gallery-${index}`}
									className=" h-full w-full object-cover transition-all duration-300 group-hover:brightness-75"
								/>
								<Button
									size="icon"
									className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white text-primary opacity-0 transition-opacity duration-300 hover:bg-primary hover:text-white group-hover:opacity-100"
								>
									<ShoppingBag size={16} />
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</PageSection>
	)
}

export default Gallery
