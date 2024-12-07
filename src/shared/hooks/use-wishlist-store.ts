import { AppToast } from '@/components/ui/toast'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WishlistItem {
	id: string
	// Add other properties as needed
}

export type WishlistState = {
	wishlistItems: WishlistItem[]
	addToWishlist: (item: WishlistItem) => void
	deleteFromWishlist: (id: string) => void
	deleteAllFromWishlist: () => void
}

export const useWishlistStore = create<WishlistState>()(
	persist(
		(set, get) => ({
			wishlistItems: [],

			addToWishlist: (item) => {
				const items = get().wishlistItems
				const isInWishlist = items.findIndex(
					(wishlistItem) => wishlistItem.id === item.id,
				)

				if (isInWishlist > -1) {
					AppToast.info('Sản phẩm đã có trong danh sách yêu thích')
				} else {
					set({
						wishlistItems: [...items, item],
					})
					AppToast.success('Đã thêm vào danh sách yêu thích')
				}
			},

			deleteFromWishlist: (id) => {
				set({
					wishlistItems: get().wishlistItems.filter((item) => item.id !== id),
				})
				AppToast.error('Đã xóa khỏi danh sách yêu thích')
			},

			deleteAllFromWishlist: () => {
				set({ wishlistItems: [] })
				AppToast.info('Đã làm mới danh sách yêu thích')
			},
		}),
		{ name: 'wishlist-store' }, // LocalStorage key
	),
)
