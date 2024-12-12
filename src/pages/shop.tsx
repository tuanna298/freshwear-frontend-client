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
import { cn } from '@/lib/utils'
import { Product } from '@/schemas/product.schema'
import ProductHelper from '@/shared/helpers/product.helper'
import { HttpError, useList } from '@refinedev/core'
import { ListFilter } from 'lucide-react'
import { useState } from 'react'
import { Fragment } from 'react/jsx-runtime'

const Shop = () => {
	const [grid, setGrid] = useState<2 | 3 | 4 | 5 | 6>(4)
	const { data } = useList<Product, HttpError>({
		resource: 'product',
		pagination: {
			pageSize: 12,
		},
	})

	const products = data?.data ? ProductHelper.transform(data.data) : []

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
							<div
								className={cn(
									'grid cursor-pointer grid-cols-2 gap-1 transition-[all_0.3s_ease]',
								)}
								onClick={() => setGrid(2)}
							>
								<Dots
									count={4}
									color={(grid === 2 && '#000000') || undefined}
								/>
							</div>
							<div
								className="grid cursor-pointer grid-cols-3 gap-1 transition-[all_0.3s_ease]"
								onClick={() => setGrid(3)}
							>
								<Dots
									count={6}
									color={(grid === 3 && '#000000') || undefined}
								/>
							</div>
							<div
								className="grid cursor-pointer grid-cols-4 gap-1 transition-[all_0.3s_ease]"
								onClick={() => setGrid(4)}
							>
								<Dots
									count={8}
									color={(grid === 4 && '#000000') || undefined}
								/>
							</div>
							<div
								className="grid cursor-pointer grid-cols-5 gap-1 transition-[all_0.3s_ease]"
								onClick={() => setGrid(5)}
							>
								<Dots
									count={10}
									color={(grid === 5 && '#000000') || undefined}
								/>
							</div>
							<div
								className="grid cursor-pointer grid-cols-6 gap-1 transition-[all_0.3s_ease]"
								onClick={() => setGrid(6)}
							>
								<Dots
									count={12}
									color={(grid === 6 && '#000000') || undefined}
								/>
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

					<div className={`grid grid-cols-${grid} gap-[30px]`}>
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
