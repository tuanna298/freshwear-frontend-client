import { Product } from '@/schemas/product.schema'
import ProductHelper from '@/shared/helpers/product.helper'
import { HttpError, useList } from '@refinedev/core'
import { ShoppingBag } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { PageSection, PageSectionHeader } from './page'

const Gallery = () => {
	const { data, refetch } = useList<Product, HttpError>({
		resource: 'product',
		pagination: {
			pageSize: 12,
		},
		sorters: [
			{
				field: 'created_at',
				order: 'asc',
			},
		],
	})

	const products = data?.data ? ProductHelper.transform(data.data) : []

	useEffect(() => {
		refetch()
	}, [])

	return (
		<PageSection>
			<PageSectionHeader
				title="Phong Cách Trẻ Trung"
				description="Sản phẩm mới dành riêng cho bạn trẻ năng động."
			/>
			<div className="flex gap-[7px]">
				{products.map((product) => (
					<Card key={product.id} className="group flex-grow shadow-none">
						<CardContent className="relative flex aspect-square h-full items-center justify-center overflow-hidden rounded-xl border-none p-0">
							<div className="image-gallery relative h-full w-full overflow-hidden">
								<img
									src={product.image[0] || 'assets/img/other/placeholder.jpg'}
									alt={`image-gallery-${product.id}`}
									className="h-full w-full object-cover object-top transition-all duration-300 group-hover:brightness-75"
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
