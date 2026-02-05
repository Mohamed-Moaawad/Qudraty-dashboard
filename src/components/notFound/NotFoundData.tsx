import { CircleOff } from 'lucide-react'

const NotFoundData = ({ text }: { text: string }) => {
    return (
        <div className='not-found-data flex flex-col justify-center items-center gap-5 p-20 my-5'>
            <CircleOff size={50} color='var(--text-color)' />
            <p className='not-found'>{text}</p>
        </div>
    )
}

export default NotFoundData