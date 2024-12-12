import { UserRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

const AccountNav = () => {
	const navigate = useNavigate()

	return (
		<Button
			size="icon"
			variant="ghost"
			className="rounded-full border-transparent bg-transparent"
			onClick={() => navigate('/my-account')}
		>
			<UserRound size={18} />
		</Button>
	)
}

export default AccountNav
