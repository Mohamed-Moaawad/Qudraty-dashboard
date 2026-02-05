import './Header.css';
import { Avatar } from '@mantine/core';
import { Bell } from 'lucide-react';
import MenuButton from '../ui/menuButton/MenuButton';
import CustomIconButton from '../ui/buttons/CustomIconButton';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';

type THeaderType = {
    text: string;
};

const Header = ({ text = 'عنوان الصفحة' }: THeaderType) => {
    const { user } = useAppSelector((state) => state.auth)
    return (
        <header className='py-5 px-10'>
            <h2>{text}</h2>

            <div className="actions">
                <CustomIconButton
                    icon={<Bell strokeWidth={2} />}
                    size='xl'
                    radius={50}
                    color='var(--main-color)'
                />

                <Link to='/profile'>
                    <Avatar src={
                        user?.roles.includes('Admin') ?
                            'https://images.icon-icons.com/1879/PNG/512/iconfinder-7-avatar-2754582_120519.png'
                            :
                            'https://images.icon-icons.com/1879/PNG/512/iconfinder-8-avatar-2754583_120515.png'
                    } alt="user image" size={'lg'} />
                </Link>

                <div className="menu-button">
                    <MenuButton />
                </div>
            </div>
        </header>
    );
};

export default Header;