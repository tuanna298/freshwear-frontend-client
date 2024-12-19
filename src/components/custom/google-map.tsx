import GoogleMapReact from 'google-map-react'

type GoogleMappropTypes = {
	lat?: number
	lng?: number
	zoom?: number
	options?: {}
}
type MarkerProps = {
	lat: number
	lng: number
	text: string
}

const Marker: React.FC<MarkerProps> = ({ text }) => (
	<div className="map-marker">
		<img src={'/assets/img/icon/2.png'} alt={text} />
	</div>
)

const GoogleMap: React.FC<GoogleMappropTypes> = ({
	lat = -3.745,
	lng = -38.523,
	zoom = 12,
}) => {
	return (
		<div style={{ height: '100vh', width: '100vw' }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: 'AIzaSyB2D8wrWMY3XZnuHO6C31uq90JiuaFzGws' }}
				defaultCenter={{ lat, lng }}
				defaultZoom={zoom}
			>
				<Marker lat={lat} lng={lng} text="My Marker" />
			</GoogleMapReact>
		</div>
	)
}

export default GoogleMap
