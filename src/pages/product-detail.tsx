import { HeaderPlacholder } from '@/components/custom/header'
import { NumberField } from '@/components/custom/number-field'
import { PageSection } from '@/components/custom/page'
import { ProductGridSingle } from '@/components/custom/product-grid'
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
import { cn } from '@/lib/utils'
import {
	CircleSlash2,
	Dam,
	Flame,
	Heart,
	Minus,
	Plus,
	Ship,
	Shuffle,
	Star,
	UndoDot,
	WashingMachine,
} from 'lucide-react'
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
]

const product = {
	id: 1,
	title: 'Ribbed Modal T-shirt',
	price: 18.95,
	originalPrice: 25.0,
	discount: 20,
	description:
		'A stylish ribbed modal T-shirt made with breathable fabric, perfect for everyday wear.',
	colors: [
		{ id: 1, name: 'Black', code: '#000000' },
		{ id: 2, name: 'Beige', code: '#D1B085' },
		{ id: 3, name: 'Light Blue', code: '#C7D7F2' },
	],
	sizes: [
		{
			id: 1,
			name: 'S',
		},
		{
			id: 2,
			name: 'M',
		},
		{
			id: 3,
			name: 'L',
		},
		{
			id: 4,
			name: 'XL',
		},
	],
	stock: {
		S: 10,
		M: 15,
		L: 8,
		XL: 5,
	},
	images: [
		'https://picsum.photos/700/1000',
		'https://picsum.photos/700/1000',
		'https://picsum.photos/700/1000',
		'https://picsum.photos/700/1000',
	],
}

export const ProductDetail = () => {
	return (
		<Fragment>
			<HeaderPlacholder />
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
								<BreadcrumbPage>Product title</BreadcrumbPage>
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
							{Array.from({ length: 10 }).map((_, index) => (
								<SliderThumbItem
									key={index}
									index={index}
									className="rounded-md bg-transparent p-0"
								>
									<span className="flex h-full w-full cursor-pointer items-center justify-center rounded-md border border-muted bg-background">
										Slide {index + 1}
									</span>
								</SliderThumbItem>
							))}
						</CarouselThumbsContainer>
						<div className="relative flex-grow basis-3/4">
							<CarouselMainContainer className="h-[1000px]">
								{Array.from({ length: 10 }).map((_, index) => (
									<SliderMainItem
										key={index}
										className="flex items-center justify-center rounded-md border border-muted"
									>
										Slide {index + 1}
									</SliderMainItem>
								))}
							</CarouselMainContainer>
						</div>
					</Carousel>
					<div className="flex flex-col gap-5">
						<h3 className="text-3xl">Product name</h3>

						{/* price */}
						<NumberField
							value={product.price}
							className="text-3xl text-destructive"
						/>
						{/* rating */}
						<StarRating
							value={4}
							iconProps={{ className: 'fill-yellow-500 stroke-yellow-500' }}
							icon={Star}
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
								<span className="ms-3 font-bold">Xanh</span>
							</div>
							<div className="flex flex-wrap items-center gap-[10px]">
								{product.colors.map((color) => (
									<>
										<input
											type="radio"
											id={color.id.toString()}
											className="!absolute -m-[1px] h-[1px] w-[1px] overflow-hidden border-none p-0"
											style={{
												clip: 'rect(0 0 0 0)',
												wordWrap: 'normal',
											}}
										/>
										<label
											htmlFor={color.id.toString()}
											className={cn(
												'relative h-[36px] w-[36px] cursor-pointer !rounded-[60px] border border-transparent p-[5px] text-center font-[400] leading-[22.4px] transition-[all_0.3s_ease]',
												color.id === 1 &&
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
									</>
								))}
							</div>
						</div>
						{/* variant picker */}
						<div>
							<div className="mb-[15px]">
								Size:
								<span className="ms-3 font-bold">S</span>
							</div>
							<div className="flex flex-wrap items-center gap-[10px]">
								{product.sizes.map((size) => (
									<>
										<input
											type="radio"
											id={size.id.toString()}
											className="!absolute -m-[1px] h-[1px] w-[1px] overflow-hidden border-none p-0"
											style={{
												clip: 'rect(0 0 0 0)',
												wordWrap: 'normal',
											}}
										/>
										<label
											htmlFor={size.id.toString()}
											className={cn(
												'relative h-[38px] w-max min-w-[45px] cursor-pointer rounded-[3px] border border-[#8787871E] px-[15px] py-[7px] text-center font-[400] leading-[22.4px] transition-[all_0.3s_ease]',
												size.id === 1 &&
													'border-primary bg-primary text-white shadow-[0_0.4rem_0.4rem_rgba(0,0,0,0.102)]',
											)}
										>
											{size.name}
										</label>
									</>
								))}
							</div>
						</div>

						{/* quantity */}
						<div>
							<div className="mb-[5px] !font-[600]">Số lượng</div>
							<div className="flex w-32 justify-between overflow-hidden rounded-[3px] bg-[#f2f2f2]">
								<span className="flex h-[46px] w-[38px] cursor-pointer items-center justify-center text-primary transition-[all_0.3s_ease] hover:text-destructive">
									<Minus size={16} />
								</span>
								<input
									type="text"
									min={1}
									value={1}
									className="h-[46px] w-[51px] border-0 bg-transparent p-0 text-center text-[16px] font-[600px] leading-[26px] text-primary"
								/>
								<span className="flex h-[46px] w-[38px] cursor-pointer items-center justify-center text-primary transition-[all_0.3s_ease] hover:text-destructive">
									<Plus size={16} />
								</span>
							</div>
						</div>

						{/* buy button */}
						<div className="flex flex-wrap gap-[8px]">
							<Button className="h-full flex-grow rounded-[3px] px-[24px] py-[14px] text-center text-base font-semibold transition-[all_0.3s_ease]">
								Thêm vào giỏ -{' '}
								<NumberField
									className="text-base font-semibold"
									value={product.price}
								/>
							</Button>
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
						<div className="grid grid-cols-2 gap-10">
							<div className="flex flex-col items-center gap-[16px] rounded-[2.5px] border px-[28px] py-[30px] text-center text-sm">
								<Ship />
								<p>
									Thời gian giao hàng dự kiến:{' '}
									<span className="font-bold">2-3 ngày</span>,{' '}
									<span className="font-bold text-destructive">miễn phí</span>{' '}
									vận chuyển cho{' '}
									<span className="font-bold">toàn bộ đơn hàng</span>
								</p>
							</div>
							<div className="flex flex-col items-center gap-[16px] rounded-[2.5px] border px-[28px] py-[30px] text-center text-sm">
								<UndoDot />
								<p>
									Hoàn trả trong vòng <span className="font-bold">30 ngày</span>{' '}
									kể từ ngày mua hàng. Không bao gồm thuế và các chi phí.
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* product description */}
				<div className="mb-[80px] border">
					{/* menu tab */}
					<ul className="mx-[38px] my-0 flex list-none gap-[50px] gap-y-[10px] overflow-x-auto border-b ps-0">
						<li
							className={cn(
								'relative mb-0 cursor-pointer list-none px-0 py-[15px] text-[18px] font-[600] leading-[30px]',
								// active tab
								'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary after:transition-[all_0.3s_ease] after:content-[""]',
							)}
						>
							Mô tả
						</li>
						<li
							className={cn(
								'relative mb-0 cursor-pointer list-none px-0 py-[15px] text-[18px] font-[600] leading-[30px]',
							)}
						>
							Đánh giá
						</li>
						<li
							className={cn(
								'relative mb-0 cursor-pointer list-none px-0 py-[15px] text-[18px] font-[600] leading-[30px]',
							)}
						>
							Vận chuyển
						</li>
						<li
							className={cn(
								'relative mb-0 cursor-pointer list-none px-0 py-[15px] text-[18px] font-[600] leading-[30px]',
							)}
						>
							Chính sách
						</li>
					</ul>
					{/* content tab */}
					<div className="relative overflow-hidden">
						<div
							className={cn(
								'pointer-events-none invisible absolute left-0 right-0 top-0 z-[1] block transform p-[35px] opacity-0 duration-200 ease-in',
								// active tab
								'transfrom-none pointer-events-auto visible relative z-[2] opacity-100 delay-300 duration-300 ease-out',
							)}
						>
							<div>
								<p className="mb-[30px]">
									A stylish ribbed modal T-shirt made with breathable fabric,
									perfect for everyday wear.
								</p>

								{/* features */}
								<div className="grid grid-cols-3 gap-[30px]">
									<div>
										<h3 className="mb-[22px] !text-[16px] !font-bold leading-[19px]">
											Đặc điểm
										</h3>
										<ul className="mb-[30px] mt-[15px] list-disc ps-0">
											<li className="relative mb-[15px] list-inside ps-[20px] text-sm leading-[25px] text-[#909090]">
												Front button placket
											</li>
											<li className="relative mb-[15px] list-inside ps-[20px] text-sm leading-[25px] text-[#909090]">
												Adjustable sleeve tabs
											</li>
											<li className="relative mb-[15px] list-inside ps-[20px] text-sm leading-[25px] text-[#909090]">
												Babaton embroidered crest at placket and hem
											</li>
										</ul>

										<h3 className="mb-[22px] !text-[16px] !font-bold leading-[19px]">
											Materials Care
										</h3>
										<ul className="mb-[30px] mt-[15px] list-disc ps-0">
											<li className="relative mb-[15px] list-inside ps-[20px] text-sm leading-[25px] text-[#909090]">
												Content: 100% LENZING™ ECOVERO™ Viscose
											</li>
											<li className="relative mb-[15px] list-inside ps-[20px] text-sm leading-[25px] text-[#909090]">
												Care: Hand wash
											</li>
											<li className="relative mb-[15px] list-inside ps-[20px] text-sm leading-[25px] text-[#909090]">
												Imported
											</li>
										</ul>
									</div>
									<div className="col-span-2">
										<h3 className="mb-[22px] !text-[16px] !font-bold leading-[19px]">
											Materials Care
										</h3>

										<div className="mb-[15px] flex items-center gap-[10px]">
											<div className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-primary">
												<WashingMachine size={16} />
											</div>
											<span className="text-sm text-[#909090]">
												Machine wash max. 30ºC. Short spin.
											</span>
										</div>
										<div className="mb-[15px] flex items-center gap-[10px]">
											<div className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-primary">
												<Flame size={16} />
											</div>
											<span className="text-sm text-[#909090]">
												Iron maximum 110ºC.
											</span>
										</div>
										<div className="mb-[15px] flex items-center gap-[10px]">
											<div className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-primary">
												<CircleSlash2 size={16} />
											</div>
											<span className="text-sm text-[#909090]">
												Do not bleach/bleach.
											</span>
										</div>
										<div className="mb-[15px] flex items-center gap-[10px]">
											<div className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-primary">
												<CircleSlash2 size={16} />
											</div>
											<span className="text-sm text-[#909090]">
												Do not dry clean.
											</span>
										</div>
										<div className="mb-[15px] flex items-center gap-[10px]">
											<div className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-primary">
												<Dam size={16} />
											</div>
											<span className="text-sm text-[#909090]">
												Tumble dry, medium hear.
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

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
