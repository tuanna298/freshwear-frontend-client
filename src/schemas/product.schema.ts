import ZodUtil from '@/lib/zod.util'
import { BaseDTO } from '@/shared/common/interfaces'
import { z } from 'zod'
import { Attribute, attributeSchema } from './attribute.schema'
import { Color, colorSchema } from './color.schema'

export const productDetailSchema = z.object({
	id: z.string().optional().nullable(),
	price: z.number(),
	image: z.string().optional().nullable(),
	quantity: z.number(),
	color: colorSchema,
	size: attributeSchema,
})

export const productSchema = z.object({
	id: z.string().optional().nullable(),
	code: z
		.string({
			required_error: 'Vui lòng nhập mã sản phẩm',
		})
		.min(1, 'Vui lòng nhập mã sản phẩm'),
	name: z
		.string({
			required_error: 'Vui lòng nhập tên sản phẩm',
		})
		.min(1, 'Vui lòng nhập tên sản phẩm'),
	description: z.string().optional().nullable(),
	thumbnail: z.string().optional().nullable(),
	brand: attributeSchema.optional().nullable(),
	material: attributeSchema.optional().nullable(),
	details: z.array(productDetailSchema).optional().nullable().default([]),
})

export const productDefaultValues = ZodUtil.getDefaults(productSchema)
export type Product = BaseDTO & z.infer<typeof productSchema>
export type ProductDetail = BaseDTO & z.infer<typeof productDetailSchema>

export const PRODUCT_FIELDS = productSchema.keyof().enum

export type ProductClient = {
	id: string
	code: string
	name: string
	price: {
		min: number
		max: number
	}
	sale_count: number
	average_rating: number
	new: boolean
	variation: Variation[]
	image: string[]
	description: string
}

export interface Variation {
	color: Color
	image: string[]
	size: Attribute[]
}

export interface SizeClient {
	id: string
	name: string
	stock: number
	price: number
	sale_count: number
	product_detail_id: string
}
