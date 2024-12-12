import { useAuthStore } from '@/shared/hooks/use-auth-store'

const MyAccountOverview = () => {
	const { profile } = useAuthStore()

	return (
		<div className="mb-[60px]">
			<h5 className="mb-[20px] text-[28px] font-bold leading-[33.6px]">
				Xin chào, <span className="text-primary">{profile?.full_name}</span>
			</h5>
			<p>
				Tại đây bạn có thể xem thông tin tài khoản, cập nhật thông tin cá nhân,
				xem lịch sử mua hàng và nhiều hơn nữa.
			</p>
		</div>
	)
}

export default MyAccountOverview
