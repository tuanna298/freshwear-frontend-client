import { AppToast } from '@/components/ui/toast'
import { getStorageKey } from '@/lib/utils'
import { Attribute } from '@/schemas/attribute.schema'
import { Color } from '@/schemas/color.schema'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
	id: string
	image: string
	name: string
	quantity: number
	color: Color
	size: Attribute
}

export type CartState = {
	items: CartItem[]
	add: (item: CartItem) => void
	delete: (id: string) => void
	decrease: (item: CartItem) => void
	deleteAll: () => void
}

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],

			add: (cartItem) => {
				const items = get().items

				const existingItem = items.find((item) => item.id === cartItem.id)

				const existtingItemCombinedId =
					existingItem?.id! + existingItem?.color?.id + existingItem?.size?.id

				if (!existingItem) {
					set({
						items: [
							...items,
							{
								...cartItem,
								quantity: cartItem.quantity ? cartItem.quantity : 1,
								id: cartItem.id,
							},
						],
					})
				} else if (
					existingItem &&
					(existingItem.color?.id !== cartItem.color?.id ||
						existingItem.size?.id !== cartItem.size?.id)
				) {
					set({
						items: [
							...items,
							{
								...cartItem,
								quantity: cartItem.quantity ? cartItem.quantity : 1,
								id: cartItem.id,
							},
						],
					})
				} else {
					set({
						items: items.map((item) =>
							item.id === existtingItemCombinedId
								? {
										...item,
										quantity: cartItem.quantity
											? item.quantity + cartItem.quantity
											: item.quantity + 1,
										color: cartItem.color,
										size: cartItem.size,
									}
								: item,
						),
					})
				}

				AppToast.success('Đã thêm vào giỏ hàng.')
			},

			delete: (id) => {
				set({
					items: get().items.filter((item) => item.id !== id),
				})
				AppToast.error('Đã xoá khỏi giỏ hàng.')
			},

			decrease: (cartItem) => {
				const items = get().items

				if (cartItem.quantity === 1) {
					set({
						items: items.filter((item) => item.id !== cartItem.id),
					})
					AppToast.error('Đã xoá khỏi giỏ hàng.')
				} else {
					set({
						items: items.map((item) =>
							item.id === cartItem.id
								? { ...item, quantity: item.quantity - 1 }
								: item,
						),
					})
					AppToast.warning('Số lượng sản phẩm đã được giảm trong giỏ hàng.')
				}
			},

			deleteAll: () => {
				set({ items: [] })
				AppToast.info('Đã làm mới giỏ hàng')
			},
		}),
		{ name: getStorageKey('cart-store') },
	),
)
