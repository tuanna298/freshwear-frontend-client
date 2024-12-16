import { useEffect, useState } from 'react'
import Swiper from 'react-id-swiper'
import { Link } from 'react-router-dom'

const sliderData = [
	{
		id: 1,
		title: 'Khám Phá Ngay',
		subtitle: 'Thời Trang Của Bạn',
		text: 'Phong cách mới, giá cực yêu - chỉ có tại đây',
		image: '/assets/img/slider/fashion-slideshow-01.jpg',
		url: '/shop-grid-standard',
	},
	{
		id: 2,
		title: 'Thời Trang Đỉnh Cao',
		subtitle: 'Đón Mùa Mới',
		text: 'Bộ sưu tập xuân hè với giá tốt nhất trong năm',
		image: '/assets/img/slider/fashion-slideshow-02.jpg',
		url: '/shop-grid-standard',
	},
	{
		id: 3,
		title: 'Nâng Tầm Phong Cách',
		subtitle: 'Sang Trọng Mỗi Ngày',
		text: 'Bộ sưu tập mới mang đậm dấu ấn thời thượng',
		image: '/assets/img/slider/fashion-slideshow-03.jpg',
		url: '/shop-grid-standard',
	},
]

const HeroSlider = () => {
	const params = {
		effect: 'fade',
		loop: false,
		speed: 1000,
		autoplay: false,
		watchSlidesVisibility: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		noSwiping: true,
		renderPrevButton: () => <></>,
		renderNextButton: () => <></>,
	}
	return (
		<div className="slider-area">
			<div className="slider-active-2 nav-style-2">
				<Swiper {...params}>
					{sliderData &&
						sliderData.map((single, key) => {
							return (
								<HeroSliderSingle
									data={single}
									key={key}
									sliderClass="swiper-slide"
								/>
							)
						})}
				</Swiper>
			</div>
		</div>
	)
}

type HeroSliderSingleProps = {
	data: {
		title: string
		subtitle: string
		text: string
		image: string
		url: string
	}
	sliderClass?: string
}

const HeroSliderSingle = ({ data, sliderClass }: HeroSliderSingleProps) => {
	const [backgroundImage, setBackgroundImage] = useState('')

	useEffect(() => {
		setBackgroundImage(`url(${data.image})`)
	}, [data.image])

	return (
		<div
			className={`swiper-no-swiping slider-height-4 bg-img flex items-center ${
				sliderClass ? sliderClass : ''
			}`}
			style={{ backgroundImage }}
		>
			<div className="container mr-auto ms-auto w-full">
				<div className="flex flex-wrap">
					<div className="max-w-full">
						<div className="slider-content-5 slider-animated-1 text-start">
							<h3 className="animate__animated">{data.title}</h3>
							<h1 className="animate__animated">{data.subtitle}</h1>
							<p className="animate__animated">{data.text}</p>
							<div className="slider-btn-5 btn-hover">
								<Link className="animate__animated font-bold" to={'/shop'}>
									Mua ngay
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HeroSlider
