import { Color } from '@/schemas/color.schema'
import {
	Product,
	ProductClient,
	ProductDetail,
	SizeClient,
	Variation,
} from '@/schemas/product.schema'
import { CartItem } from '../hooks/use-cart-store'

const mapSizeToSizeClient = (detail: ProductDetail): SizeClient => {
	return {
		id: detail.size?.id || '',
		name: detail.size?.name || '',
		stock: detail.quantity || 0,
		price: detail.price,
		sale_count: 0,
		product_detail_id: detail.id!,
	}
}

const mapProductResponseToClient = (product: Product): ProductClient => {
	if (!product) return {} as ProductClient

	const variations: Variation[] = []
	const images: string[] = product?.thumbnail ? [product.thumbnail] : []
	let minPrice = Number.MAX_SAFE_INTEGER
	let maxPrice = Number.MIN_SAFE_INTEGER
	const thresholdInMilliseconds = 7 * 24 * 60 * 60 * 1000
	const currentTime = new Date().getTime()
	const isNew = product?.created_at
		? currentTime - new Date(product?.created_at).getTime() <
			thresholdInMilliseconds
		: false

	product?.details?.forEach((detail) => {
		const existingVariation = variations.find(
			(v) => v.color.id === detail.color.id,
		)

		if (existingVariation) {
			existingVariation.size.push(mapSizeToSizeClient(detail as ProductDetail))
			if (detail.image) {
				existingVariation.image.push(detail.image)
				images.push(detail.image)
			}

			minPrice = Math.min(minPrice, detail.price)
			maxPrice = Math.max(maxPrice, detail.price)
		} else {
			const newVariation: Variation = {
				color: detail.color as Color,
				image: detail.image ? [detail.image] : [],
				size: [mapSizeToSizeClient(detail as ProductDetail)],
			}
			if (detail.image) {
				images.push(detail.image)
			}
			variations.push(newVariation)

			minPrice = Math.min(minPrice, detail.price)
			maxPrice = Math.max(maxPrice, detail.price)
		}
	})

	if (product?.details?.length === 0) {
		minPrice = 0
		maxPrice = 0
	}

	const reviews = product.reviews
	let average_rating = 0
	if (reviews && reviews.length > 0) {
		const totalRating: number = reviews.reduce(
			(sum: number, review: { rating: number }) => sum + review.rating,
			0,
		)
		average_rating = totalRating / reviews.length
	}

	return {
		id: product?.id!,
		code: product?.code,
		name: product?.name,
		price: {
			min: minPrice,
			max: maxPrice,
		},
		sale_count: product.sale_count,
		average_rating,
		new: isNew,
		variation: variations,
		image: images,
		description: product.description!,
	}
}

export default class ProductHelper {
	static transform = (products: Product[]) => {
		return products.map(mapProductResponseToClient).map((product) => {
			if (!product) return {} as ProductClient
			;(product?.image ?? []).sort()
			;(product?.variation || []).sort((a, b) =>
				a.color.name.localeCompare(b.color.name),
			)

			product?.variation?.forEach((variation) => {
				variation.size.sort((a, b) => a.name.localeCompare(b.name))
			})

			product?.variation?.forEach((variation) => {
				variation.image.sort()
			})

			return product
		})
	}

	static getProductCartQuantity = (
		items: CartItem[],
		product: ProductClient,
		selectedProductColor: Color,
		selectedProductSize: SizeClient,
	): number => {
		const productInCart = items.find((single) => {
			return (
				single.cartItemId === product.id &&
				(single.color ? single.color.id === selectedProductColor.id : true) &&
				(single.size ? single.size.id === selectedProductSize.id : true)
			)
		})

		if (items.length >= 1 && productInCart) {
			if (product.variation) {
				return (
					items.find((single) => {
						return (
							single.cartItemId === product.id &&
							single.color.id === selectedProductColor.id &&
							single.size.id === selectedProductSize.id
						)
					})?.quantity || 0
				)
			} else {
				return (
					items.find((single: any) => {
						return product.id === single.cartItemId
					})?.quantity || 0
				)
			}
		} else {
			return 0
		}
	}

	static getTotalCartQuantity = (cartItems: CartItem[]): number => {
		if (cartItems.length >= 1) {
			// Using reduce to calculate the total quantity
			return cartItems.reduce((totalQuantity, currentItem) => {
				return totalQuantity + currentItem.quantity
			}, 0)
		} else {
			return 0
		}
	}

	static getTotalCartPrice = (cartItems: CartItem[]): number => {
		if (cartItems.length >= 1) {
			// Using reduce to calculate the total price
			return cartItems.reduce((totalPrice, currentItem) => {
				return totalPrice + currentItem.size.price * currentItem.quantity
			}, 0)
		} else {
			return 0
		}
	}
}
