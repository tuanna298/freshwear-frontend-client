import { cn } from '@/lib/utils'
import React from 'react'

export interface TimelinePropsItem
	extends Omit<
		TimelineItemProps,
		'isActive' | 'isActiveBullet' | 'bulletSize' | 'lineSize'
	> {
	bulletSize?: number
}

export interface TimelineProps {
	items: TimelinePropsItem[]
	activeItem?: number
	bulletSize?: number
	lineSize?: number
}

export interface TimelineItemProps {
	title: React.ReactNode
	description?: React.ReactNode
	bullet?: React.ReactNode
	isLast?: boolean
	isActive?: boolean
	isActiveBullet?: boolean
	className?: string
	bulletSize: number
	lineSize: number
	bulletBorderColor?: string
}

export interface TimelineItemBulletProps {
	children?: React.ReactNode
	isActive?: boolean
	bulletSize: number
	lineSize: number
	bulletBorderColor?: string
}

const Timeline: React.FC<TimelineProps> = ({
	items,
	activeItem = -1,
	bulletSize = 16,
	lineSize = 2,
}) => {
	return (
		<ul style={{ paddingLeft: `${bulletSize / 2}px` }}>
			{items.map((item, index) => (
				<TimelineItem
					key={index}
					title={item.title}
					description={item.description}
					bullet={item.bullet}
					isLast={index === items.length - 1}
					isActive={activeItem === -1 ? false : activeItem >= index + 1}
					isActiveBullet={activeItem === -1 ? false : activeItem >= index}
					bulletSize={item.bulletSize || bulletSize}
					lineSize={lineSize}
					bulletBorderColor={item.bulletBorderColor}
				/>
			))}
		</ul>
	)
}

const TimelineItem: React.FC<TimelineItemProps> = ({
	title,
	description,
	bullet,
	isLast = false,
	isActive = false,
	isActiveBullet = false,
	className,
	bulletSize,
	lineSize,
	bulletBorderColor,
	...rest
}) => {
	return (
		<li
			className={cn(
				'relative border-l pb-8 pl-8',
				isLast && 'border-l-transparent pb-0',
				isActive && !isLast && 'border-l-primary',
				className,
			)}
			style={{
				borderLeftWidth: `${lineSize}px`,
			}}
			{...rest}
		>
			<TimelineItemBullet
				lineSize={lineSize}
				bulletSize={bulletSize}
				isActive={isActiveBullet}
				bulletBorderColor={bulletBorderColor}
			>
				{bullet}
			</TimelineItemBullet>
			<TimelineItemTitle>{title}</TimelineItemTitle>
			{description && (
				<TimelineItemDescription>{description}</TimelineItemDescription>
			)}
		</li>
	)
}

const TimelineItemBullet: React.FC<TimelineItemBulletProps> = ({
	children,
	isActive = false,
	bulletSize,
	lineSize,
	bulletBorderColor,
}) => {
	return (
		<div
			className={cn(
				`absolute top-0 flex items-center justify-center rounded-full border bg-background`,
				isActive && 'border-primary',
			)}
			style={{
				width: `${bulletSize}px`,
				height: `${bulletSize}px`,
				left: `${-bulletSize / 2 - lineSize / 2}px`,
				borderWidth: `${lineSize}px`,
				borderColor:
					bulletBorderColor || (isActive ? undefined : 'currentColor'),
			}}
			aria-hidden="true"
		>
			{children}
		</div>
	)
}

const TimelineItemTitle: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<div className="mb-1 text-base font-semibold leading-none">{children}</div>
	)
}

const TimelineItemDescription: React.FC<
	React.HTMLAttributes<HTMLParagraphElement>
> = ({ className, children, ...rest }) => {
	return (
		<p className={cn('text-sm text-muted-foreground', className)} {...rest}>
			{children}
		</p>
	)
}

export { Timeline }
