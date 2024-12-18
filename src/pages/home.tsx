import Feature from '@/components/custom/feature'
import Gallery from '@/components/custom/gallery'
import HeroSlider from '@/components/custom/hero-slider'
import Lookbook from '@/components/custom/lookbook'
import { ProductGrid } from '@/components/custom/product/product-grid'
import { Fragment } from 'react'

const Home = () => {
	return (
		<Fragment>
			<HeroSlider />
			<ProductGrid />
			{/* Marquee */}
			<Lookbook />
			{/* <Testimonial /> */}
			<Gallery />
			<Feature />
		</Fragment>
	)
}

export default Home
