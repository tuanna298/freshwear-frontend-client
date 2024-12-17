import { HeaderPlacholder } from '@/components/custom/header'
import { NumberField } from '@/components/custom/number-field'
import ProductModal from '@/components/custom/product/product-modal'
import { useCompareStore } from '@/shared/hooks/use-compare-store'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Compare = () => {
	const { compareItems, deleteFromCompare } = useCompareStore()

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
						So sánh sản phẩm
					</div>
				</div>
			</div>

			<section className="block py-[100px]">
				<div className="container">
					<div className="overflow-x-scroll rounded-[2.5px] border">
						<div className="flex">
							<div className="relative min-w-[360px] border-r" />
							{compareItems.map((item) => (
								<div key={item.id} className="relative min-w-[360px] border-r">
									<div className="flex flex-col items-center px-[34px] py-[16px] text-center">
										<div
											className="w-fit cursor-pointer border-b text-[12px] leading-[19px] text-gray-500 no-underline"
											onClick={() => deleteFromCompare(item.id)}
										>
											Xóa
										</div>
										<Link
											to={`/product-detail/${item.id}`}
											className="w-full px-0 py-[18px] no-underline transition-[all_.3s_ease]"
										>
											<img
												src={
													item.image[0] || '/assets/img/other/placeholder.jpg'
												}
												alt={item.name}
												className="h-auto max-w-full align-middle"
											/>
										</Link>
										<Link
											to={`/product-detail/${item.id}`}
											className="max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-[16px] leading-[25.6px] no-underline transition-[all_.3s_ease]"
										>
											{item.name}
										</Link>
										<div className="mt-[10px] text-[16px] font-bold leading-[16px]">
											<NumberField
												value={item.price.min}
												className="font-bold text-destructive"
											/>
										</div>
										<div className="mb-[24px] mt-[21px] flex justify-center gap-[10px]">
											<ProductModal product={item} />
										</div>
									</div>
								</div>
							))}
						</div>
						<div className="flex">
							<div className="min-w-[360px] border-r border-t px-[34px] py-[16px]">
								Nhà cung cấp
							</div>
							{compareItems.map((item) => (
								<div
									key={item.id}
									className="relative flex min-w-[360px] flex-[1_1_0%] items-center justify-center border-r border-t px-[34px] py-[16px] text-center"
								>
									Freshwear
								</div>
							))}
						</div>
						<div className="flex">
							<div className="min-w-[360px] border-r bg-muted px-[34px] py-[16px]">
								Màu sắc
							</div>
							{compareItems.map((item) => (
								<div
									key={item.id}
									className="relative flex min-w-[360px] flex-[1_1_0%] items-center justify-center border-r bg-muted px-[34px] py-[16px] text-center"
								>
									{item.variation.map((v) => v.color.name).join(', ')}
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</Fragment>
	)
}

export default Compare
