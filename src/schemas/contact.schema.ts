import { z } from 'zod'

export const contactSchema = z.object({
	name: z.string().min(1, 'Tên là bắt buộc'),
	email: z.string().email('Email không hợp lệ'),
	message: z.string().min(1, 'Tin nhắn là bắt buộc'),
})

export type ContactFormValues = z.infer<typeof contactSchema>
