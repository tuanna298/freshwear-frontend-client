import { AppToast } from '@/components/ui/toast'
import { ProductClient } from '@/schemas/product.schema'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CompareState = {
	compareItems: ProductClient[]
	addToCompare: (item: ProductClient) => void
	deleteFromCompare: (id: string) => void
	deleteAll: () => void
}

export const useCompareStore = create<CompareState>()(
	persist(
		(set) => ({
			compareItems: [],

			addToCompare: (item) => {
				set((state) => ({
					compareItems: [...state.compareItems, item],
				}))
				AppToast.success('Đã thêm vào danh sách so sánh')
			},

			deleteFromCompare: (id) => {
				set((state) => ({
					compareItems: state.compareItems.filter((item) => item.id !== id),
				}))
				AppToast.error('Đã xóa khỏi danh sách so sánh')
			},

			deleteAll: () => {
				set(() => ({
					compareItems: [],
				}))
				AppToast.error('Đã xóa tất cả khỏi danh sách so sánh')
			},
		}),
		{ name: 'compare-store' }, // LocalStorage key
	),
)
