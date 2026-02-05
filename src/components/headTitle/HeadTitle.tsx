import './HeadTitle.css';

type THeadTitleProps = {
    title: string;
    component?: React.ReactNode;
}

const HeadTitle = ({ title, component }: THeadTitleProps) => {
    return (
        <div className='head-title'>
            <h4 className='text-title'>{title}</h4>
            <div className='component'>
                {component}
            </div>
        </div>
    );
};

export default HeadTitle;