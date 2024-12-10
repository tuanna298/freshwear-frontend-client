import ZodUtil from '@/lib/zod.util'
import { BaseDTO } from '@/shared/common/interfaces'
import { z } from 'zod'

export enum PaymentMethod {
	CASH = 'CASH',
	TRANSFER = 'TRANSFER',
}
export const orderSchema = z.object({
	id: z.string().optional().nullable(),
	address: z.string(),
	phone_number: z.string(),
	email: z.string(),
	full_name: z.string(),
	note: z.string().optional().nullable(),
	method: z.nativeEnum(PaymentMethod).default(PaymentMethod.CASH),
	cartItems: z.array(z.object({})),
})

export const orderDefaultValues = ZodUtil.getDefaults(orderSchema)
export type Order = BaseDTO & z.infer<typeof orderSchema>

export const ORDER_FIELDS = orderSchema.keyof().enum
