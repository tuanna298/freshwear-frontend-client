import { HeaderPlacholder } from '@/components/custom/header'
import PopConfirm from '@/components/custom/pop-confirm'
import { cn } from '@/lib/utils'
import { useLogout } from '@refinedev/core'
import { Fragment } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const titleMap = {
	'/my-account': 'Tài khoản của tôi',
	'/my-account/orders': 'Đơn hàng của tôi',
	'/my-account/profile': 'Cập nhật thông tin',
}

const MyAccount = () => {
	const { mutate: logout } = useLogout()
	const location = useLocation()

	// Helper function to determine if a link is active
	const isActive = (path: string) => location.pathname.includes(path)

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
						{titleMap[location.pathname as keyof typeof titleMap]}
					</div>
				</div>
			</div>

			<section className="container m-auto w-full p-[70px]">
				<div className="flex flex-row justify-between">
					<div className="w-[30%] px-[15px]">
						<ul className="sticky top-0 mb-0 flex list-none flex-col gap-[10px] ps-0">
							<li className="mb-0 ms-0 list-none">
								<Link
									to="/my-account"
									className={cn(
										'relative flex w-full rounded-[3px] border px-[20px] py-[15px] text-[16px] font-bold leading-[20px] no-underline transition-[all_0.3s_ease] focus:text-destructive',
										location.pathname === '/my-account'
											? 'border-transparent bg-muted text-destructive'
											: 'border',
									)}
								>
									Tổng quan
								</Link>
							</li>

							<li className="mb-0 ms-0 list-none">
								<Link
									to="/my-account/orders"
									className={cn(
										'relative flex w-full rounded-[3px] border px-[20px] py-[15px] text-[16px] font-bold leading-[20px] no-underline transition-[all_0.3s_ease] focus:text-destructive',
										isActive('/my-account/orders')
											? 'border-transparent bg-muted text-destructive'
											: 'border',
									)}
								>
									Đơn hàng
								</Link>
							</li>

							<li className="mb-0 ms-0 list-none">
								<Link
									to="/my-account/profile"
									className={cn(
										'relative flex w-full rounded-[3px] border px-[20px] py-[15px] text-[16px] font-bold leading-[20px] no-underline transition-[all_0.3s_ease] focus:text-destructive',
										isActive('/my-account/profile')
											? 'border-transparent bg-muted text-destructive'
											: 'border',
									)}
								>
									Thông tin tài khoản
								</Link>
							</li>

							<li className="mb-0 ms-0 list-none">
								<PopConfirm
									title="Bạn có chắc chắn muốn đăng xuất không?"
									onConfirm={() => logout()}
									okText="Có"
									showCancel={false}
								>
									<Link
										to="#"
										className={cn(
											'relative flex w-full rounded-[3px] border px-[20px] py-[15px] text-[16px] font-bold leading-[20px] no-underline transition-[all_0.3s_ease] focus:text-destructive',
										)}
									>
										Đăng xuất
									</Link>
								</PopConfirm>
							</li>
						</ul>
					</div>
					<div className="w-[70%] px-[15px]">
						<Outlet />
					</div>
				</div>
			</section>
		</Fragment>
	)
}

export default MyAccount
