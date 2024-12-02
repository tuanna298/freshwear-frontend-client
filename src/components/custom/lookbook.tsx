import { PageSectionHeader } from './page'

const Lookbook = () => {
	return (
		<div className="pb-[100px] pr-0 ps-0 pt-[45px]">
			{/* title */}
			<PageSectionHeader
				title="Khám phá phong cách"
				description="Hãy truyền cảm hứng và để bản thân được truyền cảm hứng, từ một phong
					cách thời trang độc đáo đến những phong cách khác biệt."
			/>
			{/* lookbook */}
			<div className="relative z-[1] mr-auto ms-auto list-none overflow-hidden p-0 pt-[70px]">
				<div className="relative z-[1] box-border flex h-full w-full transition-transform">
					<div className="relative h-full flex-grow transition-transform">
						<div className="relative w-full">
							<img
								src="/assets/img/lookbook/lookbook-3.jpg"
								alt="image-lookbook"
								className="h-full w-full max-w-full scale-100 transform object-cover align-middle"
							/>
						</div>
					</div>
					<div className="relative h-full flex-grow transition-transform">
						<div className="relative w-full">
							<img
								src="/assets/img/lookbook/lookbook-4.jpg"
								alt="image-lookbook"
								className="h-full w-full max-w-full scale-100 transform object-cover align-middle"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Lookbook
