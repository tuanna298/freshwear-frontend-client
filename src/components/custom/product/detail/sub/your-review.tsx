import { Button } from '@/components/ui/button'
import {
	getErrorDetailMessage,
	getErrorSumaryMessage,
} from '@/lib/tanstack.util'
import { cn } from '@/lib/utils'
import { ProductClient } from '@/schemas/product.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreate } from '@refinedev/core'
import { useQueryClient } from '@tanstack/react-query'
import { Rate } from 'antd'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface Props {
	product: ProductClient
}

const reviewSchema = z.object({
	rating: z.number().int().min(1, 'Đánh giá là bắt buộc'),
	comment: z.string().min(1, 'Bình luận là bắt buộc'),
})

export type ReviewFormValues = z.infer<typeof reviewSchema>

const YourReview = ({ product }: Props) => {
	const queryClient = useQueryClient()
	const {
		register,
		handleSubmit,
		formState: { errors, touchedFields },
		setValue,
		reset,
		watch,
	} = useForm<ReviewFormValues>({
		resolver: zodResolver(reviewSchema),
	})

	const { mutate } = useCreate({
		resource: 'review',
		successNotification() {
			return {
				type: 'success',
				message: 'Cảm ơn bạn đã đánh giá sản phẩm!',
				description:
					'Đánh giá của bạn sẽ giúp người khác có cái nhìn chân thực hơn về sản phẩm này.',
			}
		},
		errorNotification(error: any) {
			const message = getErrorSumaryMessage(error)
			const detail = getErrorDetailMessage(error)

			return {
				type: 'error',
				message,
				description: detail,
			}
		},
	})

	const onSubmit = (data: ReviewFormValues) => {
		mutate(
			{
				values: {
					...data,
					product_id: product.id,
				},
			},
			{
				onSuccess: () => {
					queryClient.refetchQueries(['product', product.id])
					reset()
				},
			},
		)
	}

	const handleRateChange = (value: number) => {
		setValue('rating', value)
	}

	return (
		<div className="rounded-lg border bg-white p-6">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div className="mb-4 flex items-center">
					<p className="mr-4">Đánh giá của bạn:</p>
					<div className="flex">
						<Rate value={watch('rating')} onChange={handleRateChange} />
						{errors.rating && (
							<p className="ml-4 text-xs text-red-500">
								{errors.rating.message}
							</p>
						)}
					</div>
				</div>

				<div className="mb-[15px]">
					<fieldset className="relative w-full">
						<textarea
							id="comment"
							{...register('comment')}
							className="peer h-[112px] w-full resize-none rounded-[3px] border border-[#ebebeb] px-[18px] pb-[6px] pt-[25px] text-[14px] font-medium text-gray-600 transition-all duration-200 ease-in-out focus:outline-none"
							placeholder=" "
						/>
						<label
							htmlFor="comment"
							className={cn(
								'pointer-events-none absolute left-[18px] top-1/2 origin-left -translate-y-1/2 text-[14px] font-medium text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-focus:top-[14px] peer-focus:scale-[0.8]',
								touchedFields.comment && 'top-[14px] scale-[0.8]',
							)}
						>
							Đánh giá *
						</label>
						{errors.comment && (
							<p className="mt-1 text-xs text-red-500">
								{errors.comment.message}
							</p>
						)}
					</fieldset>
				</div>

				<Button type="submit" className="rounded-[3px]">
					Gửi đánh giá
				</Button>
			</form>
		</div>
	)
}

export default YourReview
