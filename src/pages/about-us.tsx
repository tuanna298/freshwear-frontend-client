import Gallery from '@/components/custom/gallery'
import { HeaderPlacholder } from '@/components/custom/header'
import { Fragment } from 'react'

const AboutUs = () => {
	return (
		<Fragment>
			<HeaderPlacholder />
			<div
				className="pb-[65px] pr-0 ps-0 pt-[69px]"
				style={{
					backgroundImage: 'url(/assets/img/other/page-title-blog.png)',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
				}}
			>
				<div className="mx-auto my-0 w-full max-w-full pr-[40px] ps-[40px]">
					<div className="text-center text-[42px] font-[400] leading-[50px]">
						Về chúng tôi
					</div>
				</div>
			</div>

			<section className="relative">
				<img
					src="/assets/img/other/about-banner-01.jpg"
					alt="image-collection"
					className="h-full max-h-[860px] w-full max-w-full object-cover align-middle text-transparent"
				/>
				<div className="absolute left-[15px] right-[15px] top-[50%] translate-y-[-50%] transform !text-center">
					<div className="container text-background">
						<div className="text-[68px] leading-[81.6px]">
							Tự tin chinh phục mục tiêu thể hình
							<br className="block" />
							tỏa sáng theo cách của bạn
						</div>
					</div>
				</div>
			</section>

			<section className="px-0 py-[65px]">
				<div className="container">
					<div className="my-0 flex flex-col items-center gap-[18px] px-[15px] font-montserrat">
						<span className="text-[32px] leading-[38.4px] 2xl:text-[42px] 2xl:leading-[50.4px]">
							Chúng tôi là ai?
						</span>
						<p className="text-center text-[14px] leading-[20px] 2xl:text-[16px] 2xl:leading-[22px]">
							Chào mừng bạn đến với cửa hàng thời trang nữ cổ điển của chúng
							tôi,
							<br className="block" />
							nơi chúng tôi tin rằng phong cách vượt thời gian sẽ không bao giờ
							lỗi mốt.
							<br className="block" />
							Bộ sưu tập của chúng tôi bao gồm những món đồ cổ điển vừa phong
							cách vừa đa năng,
							<br className="block" />
							hoàn hảo để tạo nên một tủ quần áo bền vững theo năm tháng
						</p>
					</div>
				</div>
			</section>

			<div className="container">
				<div className="border-b" />
			</div>

			<section className="pb-[78px] pt-[100px]">
				<div className="container">
					<div className="grid grid-cols-2 gap-[15px] 2xl:gap-[30px]">
						<div className="collection-image-wrap relative overflow-hidden">
							<img
								src="/assets/img/other/collection-69.jpg"
								alt="collection-img"
								className="h-full w-full max-w-full object-cover align-middle text-transparent"
							/>
						</div>
						<div className="flex w-full justify-center place-self-center p-[20px] px-0">
							<div className="w-[450px]">
								<div className="mt-[14px] text-[28px] leading-[33.6px]">
									Thành lập - 2010
								</div>
								<div className="mt-[18px] text-[14px] leading-[20px] text-gray-500">
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Libero corporis quae pariatur iusto quidem accusamus aliquam
									enim reiciendis, eaque asperiores sapiente cum quam eum quis
									deserunt, dolorum dolores dolor ea. Lorem ipsum dolor sit amet
									consectetur adipisicing elit. Saepe, rem ex libero magnam,
									optio voluptatibus ipsa tempora maiores iusto impedit
									consequuntur! Expedita quibusdam tempora tenetur harum
									aliquam, tempore incidunt obcaecati.
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="pb-[78px] pt-[100px]">
				<div className="container">
					<div className="grid grid-cols-2 gap-[15px] 2xl:gap-[30px]">
						<div className="flex w-full justify-center place-self-center p-[20px] px-0">
							<div className="w-[450px]">
								<div className="mt-[14px] text-[28px] leading-[33.6px]">
									Sứ mệnh của chúng tôi
								</div>
								<div className="mt-[18px] text-[14px] leading-[20px] text-gray-500">
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Libero corporis quae pariatur iusto quidem accusamus aliquam
									enim reiciendis, eaque asperiores sapiente cum quam eum quis
									deserunt, dolorum dolores dolor ea. Lorem ipsum dolor sit amet
									consectetur adipisicing elit. Saepe, rem ex libero magnam,
									optio voluptatibus ipsa tempora maiores iusto impedit
									consequuntur! Expedita quibusdam tempora tenetur harum
									aliquam, tempore incidunt obcaecati.
								</div>
							</div>
						</div>
						<div className="group-collection-image-wrap relative pb-[50px]">
							<div className="collection-image-wrap absolute bottom-0 right-0 top-[unset] z-10 flex h-max w-[43%] items-center overflow-hidden transition-[all_.3s_ease]">
								<div>
									<img
										src="/assets/img/other/collection-71.jpg"
										alt="collection-img"
										className="h-full w-full max-w-full object-cover align-middle text-transparent"
									/>
								</div>
							</div>
							<div className="collection-image-wrap relative w-[75%] overflow-hidden transition-[all_.3s_ease] hover:z-20">
								<div>
									<img
										src="/assets/img/other/collection-70.jpg"
										alt="collection-img"
										className="h-full w-full max-w-full object-cover align-middle text-transparent"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="pb-[78px] pt-[100px]">
				<div className="container">
					<div className="rounded-[10px] bg-[#fbf7f0] px-[90px] pb-[132px] pt-[109px]">
						<div className="mb-[60px] flex flex-col items-center gap-[18px] px-[15px]">
							<div className="text-[32px] font-bold leading-[50.4px]">
								Chất lượng là ưu tiên hàng đầu của chúng tôi
							</div>
							<div>
								<p className="text-center text-[16px] leading-[22px]">
									Our talented stylists have put together outfits that are
									perfect for the season.
									<br className="block" />
									They've variety of ways to inspire your next fashion-forward
									look.
								</p>
							</div>
						</div>
						<div className="flex gap-[30px]">
							<div className="flex-grow text-center">
								<div>
									<div className="mb-[10px] text-[22px] font-bold leading-[26.4px]">
										Vật liệu chất lượng cao
									</div>
									<p className="text-[14px] leading-[20px] text-gray-500">
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Dicta error aut modi iste minus, necessitatibus consequuntur
										sit, totam ab obcaecati blanditiis libero ratione excepturi
										enim esse aliquam repellendus, rem ipsam!
									</p>
								</div>
							</div>
							<div className="flex-grow text-center">
								<div>
									<div className="mb-[10px] text-[22px] font-bold leading-[26.4px]">
										Thiết kế độc đáo
									</div>
									<p className="text-[14px] leading-[20px] text-gray-500">
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Dicta error aut modi iste minus, necessitatibus consequuntur
										sit, totam ab obcaecati blanditiis libero ratione excepturi
										enim esse aliquam repellendus, rem ipsam!
									</p>
								</div>
							</div>
							<div className="flex-grow text-center">
								<div>
									<div className="mb-[10px] text-[22px] font-bold leading-[26.4px]">
										Đa dạng sản phẩm
									</div>
									<p className="text-[14px] leading-[20px] text-gray-500">
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Dicta error aut modi iste minus, necessitatibus consequuntur
										sit, totam ab obcaecati blanditiis libero ratione excepturi
										enim esse aliquam repellendus, rem ipsam!
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Gallery />
		</Fragment>
	)
}

export default AboutUs
