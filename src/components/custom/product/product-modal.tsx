import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { StarRating } from '@/components/ui/star-rating'
import { AppToast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'
import { Color } from '@/schemas/color.schema'
import { ProductClient, SizeClient } from '@/schemas/product.schema'
import ProductHelper from '@/shared/helpers/product.helper'
import { useCartStore } from '@/shared/hooks/use-cart-store'
import { uniqBy } from 'lodash'
import {
	ArrowUpRight,
	Heart,
	Minus,
	Plus,
	ShoppingCart,
	Shuffle,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NumberField } from '../number-field'

interface ProductModalProps {
	product: ProductClient
}

const ProductModal = ({ product }: ProductModalProps) => {
	const { items, add } = useCartStore()

	const initialSelectedColor =
		product?.variation && product.variation?.length > 0
			? product?.variation[0].color
			: ({} as Color)
	const initialSelectedSize =
		product?.variation && product.variation?.length > 0
			? product?.variation[0].size[0]
			: ({} as SizeClient)
	const initialProductStock =
		product?.variation && product.variation?.length > 0
			? product?.variation[0].size[0].stock
			: 0

	const [selectedProductColor, setSelectedProductColor] =
		useState(initialSelectedColor)

	const [selectedProductSize, setSelectedProductSize] =
		useState(initialSelectedSize)

	const [selectedVariant, setSelectedVariant] = useState(product?.variation[0])

	const [productStock, setProductStock] = useState(initialProductStock)

	const [quantityCount, setQuantityCount] = useState(1)

	const finalProductPrice = selectedProductSize.price

	const productCartQty = ProductHelper.getProductCartQuantity(
		items,
		product,
		selectedProductColor,
		selectedProductSize,
	)

	const isButtonDisabled = quantityCount > productStock - productCartQty

	console.log('quantityCount', quantityCount)
	console.log('productStock', productStock)
	console.log('productCartQty', productCartQty)

	const sizes = uniqBy(
		(product?.variation || []).flatMap((v) => v.size.map((s) => s)),
		'id',
	)
	const colors = uniqBy(
		(product?.variation || []).map((v) => v.color),
		'id',
	)

	useEffect(() => {
		const selectedVariant = product?.variation?.find(
			(variation) => variation.color.id === selectedProductColor.id,
		)
		if (selectedVariant) setSelectedVariant(selectedVariant)
	}, [selectedProductColor])

	return (
		<Dialog
			onOpenChange={(open) => {
				if (!open) {
					setSelectedProductColor(initialSelectedColor)
					setSelectedProductSize(initialSelectedSize)
					setProductStock(initialProductStock)
					setQuantityCount(1)
				}
			}}
		>
			<DialogTrigger asChild>
				<Button className="aspect-square h-[42px] w-[42px] rounded-[3px] bg-background p-0 text-primary hover:text-background">
					<ShoppingCart size={18} />
				</Button>
			</DialogTrigger>
			<DialogContent className="flex max-h-[calc(100vh-60px)] w-full gap-0 overflow-hidden p-0">
				<DialogTitle></DialogTitle>

				{/* image */}
				<Carousel className="!w-[min(50%,68vh)]">
					<CarouselContent>
						{selectedVariant?.image &&
							selectedVariant.image?.length > 0 &&
							(selectedVariant?.image).map((image, index) => (
								<CarouselItem key={index}>
									<Card className="shadow-none">
										<CardContent className="flex items-center justify-center p-0">
											<img
												src={image || 'assets/img/other/placeholder.jpg'}
												alt=""
											/>
										</CardContent>
									</Card>
								</CarouselItem>
							))}
					</CarouselContent>
					<CarouselPrevious className="left-5" />
					<CarouselNext className="right-5" />
				</Carousel>
				{/* info */}
				<div className="hidden-scroll-container flex max-w-full flex-grow flex-col gap-5 overflow-y-auto px-[40px] py-[50px]">
					<h3 className="text-3xl">{product?.name}</h3>
					{/* price */}
					<NumberField
						value={finalProductPrice}
						className="text-3xl text-destructive"
					/>
					{/* rating */}
					<StarRating value={4} />
					{/* description  */}
					<p>{product?.description}</p>
					<Separator className="my-5" />
					{/* color picker */}
					<div>
						<div className="mb-[15px]">
							Màu sắc:
							<span className="ms-3 font-bold">
								{selectedProductColor.name}
							</span>
						</div>
						<div className="flex flex-wrap items-center gap-[10px]">
							{colors.map((color) => (
								<React.Fragment key={color.id}>
									<input
										type="radio"
										id={color.id as string}
										className="!absolute -m-[1px] h-[1px] w-[1px] overflow-hidden border-none p-0"
										style={{
											clip: 'rect(0 0 0 0)',
											wordWrap: 'normal',
										}}
										checked={color.id === selectedProductColor.id}
										onChange={() => {
											setSelectedProductColor(color)
											setSelectedProductSize(sizes[0])
											setProductStock(sizes[0].stock)
											setQuantityCount(1)
										}}
									/>
									<label
										htmlFor={color.id as string}
										className={cn(
											'relative h-[36px] w-[36px] cursor-pointer !rounded-[60px] border border-transparent p-[5px] text-center font-[400] leading-[22.4px] transition-[all_0.3s_ease]',
											color.id === selectedProductColor.id &&
												'border-primary shadow-[0_0.4rem_0.4rem_rgba(0,0,0,0.102)]',
										)}
									>
										<span
											className="block h-full w-full rounded-full border border-[#8787871E]"
											style={{
												backgroundColor: color.code,
											}}
										/>
									</label>
								</React.Fragment>
							))}
						</div>
					</div>
					{/* size picker */}
					<div>
						<div className="mb-[15px]">
							Kích cỡ:
							<span className="ms-3 font-bold">{selectedProductSize.name}</span>
						</div>
						<div className="flex flex-wrap items-center gap-[10px]">
							{sizes.map((size) => (
								<React.Fragment key={size.id}>
									<input
										type="radio"
										id={size.id as string}
										className="!absolute -m-[1px] h-[1px] w-[1px] overflow-hidden border-none p-0"
										style={{
											clip: 'rect(0 0 0 0)',
											wordWrap: 'normal',
										}}
										checked={size.id === selectedProductSize.id}
										onChange={() => {
											setSelectedProductSize(size)
											setProductStock(size.stock)
											setQuantityCount(1)
										}}
									/>
									<label
										htmlFor={size.id as string}
										className={cn(
											'relative h-[38px] w-max min-w-[45px] cursor-pointer rounded-[3px] border border-[#8787871E] px-[15px] py-[7px] text-center font-[400] leading-[22.4px] transition-[all_0.3s_ease]',
											size.id === selectedProductSize.id &&
												'border-primary bg-primary text-white shadow-[0_0.4rem_0.4rem_rgba(0,0,0,0.102)]',
										)}
									>
										{size.name}
									</label>
								</React.Fragment>
							))}
						</div>
					</div>
					{/* quantity */}
					<div>
						<div className="flex items-center justify-between gap-2">
							<div className="mb-[5px] !font-[600]">Số lượng</div>
							<div>
								<span className="font-bold text-destructive">
									{productStock}
								</span>{' '}
								trong kho
							</div>
						</div>
						<div className="flex w-32 justify-between overflow-hidden rounded-[3px] bg-[#f2f2f2]">
							<span
								className="user-select-none flex h-[46px] w-[38px] cursor-pointer select-none items-center justify-center text-primary transition-[all_0.3s_ease] hover:text-destructive"
								onClick={() => {
									if (quantityCount <= 1) {
										AppToast.error('Số lượng tối thiểu là 1', {
											position: 'bottom-left',
										})
									} else {
										setQuantityCount(quantityCount - 1)
									}
								}}
							>
								<Minus size={16} />
							</span>
							<input
								type="text"
								min={1}
								value={quantityCount}
								onChange={(e) => {
									const value = parseInt(e.target.value)

									if (isNaN(value)) return

									if (value > productStock) {
										AppToast.error('Số lượng không đủ trong kho', {
											position: 'bottom-left',
										})
									} else {
										setQuantityCount(value)
									}
								}}
								className="h-[46px] w-[51px] border-0 bg-transparent p-0 text-center text-[16px] font-[600px] leading-[26px] text-primary"
							/>
							<span
								className="user-select-none flex h-[46px] w-[38px] cursor-pointer select-none items-center justify-center text-primary transition-[all_0.3s_ease] hover:text-destructive"
								onClick={() => {
									if (quantityCount >= productStock - productCartQty) {
										AppToast.error('Số lượng không đủ trong kho', {
											position: 'bottom-left',
										})
									} else {
										setQuantityCount(quantityCount + 1)
									}
								}}
							>
								<Plus size={16} />
							</span>
						</div>
					</div>
					{/* buy button */}
					<div className="flex flex-wrap gap-[8px]">
						{productStock && productStock > 0 ? (
							<Button
								className="h-full flex-grow rounded-[3px] px-[24px] py-[14px] text-center text-base font-semibold transition-[all_0.3s_ease]"
								disabled={isButtonDisabled}
								onClick={() =>
									add({
										id: '',
										cartItemId: product.id,
										name: product.name,
										quantity: quantityCount,
										image: product.image[0],
										color: selectedProductColor,
										size: selectedProductSize,
									})
								}
							>
								Thêm vào giỏ
							</Button>
						) : (
							<Button
								className="h-full flex-grow rounded-[3px] px-[24px] py-[14px] text-center text-base font-semibold transition-[all_0.3s_ease]"
								disabled={true}
							>
								Hết hàng
							</Button>
						)}
						<Button
							variant="outline"
							className="h-full flex-shrink-0 rounded-[3px] transition-[all_0.3s_ease]"
						>
							<Heart size={18} />
							{/* Trash2 */}
						</Button>
						<Button
							variant="outline"
							className="h-full flex-shrink-0 rounded-[3px] transition-[all_0.3s_ease]"
						>
							<Shuffle size={18} />
							{/* <Check /> */}
						</Button>
					</div>

					{/* view full details */}
					<Link
						to={`/product-detail/${product?.id}`}
						className="relative inline-flex w-fit cursor-pointer items-center gap-1 border-b border-primary bg-transparent pb-[7px] pr-0 ps-0 pt-0 align-middle text-[14px] font-[600] text-primary no-underline transition-[all_0.3s_ease] hover:border-destructive hover:text-destructive"
					>
						Xem chi tiết
						<ArrowUpRight size={16} />
					</Link>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default ProductModal
