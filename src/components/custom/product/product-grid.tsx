import { cn } from '@/lib/utils'
import { Product, ProductClient } from '@/schemas/product.schema'
import ProductHelper from '@/shared/helpers/product.helper'
import { HttpError, useList } from '@refinedev/core'
import { motion, Variants } from 'framer-motion'
import { uniqBy } from 'lodash'
import { Heart } from 'lucide-react'
import { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { Button } from '../../ui/button'
import { NumberField } from '../number-field'
import ProductCompare from './product-compare'
import ProductModal from './product-modal'

export const ProductGrid = () => {
	const { data } = useList<Product, HttpError>({
		resource: 'product',
		pagination: {
			pageSize: 12,
		},
	})

	const products = data?.data ? ProductHelper.transform(data.data) : []

	return (
		<div className="container m-auto pt-[100px]">
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

const buttonVariants: Variants = {
	hidden: { opacity: 0, y: 10 },
	visible: (custom) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: custom * 0.2,
			duration: 0.1,
			ease: 'easeOut',
		},
	}),
}

export const ProductGridSingle = ({ product }: ProductGridSingleProps) => {
	const ref = useRef(null)
	const { id, name, image, price, variation } = product

	const defaultImages = {
		main:
			(variation?.length > 0 && variation[0]?.image[0]) ||
			image[0] ||
			'/assets/img/other/placeholder.jpg',
		hover:
			(variation?.length > 0 && variation[0]?.image[1]) ||
			image[0] ||
			image[1] ||
			'/assets/img/other/placeholder.jpg',
	}

	const [isHovered, setIsHovered] = useState(false)
	const [currentImages, setCurrentImages] = useState(defaultImages)
	const [hoveredColor, setHoveredColor] = useState<string>(
		(variation?.length > 0 && (variation[0]?.color?.id as string)) || '',
	)

	const sizes = uniqBy(
		variation?.length > 0 ? variation.flatMap((v) => v.size.map((s) => s)) : [],
		'id',
	)
	const colors = uniqBy(
		variation?.length > 0 ? variation.map((v) => v.color) : [],
		'id',
	)

	const handleColorHover = (colorId: string) => {
		const selectedVariation = variation.find((v) => v.color.id === colorId)

		setCurrentImages({
			main: selectedVariation?.image[0] || currentImages.main,
			hover:
				selectedVariation?.image[1] ||
				selectedVariation?.image[0] ||
				currentImages.hover,
		})
		setHoveredColor(colorId)
	}

	useOnClickOutside(ref, () => {
		setIsHovered(false)
	})

	return (
		<div
			ref={ref}
			className="group h-full"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* product wrapper */}
			<div
				className={`card-product-wrapper relative z-20 overflow-hidden rounded-xl`}
			>
				{/* product image */}
				<a className="product-img" href={`/product-detail/${id}`}>
					<img
						src={currentImages.main}
						alt={`image-product-${id}`}
						className="img-product h-full w-full"
					/>
					<img
						src={currentImages.hover}
						alt={`image-product-${id}`}
						className="img-hover h-full w-full"
					/>
				</a>
				{/* list product buttons */}
				<motion.div
					className={`absolute bottom-[48px] left-[15px] right-[15px] z-10 flex items-center justify-center gap-[6px] transition-all duration-300 ${
						isHovered ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
					}`}
					initial="hidden"
					animate={isHovered ? 'visible' : 'hidden'}
					variants={buttonVariants}
				>
					<motion.div custom={0.01} variants={buttonVariants}>
						<ProductModal product={product} key={product.id} />
					</motion.div>
					<motion.div custom={1} variants={buttonVariants}>
						<Button className="aspect-square h-[42px] w-[42px] rounded-[3px] bg-background p-0 text-primary hover:text-background">
							<Heart size={18} />
						</Button>
					</motion.div>
					<motion.div custom={2} variants={buttonVariants}>
						<ProductCompare />
					</motion.div>
				</motion.div>
				{/* sizes list */}
				<div
					className={`absolute bottom-0 left-0 right-0 z-20 flex h-[33px] items-center justify-center gap-[15px] bg-[rgba(0,0,0,0.3)] text-center text-[12px] font-[600] leading-[22px] text-[#f2f2f2] transition-all duration-300 ${
						isHovered
							? 'translate-y-0 opacity-100'
							: 'translate-y-[100%] opacity-0'
					}`}
				>
					{sizes.map((size) => (
						<span key={size.id}>{size.name}</span>
					))}
				</div>
			</div>
			{/* product info */}
			<div className="grid gap-3 pt-[20px]">
				{/* title */}
				<a
					className="text-decoration-none cursor-pointer overflow-hidden text-base hover:text-destructive"
					href={`/product-detail/${id}`}
				>
					{name}
				</a>
				{/* price */}
				<NumberField className="font-bold" value={price.min} />
				{/* colors list */}
				<ul className="mb-0 mt-1 flex list-none flex-wrap gap-2 ps-0">
					{colors.length > 0 ? (
						colors.map((color) => (
							<li
								key={color.id}
								className={cn(
									'relative flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-full border border-gray-200 p-[3px]',
									hoveredColor === color.id && 'ring-2 ring-primary',
								)}
								onMouseEnter={() => handleColorHover(color.id as string)}
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
						))
					) : (
						<div className="h-[26px] w-[26px] bg-background" />
					)}
				</ul>
			</div>
		</div>
	)
}
