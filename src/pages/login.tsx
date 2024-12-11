import { HeaderPlacholder } from '@/components/custom/header'
import { Fragment } from 'react/jsx-runtime'

const Login = () => {
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
						Đăng nhập
					</div>
				</div>
			</div>

			{/* content */}
			<section className="container m-auto w-full pb-[70px] pt-[80px]">
				<div className="grid gap-[30px]">
					{/* login form */}
					<div className="mx-auto my-0"></div>
					{/* login content */}
				</div>
			</section>
		</Fragment>
	)
}

export default Login
