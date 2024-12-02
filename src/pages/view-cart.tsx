import { HeaderPlacholder } from '@/components/custom/header'
import { NumberField } from '@/components/custom/number-field'
import { ProductGridSingle } from '@/components/custom/product-grid'
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'
import { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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

const ViewCart = () => {
	const navigate = useNavigate()

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
						Giỏ hàng
					</div>
				</div>
			</div>

			{/* content */}
			<section className="m-auto w-full max-w-[1540px] px-[50px] pb-[70px] pt-[80px]">
				<table className="w-full border-collapse border-spacing-0 leading-[1.4]">
					<thead>
						<tr className="border-b">
							<th className="px-0 py-[18px] text-start text-base font-bold">
								Sản phẩm
							</th>
							<th className="px-0 py-[18px] text-center text-base font-bold">
								Giá
							</th>
							<th className="px-0 py-[18px] text-center text-base font-bold">
								Số lượng
							</th>
							<th className="px-0 py-[18px] text-end text-base font-bold">
								Thành tiền
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className="w-full border-b">
							{/* product info */}
							<td className="flex px-[10px] py-[18px] ps-0 text-start">
								<Link
									to={'product-detail/1'}
									className="mr-[24px] inline-block max-h-[110px] w-[80px] cursor-pointer overflow-hidden rounded-[2.5px] text-primary no-underline transition-[all_0.3s_ease]"
								>
									<img
										src="https://picsum.photos/700/1000"
										alt="img-product"
										className="h-auto max-w-full align-middle text-transparent"
									/>
								</Link>

								{/* cart info */}
								<div>
									<Link
										to={'/product-detail/1'}
										className="cursor-pointer text-[14px] leading-[19.6px] text-primary transition-[all_0.3s_ease]"
									>
										Product name
									</Link>
									<div className="mt-[6px] block text-[12px] leading-[16.8px] text-primary/50">
										Color / Size
									</div>
									<span className="mt-[6px] block cursor-pointer text-[12px] leading-[16.8px] underline transition-[all_0.3s_ease]">
										Xoá
									</span>
								</div>
							</td>
							{/* price */}
							<td className="px-[10px] py-[18px]">
								<NumberField
									className="flex flex-wrap justify-center gap-[10px] self-center leading-[1]"
									value={0}
								/>
							</td>
							{/* quantity */}
							<td className="px-[10px] py-[18px]">
								<div className="flex flex-wrap justify-center gap-[10px] self-center leading-[1]">
									<div className="flex h-[30px] w-[86px] justify-between overflow-hidden rounded-[3px] bg-[#f2f2f2]">
										<span className="flex h-[30px] w-[25px] cursor-pointer items-center justify-center text-[24px] leading-[25px] transition-[all_0.3s_ease]">
											<Minus size={16} />
										</span>
										<input
											type="text"
											min={1}
											value={1}
											name="number"
											className="h-[30px] w-[30px] border-0 bg-transparent p-0 text-center text-[14px] font-bold leading-[16.8px]"
										/>
										<span className="flex h-[30px] w-[25px] cursor-pointer items-center justify-center leading-[25px] transition-[all_0.3s_ease]">
											<Plus size={16} />
										</span>
									</div>
								</div>
							</td>
							{/* total */}
							<td className="px-[10px] py-[18px] pr-0 text-end">
								<div className="flex min-w-[60px] flex-wrap items-center justify-end gap-[10px] font-[600] leading-[1]">
									<NumberField value={0} />
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				<div className="mt-[15px] flex w-full justify-between">
					<Button
						className="rounded-[3px]"
						variant="outline"
						onClick={() => navigate('/shop')}
					>
						Tiếp tục mua hàng
					</Button>

					<Button className="rounded-[3px]" onClick={() => navigate('/shop')}>
						Làm mới giỏ hàng
					</Button>
				</div>

				{/* related */}
				<div className="mb-[60px] mt-[60px] flex flex-col items-center px-[15px]">
					<span className="text-[42px] leading-[50.4px]">
						Có thể bạn sẽ thích
					</span>
				</div>
				<div className="grid grid-cols-4 gap-[30px] gap-y-[80px]">
					{products.map((product) => {
						return <ProductGridSingle product={product} key={product.id} />
					})}
				</div>
			</section>
		</Fragment>
	)
}

export default ViewCart
