import './Lists.css';
import { SquarePen } from 'lucide-react';
import CustomIconButton from '../ui/buttons/CustomIconButton';
import NotFoundData from '../notFound/NotFoundData';


type BaseListItem = {
    id: number | string;
    title?: string;
};

type CustomListProps<T extends BaseListItem> = {
    data: T[];
    text?: string;
    onEdit: (item: T) => void; // اختياري، الصفحة اللي محتاجة action
};

const CustomList = <T extends BaseListItem>({ data, text, onEdit }: CustomListProps<T>) => {


    if (data && data.length > 0) {
        return (
            <ul className='custom-list my-8'>
                {data.map((el) => (
                    <li key={el.id} className='flex justify-between items-center'>
                        <p><strong>{el.id}#</strong> : {el.title} </p>
                        <div className="flex">
                            <CustomIconButton
                                icon={<SquarePen />}
                                radius={8}
                                color='var(--main-color)'
                                size='xl'
                                onClick={() => onEdit(el)}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        )
    }
    return (
        <NotFoundData text={text || 'خطأ'} />
    )

}

export default CustomList