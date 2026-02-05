import { ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

type TCustomLink = {
    to: string;
}
const CustomLink = ({ to }: TCustomLink) => {
    return (
        <Link className="flex items-center gap-4" to={to}>
            كل التفاصيل
            <ChevronLeft size={30} strokeWidth={2} />
        </Link>
    )
}

export default CustomLink