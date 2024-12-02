import 'animate.css'
import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './assets/scss/style.scss'
import './index.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Suspense fallback>
			<App />
		</Suspense>
	</StrictMode>,
)
