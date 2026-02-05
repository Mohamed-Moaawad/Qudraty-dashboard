import './cards.css';
import { FilePlay } from 'lucide-react';
import CustomButton from '../buttons/CustomButton';

type TCustomCardType = {
    title: string;
    image?: string;
    description: string;
    subjectType: string;
    subjectsCount?: number;
    onClick: () => void;
}

const CustomCard = ({ title, image, description, subjectType, subjectsCount, onClick }: TCustomCardType) => {
    return (
        <div className='custom-card shadow p-5'>
            {image && (
                <div className="image">
                    <img src={image} alt="صورة الدرس" />
                </div>
            )}
            <h3>{title}</h3>
            <div className='info-card flex items-center justify-between my-4'>
                <span>{description}</span>
                <span className='highlight'>{subjectType}</span>
            </div>
            {subjectsCount && (
                <h6 className="flex gap-3">
                    <FilePlay />
                    الدروس : {subjectsCount}
                </h6>
            )}
            <div className="flex flex-wrap justify-between gap-5 mt-7">
                <div className="w-full sm:w-6/12 ">
                    <CustomButton
                        type='button'
                        text='تعديل'
                        variant='light'
                        radius='xl'
                        onClick={onClick}
                    />
                </div>
                <div className="w-full sm:w-4/12 ">
                    <CustomButton
                        type='button'
                        text='حذف'
                        variant='light'
                        radius='xl'
                        color='var(--danger-color)'
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomCard;