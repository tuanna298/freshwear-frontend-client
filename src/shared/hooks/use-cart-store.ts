import { AppToast } from '@/components/ui/toast'
import { getStorageKey } from '@/lib/utils'
import { Color } from '@/schemas/color.schema'
import { SizeClient } from '@/schemas/product.schema'
import { v4 as uuidv4 } from 'uuid'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
	id: string
	cartItemId: string
	image: string
	name: string
	quantity: number
	color: Color
	size: SizeClient
}

export type CartState = {
	items: CartItem[]
	add: (item: CartItem) => void
	deleteOne: (id: string) => void
	decrease: (item: CartItem) => void
	deleteAll: () => void
}

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],

			add: (payload) => {
				const items = get().items

				const existingItem = items.find(
					(item) =>
						item.cartItemId === payload.cartItemId &&
						item.color?.id === payload.color?.id &&
						item.size?.id === payload.size?.id,
				)

				let addedSuccessfully = false // Biến kiểm soát hiển thị thông báo thành công

				if (!existingItem) {
					set({
						items: [
							...items,
							{
								...payload,
								quantity: payload.quantity ? payload.quantity : 1,
								cartItemId: payload.cartItemId,
								id: uuidv4(),
							},
						],
					})
					addedSuccessfully = true
				} else if (
					existingItem !== undefined &&
					(existingItem.color?.id !== payload.color?.id ||
						existingItem.size?.id !== payload.size?.id)
				) {
					set({
						items: [
							...items,
							{
								...payload,
								quantity: payload.quantity ? payload.quantity : 1,
								cartItemId: payload.cartItemId,
								id: uuidv4(),
							},
						],
					})
					addedSuccessfully = true
				} else {
					set({
						items: items.map((item) => {
							if (item.id === existingItem.id) {
								const newQuantity = payload.quantity
									? item.quantity + payload.quantity
									: item.quantity + 1

								if (newQuantity > item.size.stock) {
									AppToast.error('Sản phẩm đã vượt quá số lượng tồn kho.', {
										position: 'bottom-left',
									})
									return item
								}

								addedSuccessfully = true

								return {
									...item,
									quantity: newQuantity,
									color: payload.color,
									size: payload.size,
								}
							}
							return item
						}),
					})
				}

				if (addedSuccessfully) {
					AppToast.success('Đã thêm vào giỏ hàng.', { position: 'bottom-left' })
				}
			},
			deleteOne: (id) => {
				set({
					items: get().items.filter((item) => item.id !== id),
				})
				AppToast.error('Đã xoá khỏi giỏ hàng.', { position: 'bottom-left' })
			},

			decrease: (cartItem) => {
				const items = get().items

				if (cartItem.quantity === 1) {
					set({
						items: items.filter((item) => item.id !== cartItem.id),
					})
					AppToast.error('Đã xoá khỏi giỏ hàng.', { position: 'bottom-left' })
				} else {
					set({
						items: items.map((item) =>
							item.id === cartItem.id
								? { ...item, quantity: item.quantity - 1 }
								: item,
						),
					})
					AppToast.warning('Số lượng sản phẩm đã được giảm trong giỏ hàng.', {
						position: 'bottom-left',
					})
				}
			},

			deleteAll: () => {
				set({ items: [] })
				AppToast.info('Đã làm mới giỏ hàng', { position: 'bottom-left' })
			},
		}),
		{ name: getStorageKey('cart-store') },
	),
)
