import { HeaderPlacholder } from '@/components/custom/header'
import { ProductGridSingle } from '@/components/custom/product/product-grid'
import { useCompareStore } from '@/shared/hooks/use-compare-store'
import { Fragment } from 'react'

const Compare = () => {
	const { compareItems } = useCompareStore()

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
						So sánh sản phẩm
					</div>
				</div>
			</div>

			<section className="container m-auto w-full pb-[70px] pt-[45px] ">
				<div className="grid grid-cols-4 gap-[30px] gap-y-[80px]">
					{compareItems.map((product) => {
						return <ProductGridSingle product={product} key={product.id} />
					})}
				</div>
			</section>
		</Fragment>
	)
}

export default Compare
