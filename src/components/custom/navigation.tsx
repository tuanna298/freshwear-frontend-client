import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { useLocation } from 'react-router-dom'

export function Navigation() {
	const location = useLocation()
	const currentPath = location.pathname

	return (
		<NavigationMenu>
			<NavigationMenuList className="gap-[30px]">
				<NavigationMenuItem>
					<NavigationMenuLink
						className={cn(
							navigationMenuTriggerStyle(),
							'relative !bg-transparent p-0 font-montserrat after:absolute after:bottom-1 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:bg-transparent hover:after:origin-bottom-left hover:after:scale-x-100',
							currentPath === '/' &&
								'text-red-700 after:scale-x-100 after:bg-red-700 hover:text-red-700',
						)}
						href="/"
					>
						Trang chủ
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink
						className={cn(
							navigationMenuTriggerStyle(),
							'relative !bg-transparent p-0 font-montserrat after:absolute after:bottom-1 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:bg-transparent hover:after:origin-bottom-left hover:after:scale-x-100',
							(currentPath === '/shop' || currentPath.includes('product')) &&
								'text-red-700 after:scale-x-100 after:bg-red-700 hover:text-red-700',
						)}
						href="/shop"
					>
						Sản phẩm
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink
						className={cn(
							navigationMenuTriggerStyle(),
							'relative !bg-transparent p-0 font-montserrat after:absolute after:bottom-1 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:bg-transparent hover:after:origin-bottom-left hover:after:scale-x-100',
							currentPath === '/lien-he' &&
								'text-red-700 after:scale-x-100 after:bg-red-700 hover:text-red-700',
						)}
						href="/lien-he"
					>
						Liên hệ
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}
