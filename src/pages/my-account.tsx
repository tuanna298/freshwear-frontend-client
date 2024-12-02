import { HeaderPlacholder } from '@/components/custom/header'
import { cn } from '@/lib/utils'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

const MyAccount = () => {
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
						Tài khoản của tôi
					</div>
				</div>
			</div>

			<section className="m-auto mt-[80px] w-full max-w-[1540px] px-[50px] pb-[70px]">
				<div className="flex flex-row justify-between">
					<div className="w-[30%] px-[15px]">
						<ul className="sticky top-0 mb-0 flex list-none flex-col gap-[10px] ps-0">
							<li className="mb-0 ms-0 list-none">
								<Link
									to="my-account"
									className={cn(
										'relative flex w-full rounded-[3px] border px-[20px] py-[15px] text-[16px] font-bold leading-[20px] no-underline transition-[all_0.3s_ease]',
										// active class
										'border-transparent bg-muted text-destructive',
									)}
								>
									Tổng quan
								</Link>
							</li>

							<li className="mb-0 ms-0 list-none">
								<Link
									to="my-account"
									className={cn(
										'relative flex w-full rounded-[3px] border px-[20px] py-[15px] text-[16px] font-bold leading-[20px] no-underline transition-[all_0.3s_ease]',
									)}
								>
									Đơn hàng
								</Link>
							</li>

							<li className="mb-0 ms-0 list-none">
								<Link
									to="my-account"
									className={cn(
										'relative flex w-full rounded-[3px] border px-[20px] py-[15px] text-[16px] font-bold leading-[20px] no-underline transition-[all_0.3s_ease]',
									)}
								>
									Thông tin tài khoản
								</Link>
							</li>

							<li className="mb-0 ms-0 list-none">
								<Link
									to="my-account"
									className={cn(
										'relative flex w-full rounded-[3px] border px-[20px] py-[15px] text-[16px] font-bold leading-[20px] no-underline transition-[all_0.3s_ease]',
									)}
								>
									Đăng xuất
								</Link>
							</li>
						</ul>
					</div>
					<div className="w-[70%] px-[15px]">
						<div className="mb-[60px]">
							<h5 className="mb-[20px] text-[28px] font-bold leading-[33.6px]">
								Xin chào, <span className="text-primary">Nguyễn Văn A</span>
							</h5>
							<p>
								Tại đây bạn có thể xem thông tin tài khoản, cập nhật thông tin
								cá nhân, xem lịch sử mua hàng và nhiều hơn nữa.
							</p>
						</div>
					</div>
				</div>
			</section>
		</Fragment>
	)
}

export default MyAccount
