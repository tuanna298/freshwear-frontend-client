import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { CrudFilter, useList } from '@refinedev/core'
import { Slider } from 'antd'
import { ListFilter } from 'lucide-react'
import { useState } from 'react'
import { NumberField } from '../number-field'

interface ShopFilterProps {
	setFilters: (filters: CrudFilter[]) => void
}

const ShopFilter = ({ setFilters }: ShopFilterProps) => {
	const [open, setOpen] = useState(false)
	const { data: sizeData } = useList({
		resource: 'size',
		pagination: {
			pageSize: 100,
		},
	})
	const { data: colorData } = useList({
		resource: 'color',
		pagination: {
			pageSize: 100,
		},
	})

	const { data: brandData } = useList({
		resource: 'brand',
		pagination: {
			pageSize: 100,
		},
	})

	const { data: materialData } = useList({
		resource: 'material',
		pagination: {
			pageSize: 100,
		},
	})

	const sizes = sizeData?.data || []
	const colors = colorData?.data || []
	const brands = brandData?.data || []
	const materials = materialData?.data || []

	const [selectedSizes, setSelectedSizes] = useState<string[]>([])
	const [selectedColors, setSelectedColors] = useState<string[]>([])
	const [selectedBrands, setSelectedBrands] = useState<string[]>([])
	const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000])
	const [searchTerm, setSearchTerm] = useState<string>('')

	const handleFilter = () => {
		let filterObject: any = {}

		if (searchTerm) {
			filterObject.name = {
				contains: searchTerm,
				mode: 'insensitive',
			}
		}

		let productDetailFilter: any = {}

		if (selectedSizes.length > 0) {
			productDetailFilter.size = {
				id: {
					in: selectedSizes,
				},
			}
		}

		if (selectedColors.length > 0) {
			productDetailFilter.color = {
				id: {
					in: selectedColors,
				},
			}
		}

		productDetailFilter.price = {
			gte: priceRange[0],
			lte: priceRange[1],
		}

		if (Object.keys(productDetailFilter).length > 0) {
			filterObject.details = {
				some: productDetailFilter,
			}
		}

		if (selectedBrands.length > 0) {
			filterObject.brand = {
				id: {
					in: selectedBrands,
				},
			}
		}

		if (selectedMaterials.length > 0) {
			filterObject.material = {
				id: {
					in: selectedMaterials,
				},
			}
		}

		setFilters([
			{
				field: 'where',
				operator: 'eq',
				value: JSON.stringify(filterObject),
			},
		])

		setOpen(false)
	}

	const handleClearFilters = () => {
		setSelectedSizes([])
		setSelectedColors([])
		setSelectedBrands([])
		setSelectedMaterials([])
		setPriceRange([0, 10000000])
		setSearchTerm('')
		setFilters([])

		setOpen(false)
	}

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="outline" className="flex w-fit items-center gap-2">
					<ListFilter className="h-4 w-4" />
					Lọc
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="flex flex-col gap-0 p-0">
				<SheetHeader className="p-4">
					<SheetTitle>Lọc sản phẩm</SheetTitle>
				</SheetHeader>
				<ScrollArea className="p-3">
					<div className="flex-grow space-y-10 p-1">
						{/* Tìm kiếm theo tên */}
						<div>
							<label className="mb-2 block text-sm font-bold">Tìm kiếm</label>
							<Input
								placeholder="Nhập tên sản phẩm"
								className="w-full"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>

						{/* Lọc theo kích cỡ */}
						<div>
							<label className="mb-2 block text-sm font-bold">Kích cỡ</label>
							<div className="flex flex-col gap-3">
								{sizes.length > 0 &&
									sizes.map((size) => (
										<div className="flex items-center space-x-2" key={size.id}>
											<Checkbox
												id={`size-${size.id}`}
												checked={selectedSizes.includes(size.id as any)}
												onCheckedChange={(checked) => {
													if (checked) {
														setSelectedSizes([...selectedSizes, size.id] as any)
													} else {
														setSelectedSizes(
															selectedSizes.filter((id) => id !== size.id),
														)
													}
												}}
											/>
											<label
												htmlFor={`size-${size.id}`}
												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
											>
												{size?.name}
											</label>
										</div>
									))}
							</div>
						</div>

						{/* Lọc theo màu sắc */}
						<div>
							<label className="mb-2 block text-sm font-bold">Màu sắc</label>
							<div className="flex flex-col gap-3">
								{colors.length > 0 &&
									colors.map((color) => (
										<div className="flex items-center space-x-2" key={color.id}>
											<Checkbox
												id={`color-${color.id}`}
												checked={selectedColors.includes(color.id as any)}
												onCheckedChange={(checked) => {
													if (checked) {
														setSelectedColors([
															...selectedColors,
															color.id,
														] as any)
													} else {
														setSelectedColors(
															selectedColors.filter((id) => id !== color.id),
														)
													}
												}}
											/>
											<label
												htmlFor={`color-${color.id}`}
												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
											>
												{color?.name}
											</label>
										</div>
									))}
							</div>
						</div>

						{/* Lọc theo giá tiền */}
						<div>
							<label className="mb-2 block text-sm font-bold">Giá tiền</label>
							<div className="p-2">
								<Slider
									tooltip={{
										formatter(value) {
											return <NumberField value={value || 0} />
										},
									}}
									range
									min={0}
									max={10000000}
									step={100000}
									value={priceRange}
									onChange={(value) => setPriceRange(value as any)}
								/>
							</div>
						</div>

						{/* Lọc theo thương hiệu */}
						<div>
							<label className="mb-2 block text-sm font-bold">
								Thương hiệu
							</label>
							<div className="flex flex-col gap-3">
								{brands.length > 0 &&
									brands.map((brand) => (
										<div className="flex items-center space-x-2" key={brand.id}>
											<Checkbox
												id={`brand-${brand.id}`}
												checked={selectedBrands.includes(brand.id as any)}
												onCheckedChange={(checked) => {
													if (checked) {
														setSelectedBrands([
															...selectedBrands,
															brand.id,
														] as any)
													} else {
														setSelectedBrands(
															selectedBrands.filter((id) => id !== brand.id),
														)
													}
												}}
											/>
											<label
												htmlFor={`brand-${brand.id}`}
												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
											>
												{brand?.name}
											</label>
										</div>
									))}
							</div>
						</div>

						{/* Lọc theo chất liệu */}
						<div>
							<label className="mb-2 block text-sm font-bold">Chất liệu</label>
							<div className="flex flex-col gap-3">
								{materials.length > 0 &&
									materials.map((material) => (
										<div
											className="flex items-center space-x-2"
											key={material.id}
										>
											<Checkbox
												id={`material-${material.id}`}
												checked={selectedMaterials.includes(material.id as any)}
												onCheckedChange={(checked) => {
													if (checked) {
														setSelectedMaterials([
															...selectedMaterials,
															material.id,
														] as any)
													} else {
														setSelectedMaterials(
															selectedMaterials.filter(
																(id) => id !== material.id,
															),
														)
													}
												}}
											/>
											<label
												htmlFor={`material-${material.id}`}
												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
											>
												{material?.name}
											</label>
										</div>
									))}
							</div>
						</div>
					</div>
				</ScrollArea>
				<SheetFooter className="mt-6 flex justify-end gap-2 p-4">
					<Button variant="outline" onClick={handleClearFilters}>
						Xóa bộ lọc
					</Button>
					<Button onClick={handleFilter}>Lọc</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}

export default ShopFilter
