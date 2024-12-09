import { HeaderPlacholder } from '@/components/custom/header'
import { ProductGridSingle } from '@/components/custom/product/product-grid'
import { Fragment } from 'react'

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

const Wishlist = () => {
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
						Danh sách yêu thích
					</div>
				</div>
			</div>

			<section className="container m-auto w-full pb-[70px] pt-[45px] ">
				<div className="grid grid-cols-4 gap-[30px] gap-y-[80px]">
					{products.map((product) => {
						return <ProductGridSingle product={product} key={product.id} />
					})}
				</div>
			</section>
		</Fragment>
	)
}

export default Wishlist
