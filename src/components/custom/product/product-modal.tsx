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
import { cn } from '@/lib/utils'
import { ProductClient } from '@/schemas/product.schema'
import { uniqBy } from 'lodash'
import {
	ArrowUpRight,
	Heart,
	Minus,
	Plus,
	ShoppingCart,
	Shuffle,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { NumberField } from '../number-field'

interface ProductModalProps {
	product: ProductClient
}

const ProductModal = ({
	product: { id, image, price, variation, name, description },
}: ProductModalProps) => {
	const sizes = uniqBy(
		variation.flatMap((v) => v.size.map((s) => s)),
		'id',
	)
	const colors = uniqBy(
		variation.map((v) => v.color),
		'id',
	)

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="aspect-square h-[42px] w-[42px] rounded-[3px] bg-background p-0 text-primary hover:text-background">
					<ShoppingCart size={18} />
				</Button>
			</DialogTrigger>
			<DialogContent className="flex gap-0 overflow-hidden p-0">
				<DialogTitle></DialogTitle>

				{/* image */}
				<Carousel className="w-1/2">
					<CarouselContent>
						{image.map((image, index) => (
							<CarouselItem key={index}>
								<Card className="shadow-none">
									<CardContent className="flex items-center justify-center p-0">
										<img src={image} alt="" />
									</CardContent>
								</Card>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="left-5" />
					<CarouselNext className="right-5" />
				</Carousel>
				{/* info */}
				<div className="flex w-1/2 flex-col gap-5 px-[40px] py-[50px]">
					<h3 className="text-3xl">{name}</h3>
					{/* price */}
					<NumberField
						value={price.min}
						className="text-3xl text-destructive"
					/>
					{/* rating */}
					<StarRating value={4} />
					{/* description  */}
					<p>{description}</p>
					<Separator className="my-5" />
					{/* color picker */}
					<div>
						<div className="mb-[15px]">
							Màu sắc:
							<span className="ms-3 font-bold">Xanh</span>
						</div>
						<div className="flex flex-wrap items-center gap-[10px]">
							{colors.map((color) => (
								<>
									<input
										type="radio"
										id={color.id as string}
										className="!absolute -m-[1px] h-[1px] w-[1px] overflow-hidden border-none p-0"
										style={{
											clip: 'rect(0 0 0 0)',
											wordWrap: 'normal',
										}}
									/>
									<label
										htmlFor={color.id as string}
										className={cn(
											'relative h-[36px] w-[36px] cursor-pointer !rounded-[60px] border border-transparent p-[5px] text-center font-[400] leading-[22.4px] transition-[all_0.3s_ease]',
											// color.id === 1 &&
											// 	'border-primary shadow-[0_0.4rem_0.4rem_rgba(0,0,0,0.102)]',
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
					{/* size picker */}
					<div>
						<div className="mb-[15px]">
							Kích cỡ:
							<span className="ms-3 font-bold">S</span>
						</div>
						<div className="flex flex-wrap items-center gap-[10px]">
							{sizes.map((size) => (
								<>
									<input
										type="radio"
										id={size.id as string}
										className="!absolute -m-[1px] h-[1px] w-[1px] overflow-hidden border-none p-0"
										style={{
											clip: 'rect(0 0 0 0)',
											wordWrap: 'normal',
										}}
									/>
									<label
										htmlFor={size.id as string}
										className={cn(
											'relative h-[38px] w-max min-w-[45px] cursor-pointer rounded-[3px] border border-[#8787871E] px-[15px] py-[7px] text-center font-[400] leading-[22.4px] transition-[all_0.3s_ease]',
											// size.id === 1 &&
											// 	'border-primary bg-primary text-white shadow-[0_0.4rem_0.4rem_rgba(0,0,0,0.102)]',
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
								value={price.min}
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

					{/* view full details */}
					<Link
						to={`/product-detail/${id}`}
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
