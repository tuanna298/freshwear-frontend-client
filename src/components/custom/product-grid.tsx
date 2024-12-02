import { Check, Heart, ShoppingCart, Shuffle, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { NumberField } from './number-field'

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

export const ProductGrid = () => {
	return (
		<div className="m-auto max-w-[1540px] pr-[50px] ps-[50px] pt-[100px]">
			{/* title */}
			<div className="mb-[60px] flex flex-col items-center gap-[10px] pr-[15px] ps-[15px]">
				<span className="text-4xl">Bán chạy nhất</span>
				<p className="text-center text-base">
					Mua phong cách thời thượng: Đón đầu xu hướng với bộ sưu tập mới nhất
					của chúng tôi.
				</p>
			</div>
			<div className="grid grid-cols-4 gap-[30px] gap-y-[80px]">
				{products.map((product) => {
					return <ProductGridSingle product={product} key={product.id} />
				})}
			</div>
		</div>
	)
}

type ProductGridSingleProps = {
	product: {
		id: number
		name: string
		price: number
		image: string
		sizes: string[]
		colors: string[]
	}
}

export const ProductGridSingle = ({
	product: { id, name, image, price, sizes, colors },
}: ProductGridSingleProps) => {
	return (
		<div className="h-full">
			{/* product wrapper */}
			<div className="relative z-20 overflow-hidden rounded-xl">
				{/* product image */}
				<img
					src={image}
					alt={`image-product-${id}`}
					className="h-full w-full object-cover object-center"
				/>
				{/* list product buttons */}
				<div className="absolute left-[15px] right-[15px] z-10 flex items-center justify-center gap-1 align-middle">
					<Button>
						<ShoppingCart />
					</Button>
					<Button>
						<Heart />
						<Trash2 />
					</Button>
					<Button>
						<Shuffle />
						<Check />
					</Button>
				</div>
				{/* sizes list */}
				<div className="absolute left-0 right-0 z-20 flex items-center justify-center bg-black/30 text-center">
					{sizes.map((size) => (
						<span key={size}>{size}</span>
					))}
				</div>
			</div>
			{/* product info */}
			<div className="grid gap-3 pt-[20px]">
				{/* title */}
				<a
					className="text-decoration-none cursor-pointer overflow-hidden text-base"
					href={`/product-detail/${id}`}
				>
					{name}
				</a>
				{/* price */}
				<NumberField className="font-bold" value={price} />
				{/* colors list */}
				<ul className="mb-0 mt-1 flex list-none flex-wrap gap-2 ps-0">
					{colors.map((color) => (
						<li
							key={color}
							className="relative flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-full border border-gray-200 p-[3px]"
						>
							{/* tooltip */}
							{/* circle */}
							<span
								className="inline-block h-[18px] w-[18px] rounded-full border-[3px] border-transparent"
								style={{
									backgroundColor: color,
								}}
							/>
							{/* color image */}
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
