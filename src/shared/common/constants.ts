export const NODE_ENV = import.meta.env.NODE_ENV
export const API_URL = import.meta.env.VITE_BASE_API_URL
export const APP_NAME = import.meta.env.VITE_APP_NAME

export const API_PATHS = {
	AUTH: {
		BASE: '/auth',
		SIGN_IN: '/sign-in',
		SIGN_OUT: '/sign-out',
		ME: {
			BASE: '/me',
			UPDATE_PROFILE: '/me/update-profile',
			CHANGE_PASSWORD: '/me/change-password',
		},
	},
	USER: {
		BASE: '/user',
	},
	COLOR: {
		BASE: '/color',
	},
	BRAND: {
		BASE: '/brand',
	},
	MATERIAL: {
		BASE: '/material',
	},
	SIZE: {
		BASE: '/size',
	},
	PRODUCT: {
		BASE: '/product',
	},
	REVIEW: {
		BASE: '/review',
	},
	ORDER: {
		BASE: '/order',
	},
	PAYMENT: {
		BASE: '/payment',
	},
}

export const ROUTE_PATHS = {
	ROOT: '/',
	SIGN_IN: '/sign-in',
}

export const RESOURCE_MAP: Record<string, string> = {
	'': 'Trang chủ',
	'sign-in': 'Đăng nhập',
	user: 'Người dùng',
	color: 'Màu sắc',
	brand: 'Thương hiệu',
	material: 'Chất liệu',
	size: 'Kích thước',
	product: 'Sản phẩm',
	review: 'Đánh giá',
	order: 'Đơn hàng',
	payment: 'Thanh toán',
	undefined: 'Dữ liệu',
}

export const ACTION_MAP: Record<string, string> = {
	create: 'Thêm mới',
	edit: 'Chỉnh sửa',
	update: 'Cập nhật',
	delete: 'Xóa',
	undefined: 'Thao tác',
}
