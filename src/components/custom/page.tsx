import { cn } from '@/lib/utils'
import React from 'react'

interface PageSectionProps {
	children: React.ReactNode
	classname?: string
}

export const PageSection = ({ children, classname }: PageSectionProps) => {
	return (
		<div
			className={cn(
				'm-auto w-full max-w-[1540px] pb-[60px] pr-[50px] ps-[50px]',
				classname,
			)}
		>
			{children}
		</div>
	)
}

interface PageSectionHeaderProps {
	title: string
	description: string
}

export const PageSectionHeader = ({
	title,
	description,
}: PageSectionHeaderProps) => {
	return (
		<div className="mb-[60px] flex flex-col items-center gap-[18px] pr-[15px] ps-[15px]">
			<span className="text-4xl">{title}</span>
			<p className="text-center text-base">{description}</p>
		</div>
	)
}