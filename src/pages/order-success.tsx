import { HeaderPlacholder } from '@/components/custom/header'
import { Button } from '@/components/ui/button'
import { CircleCheck } from 'lucide-react'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

const OrderSuccess = () => {
	const navigate = useNavigate()

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
						Thành công
					</div>
				</div>
			</div>

			{/* content */}
			<section className="container m-auto w-full pb-[70px] pt-[80px]">
				<div className="text-center">
					<CircleCheck size={96} className="mx-auto mb-3 text-green-500" />
					<h1 className="mb-[20px] text-[30px] font-[700]">
						Cảm ơn bạn đã đặt hàng
					</h1>
					<p className="mb-[20px] text-[16px] text-[#666]">
						Chúng tôi sẽ liên hệ với bạn sớm nhất có thể
					</p>
					<Button
						className="h-full flex-grow rounded-[3px] px-[24px] py-[14px] text-center text-base font-semibold transition-[all_0.3s_ease]"
						onClick={() =>
							navigate('/', {
								preventScrollReset: false,
							})
						}
					>
						Tiếp tục mua sắm
					</Button>
				</div>
			</section>
		</Fragment>
	)
}

export default OrderSuccess
