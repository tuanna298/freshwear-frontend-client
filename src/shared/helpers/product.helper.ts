import { Color } from '@/schemas/color.schema'
import {
	Product,
	ProductClient,
	ProductDetail,
	SizeClient,
	Variation,
} from '@/schemas/product.schema'

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
	const variations: Variation[] = []
	const images: string[] = product.thumbnail ? [product.thumbnail] : []
	let minPrice = Number.MAX_SAFE_INTEGER
	let maxPrice = Number.MIN_SAFE_INTEGER
	const thresholdInMilliseconds = 7 * 24 * 60 * 60 * 1000
	const currentTime = new Date().getTime()
	const isNew = product.created_at
		? currentTime - new Date(product.created_at).getTime() <
			thresholdInMilliseconds
		: false

	product?.details?.forEach((detail) => {
		if (detail.image) {
			images.push(detail.image)
			const existingVariation = variations.find(
				(v) => v.color.id === detail.color.id,
			)
			if (existingVariation) {
				existingVariation.size.push(
					mapSizeToSizeClient(detail as ProductDetail),
				)
				existingVariation.image.push(detail.image)

				minPrice = Math.min(minPrice, detail.price)
				maxPrice = Math.max(maxPrice, detail.price)
			} else {
				const newVariation: Variation = {
					color: detail.color as Color,
					image: [detail.image].filter(Boolean),
					size: [mapSizeToSizeClient(detail as ProductDetail)],
				}
				variations.push(newVariation)

				minPrice = Math.min(minPrice, detail.price)
				maxPrice = Math.max(maxPrice, detail.price)
			}
		}
	})

	if (product?.details?.length === 0) {
		minPrice = 0
		maxPrice = 0
	}

	return {
		id: product.id!,
		code: product.code,
		name: product.name,
		price: {
			min: minPrice,
			max: maxPrice,
		},
		sale_count: product.sale_count,
		average_rating: product.average_rating,
		new: isNew,
		variation: variations,
		image: images,
		description: product.description!,
	}
}

export default class ProductHelper {
	static transform = (products: Product[]) => {
		return products.map(mapProductResponseToClient).map((product) => {
			product.image.sort()

			product.variation.sort((a, b) => a.color.name.localeCompare(b.color.name))

			product?.variation?.forEach((variation) => {
				variation.size.sort((a, b) => a.name.localeCompare(b.name))
			})

			product?.variation?.forEach((variation) => {
				variation.image.sort()
			})

			return product
		})
	}
}
