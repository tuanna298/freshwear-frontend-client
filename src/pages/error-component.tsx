import { HeaderPlacholder } from '@/components/custom/header'
import { Button } from '@/components/ui/button'
import { Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorComponent = () => {
	const navigate = useNavigate()

	const goHome = () => {
		navigate('/')
	}

	return (
		<React.Fragment>
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
						404
					</div>
				</div>
			</div>

			<Result
				status="404"
				title="404"
				subTitle="Xin lỗi, trang bạn đang tìm kiếm không tồn tại."
				extra={<Button onClick={goHome}>Về trang chủ</Button>}
			/>
		</React.Fragment>
	)
}

export default ErrorComponent
