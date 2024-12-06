import { Product, ProductClient } from '@/schemas/product.schema'
import ProductHelper from '@/shared/helpers/product.helper'
import { HttpError, useList } from '@refinedev/core'
import { Check, Heart, ShoppingCart, Shuffle, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { NumberField } from './number-field'

export const ProductGrid = () => {
	const { data } = useList<Product, HttpError>({
		resource: 'product',
		pagination: {
			pageSize: 12,
		},
	})

	const products = data?.data ? ProductHelper.transform(data.data) : []

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
	product: ProductClient
}

export const ProductGridSingle = ({
	product: { id, name, image, price, variation },
}: ProductGridSingleProps) => {
	const sizes = variation.flatMap((v) => v.size.map((s) => s))
	const colors = variation.map((v) => v.color)

	return (
		<div className="h-full">
			{/* product wrapper */}
			<div className="relative z-20 overflow-hidden rounded-xl">
				{/* product image */}
				<img
					src={image[0]}
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
						<span key={size.id}>{size.name}</span>
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
				<NumberField className="font-bold" value={price.min} />
				{/* colors list */}
				<ul className="mb-0 mt-1 flex list-none flex-wrap gap-2 ps-0">
					{colors.map((color) => (
						<li
							key={color.id}
							className="relative flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-full border border-gray-200 p-[3px]"
						>
							{/* tooltip */}
							{/* circle */}
							<span
								className="inline-block h-[18px] w-[18px] rounded-full border-[3px] border-transparent"
								style={{
									backgroundColor: color.code,
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
