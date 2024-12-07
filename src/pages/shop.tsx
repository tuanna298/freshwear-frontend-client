import Dots from '@/components/custom/dots'
import { HeaderPlacholder } from '@/components/custom/header'
import { PageSection } from '@/components/custom/page'
import { ProductGridSingle } from '@/components/custom/product/product-grid'
import { Button } from '@/components/ui/button'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { ListFilter } from 'lucide-react'
import { Fragment } from 'react/jsx-runtime'

const products = [
	{
		id: 1,
		name: 'Classic T-Shirt',
		price: 250,
		image: 'https://picsum.photos/700/1000',
		sizes: ['S', 'M', 'L', 'XL'],
		colors: ['red', 'white', 'black'],
	},
	{
		id: 2,
		name: 'Running Shoes',
		price: 1200,
		image: 'https://picsum.photos/700/1000',
		sizes: ['6', '7', '8', '9', '10'],
		colors: ['blue', 'gray', 'black'],
	},
	{
		id: 3,
		name: 'Leather Jacket',
		price: 3500,
		image: 'https://picsum.photos/700/1000',
		sizes: ['M', 'L', 'XL'],
		colors: ['black', 'brown'],
	},
	{
		id: 4,
		name: 'Casual Cap',
		price: 150,
		image: 'https://picsum.photos/700/1000',
		sizes: ['One Size'],
		colors: ['green', 'white', 'black'],
	},
	{
		id: 5,
		name: 'Denim Jeans',
		price: 800,
		image: 'https://picsum.photos/700/1000',
		sizes: ['30', '32', '34', '36'],
		colors: ['blue', 'black', 'gray'],
	},
	{
		id: 6,
		name: 'Sneakers',
		price: 950,
		image: 'https://picsum.photos/700/1000',
		sizes: ['5', '6', '7', '8', '9'],
		colors: ['pink', 'white', 'black'],
	},
	{
		id: 7,
		name: 'Winter Coat',
		price: 4500,
		image: 'https://picsum.photos/700/1000',
		sizes: ['M', 'L', 'XL', 'XXL'],
		colors: ['brown', 'black', 'gray'],
	},
	{
		id: 8,
		name: 'Woolen Scarf',
		price: 300,
		image: 'https://picsum.photos/700/1000',
		sizes: ['One Size'],
		colors: ['purple', 'white', 'black'],
	},
	{
		id: 9,
		name: 'Sports Watch',
		price: 2500,
		image: 'https://picsum.photos/700/1000',
		sizes: ['One Size'],
		colors: ['gold', 'black', 'silver'],
	},
	{
		id: 10,
		name: 'Backpack',
		price: 2000,
		image: 'https://picsum.photos/700/1000',
		sizes: ['One Size'],
		colors: ['red', 'blue', 'gray'],
	},
	{
		id: 11,
		name: 'Sunglasses',
		price: 1000,
		image: 'https://picsum.photos/700/1000',
		sizes: ['One Size'],
		colors: ['black', 'brown', 'blue'],
	},
	{
		id: 12,
		name: 'Formal Shirt',
		price: 700,
		image: 'https://picsum.photos/700/1000',
		sizes: ['S', 'M', 'L', 'XL'],
		colors: ['white', 'blue', 'gray'],
	},
]

const Shop = () => {
	return (
		<Fragment>
			<HeaderPlacholder />
			<div
				className="pb-[65px] pr-0 ps-0 pt-[69px]"
				style={{
					backgroundImage: 'url(assets/img/other/page-title-blog.png)',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
				}}
			>
				<div className="mx-auto my-0 w-full max-w-full pr-[40px] ps-[40px]">
					<div className="text-center text-[42px] font-[400] leading-[50px]">
						Hàng Mới Về
					</div>
					<div className="mt-[5px] text-center text-[16px] leading-[24px] text-primary">
						Phong cách mới, giá cực yêu - chỉ có tại đây
					</div>
				</div>
			</div>
			<section className="px-0 pb-[70px] pt-[45px]">
				<PageSection classname="pb-0">
					<div className="mb-[28px] grid grid-cols-3 !items-center gap-[5px]">
						<Button variant="outline" className="flex w-fit gap-3">
							<ListFilter />
							Lọc
						</Button>

						<div className="flex items-center justify-center gap-10">
							<div className="grid grid-cols-2 gap-1">
								<Dots count={4} />
							</div>
							<div className="grid grid-cols-3 gap-1">
								<Dots count={6} />
							</div>
							<div className="grid grid-cols-4 gap-1">
								<Dots count={8} />
							</div>
							<div className="grid grid-cols-5 gap-1">
								<Dots count={10} />
							</div>
							<div className="grid grid-cols-6 gap-1">
								<Dots count={12} />
							</div>
						</div>

						<div className="flex justify-end">
							<Select>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Theme" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="light">Light</SelectItem>
									<SelectItem value="dark">Dark</SelectItem>
									<SelectItem value="system">System</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className="grid grid-cols-4 gap-[30px]">
						{products.map((product) => (
							<ProductGridSingle product={product} key={product.id} />
						))}
					</div>

					<div className="pt-[60px]">
						<Pagination>
							<PaginationContent>
								<PaginationItem>
									<PaginationPrevious size="lg" href="#" />
								</PaginationItem>
								<PaginationItem>
									<PaginationLink className="text-lg" size="lg" href="#">
										1
									</PaginationLink>
								</PaginationItem>
								<PaginationItem>
									<PaginationLink className="text-lg" size="lg" href="#">
										2
									</PaginationLink>
								</PaginationItem>
								<PaginationItem>
									<PaginationLink className="text-lg" size="lg" href="#">
										3
									</PaginationLink>
								</PaginationItem>
								<PaginationItem>
									<PaginationLink className="text-lg" size="lg" href="#">
										4
									</PaginationLink>
								</PaginationItem>
								<PaginationItem>
									<PaginationNext href="#" />
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</div>
				</PageSection>
			</section>
		</Fragment>
	)
}

export default Shop
