import { HeaderPlacholder } from '@/components/custom/header'
import { NumberField } from '@/components/custom/number-field'
import { PageSection } from '@/components/custom/page'
import ProductDetailInfo from '@/components/custom/product/detail/product-detail-info'
import ProductDetailTabs from '@/components/custom/product/detail/product-detail-tabs'
import { ProductGridSingle } from '@/components/custom/product/product-grid'
import {
	Carousel,
	CarouselMainContainer,
	CarouselThumbsContainer,
	SliderMainItem,
	SliderThumbItem,
} from '@/components/extension/carousel'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { StarRating } from '@/components/ui/star-rating'
import { AppToast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'
import { Color } from '@/schemas/color.schema'
import { Product, ProductClient, SizeClient } from '@/schemas/product.schema'
import ProductHelper from '@/shared/helpers/product.helper'
import { useCartStore } from '@/shared/hooks/use-cart-store'
import { HttpError, useList, useOne } from '@refinedev/core'
import { Heart, Minus, Plus, Shuffle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'

const productPlaceholder: ProductClient = {
	id: '',
	code: '',
	name: '',
	price: {
		min: 0,
		max: 0,
	},
	sale_count: 0,
	average_rating: 0,
	new: false,
	variation: [],
	image: [''],
	description: '',
}

const ProductDetail = () => {
	const { id } = useParams<{ id: string }>()
	const { data: dataOne } = useOne<Product, HttpError>({
		resource: 'product',
		id,
	})

	const { data } = useList<Product, HttpError>({
		resource: 'product',
		pagination: {
			current: 1,
			pageSize: 4,
		},
		sorters: [
			{
				field: 'created_at',
				order: 'desc',
			},
		],
	})

	const [product, setProduct] = useState<ProductClient>(productPlaceholder)

	const products = data?.data ? ProductHelper.transform(data.data) : []

	useEffect(() => {
		if (dataOne?.data) {
			setProduct(ProductHelper.transform([dataOne.data])[0])
		}
	}, [dataOne?.data])

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

	useEffect(() => {
		if (!selectedVariant && product) {
			setSelectedVariant(
				product?.variation?.length > 0 ? product.variation[0] : undefined,
			)
			setSelectedProductSize(
				product?.variation && product.variation?.length > 0
					? product?.variation[0].size[0]
					: ({} as SizeClient),
			)
			setSelectedProductColor(
				product?.variation && product.variation?.length > 0
					? product?.variation[0].color
					: ({} as Color),
			)
			setProductStock(
				product?.variation && product.variation?.length > 0
					? product?.variation[0].size[0].stock
					: 0,
			)
		}
	}, [product])

	const [selectedVariant, setSelectedVariant] = useState(
		product?.variation?.length > 0 ? product.variation[0] : undefined,
	)

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

	useEffect(() => {
		const selectedVariant = product?.variation?.find(
			(variation) => variation.color.id === selectedProductColor.id,
		)
		if (selectedVariant) setSelectedVariant(selectedVariant)
	}, [selectedProductColor])

	return (
		<Fragment>
			<HeaderPlacholder />
			<div
				className="pb-[65px] pr-0 ps-0 pt-[69px]"
				style={{
					backgroundImage: 'url(/assets/img/other/page-title-blog.png)',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
				}}
			>
				<div className="mx-auto my-0 w-full max-w-full pr-[40px] ps-[40px]">
					<div className="text-center text-[42px] font-[400] leading-[50px]">
						Chi tiết sản phẩm
					</div>
				</div>
			</div>

			<PageSection>
				{/* breadcrumb */}
				<div className="flex flex-wrap items-center px-0 py-[30px] ">
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>{product.name}</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>

				{/* product detail */}
				<div className="mb-[100px] grid grid-cols-2">
					<Carousel
						orientation="vertical"
						className="flex items-start gap-2 pr-[30px]"
					>
						<CarouselThumbsContainer className="h-full max-h-[1000px] gap-2">
							{selectedVariant?.image &&
								selectedVariant.image?.length > 0 &&
								(selectedVariant?.image).map((src, index) => (
									<SliderThumbItem
										key={index}
										index={index}
										className="rounded-md bg-transparent p-0"
									>
										<img
											className="flex h-full w-full cursor-pointer items-center justify-center rounded-md border border-muted bg-background"
											src={src || 'assets/img/other/placeholder.jpg'}
										/>
									</SliderThumbItem>
								))}
						</CarouselThumbsContainer>
						<div className="relative flex-grow basis-3/4">
							<CarouselMainContainer>
								{selectedVariant?.image &&
									selectedVariant.image?.length > 0 &&
									(selectedVariant?.image).map((src, index) => (
										<SliderMainItem
											key={index}
											className="flex items-center justify-center rounded-md border border-muted p-0"
										>
											<img
												className="flex h-full w-full cursor-pointer items-center justify-center rounded-md border border-muted bg-background object-cover"
												src={src || 'assets/img/other/placeholder.jpg'}
											/>
										</SliderMainItem>
									))}
							</CarouselMainContainer>
						</div>
					</Carousel>
					<div className="flex flex-col gap-5">
						<h3 className="text-3xl">{product.name}</h3>

						{/* price */}
						<NumberField
							value={finalProductPrice || 0}
							className="text-3xl text-destructive"
						/>
						{/* rating */}
						<StarRating
							value={4}
							iconProps={{ className: 'fill-yellow-500 stroke-yellow-500' }}
						/>
						{/* description  */}
						<p>
							A stylish ribbed modal T-shirt made with breathable fabric,
							perfect for everyday wear.
						</p>
						<Separator className="my-5" />
						{/* variant picker */}
						<div>
							<div className="mb-[15px]">
								Màu sắc:
								<span className="ms-3 font-bold">
									{selectedProductColor.name}
								</span>
							</div>
							<div className="flex flex-wrap items-center gap-[10px]">
								{product.variation &&
									product.variation.sort().map((single) => (
										<React.Fragment key={single.color.id}>
											<input
												type="radio"
												id={single.color.id as string}
												className="!absolute -m-[1px] h-[1px] w-[1px] overflow-hidden border-none p-0"
												style={{
													clip: 'rect(0 0 0 0)',
													wordWrap: 'normal',
												}}
												checked={single.color.id === selectedProductColor.id}
												onChange={() => {
													setSelectedProductColor(single.color)
													setSelectedProductSize(single.size[0])
													setProductStock(single.size[0].stock)
													setQuantityCount(1)
												}}
											/>
											<label
												htmlFor={single.color.id as string}
												className={cn(
													'relative h-[36px] w-[36px] cursor-pointer !rounded-[60px] border border-transparent p-[5px] text-center font-[400] leading-[22.4px] transition-[all_0.3s_ease]',
													single.color.id === selectedProductColor.id &&
														'border-primary shadow-[0_0.4rem_0.4rem_rgba(0,0,0,0.102)]',
												)}
											>
												<span
													className="block h-full w-full rounded-full border border-[#8787871E]"
													style={{
														backgroundColor: single.color.code,
													}}
												/>
											</label>
										</React.Fragment>
									))}
							</div>
						</div>
						{/* variant picker */}
						<div>
							<div className="mb-[15px]">
								Kích cỡ:
								<span className="ms-3 font-bold">
									{selectedProductSize.name}
								</span>
							</div>
							<div className="flex flex-wrap items-center gap-[10px]">
								{product.variation &&
									product.variation.sort().map(
										(single) =>
											single.color.id === selectedProductColor.id &&
											single.size.map((size) => (
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
											)),
									)}
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
						<Separator />
						<ProductDetailInfo />
					</div>
				</div>

				{/* product description */}
				<ProductDetailTabs product={product} />

				{/* related */}
				<div className="mb-[60px] flex flex-col items-center px-[15px]">
					<span className="text-[42px] leading-[50.4px]">
						Có thể bạn sẽ thích
					</span>
				</div>
				<div className="grid grid-cols-4 gap-[30px] gap-y-[80px]">
					{products.map((product) => {
						return <ProductGridSingle product={product} key={product.id} />
					})}
				</div>
			</PageSection>
		</Fragment>
	)
}

export default ProductDetail
