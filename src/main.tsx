import 'animate.css'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import LocaleData from 'dayjs/plugin/localeData'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import WeekDay from 'dayjs/plugin/weekday'
import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './assets/scss/style.scss'
import './index.css'

dayjs.extend(relativeTime)
dayjs.extend(WeekDay)
dayjs.extend(LocaleData)
dayjs.extend(LocalizedFormat)
dayjs.extend(updateLocale)

dayjs.updateLocale('vi', {
	months: [
		'Tháng 1',
		'Tháng 2',
		'Tháng 3',
		'Tháng 4',
		'Tháng 5',
		'Tháng 6',
		'Tháng 7',
		'Tháng 8',
		'Tháng 9',
		'Tháng 10',
		'Tháng 11',
		'Tháng 12',
	],
	weekdays: [
		'Chủ Nhật',
		'Thứ Hai',
		'Thứ Ba',
		'Thứ Tư',
		'Thứ Năm',
		'Thứ Sáu',
		'Thứ Bảy',
	],
})
dayjs.locale('vi')

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Suspense fallback>
			<App />
		</Suspense>
	</StrictMode>,
)
