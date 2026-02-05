import { useState } from 'react';
import Header from '../../components/header/Header';
import HeadTitle from '../../components/headTitle/HeadTitle';
import CustomButton from '../../components/ui/buttons/CustomButton';
import Container from '../../components/ui/Container';
import SelectInput from '../../components/ui/selectInput/SelectInput';
import PaginationTable from '../../components/ui/tables/PaginationTable';
import CustomModal from '../../components/ui/modals/CustomModal';
import AddMemberForm from '../../components/forms/AddMemberForm';

import { useDisclosure } from '@mantine/hooks';
import { Plus } from 'lucide-react';



const SupportTeam = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [value, setValue] = useState<string | null>('')
    const data = [
        {
            id: 1,
            name: "أحمد علي",
            email: 'ahmed@email.com',
            phone: '‎+966 50 123 4567',
            role: 'مشرف',
            accountStatus: 'نشط',
            created_At: 'تاريخ الإضافة',
        },
        {
            id: 2,
            name: "أحمد علي",
            email: 'ahmed@email.com',
            phone: '‎+966 50 123 4567',
            role: 'مشرف',
            accountStatus: 'نشط',
            created_At: 'تاريخ الإضافة',
        },
        {
            id: 3,
            name: "أحمد علي",
            email: 'ahmed@email.com',
            phone: '‎+966 50 123 4567',
            role: 'مشرف',
            accountStatus: 'نشط',
            created_At: 'تاريخ الإضافة',
        },
        {
            id: 4,
            name: "أحمد علي",
            email: 'ahmed@email.com',
            phone: '‎+966 50 123 4567',
            role: 'مشرف',
            accountStatus: 'نشط',
            created_At: 'تاريخ الإضافة',
        },
    ];

    return (
        <section className='support-team'>
            {/* header */}
            <Header text='فريق الدعم' />

            <Container>
                {/* head title */}
                <HeadTitle
                    title='إدارة الفريق'
                    component={
                        <div className='head-title-component'>
                            <SelectInput
                                placeholder='جميع الاعضاء'
                                data={[
                                    'الكل',
                                    'مشرف',
                                    'مراقب',
                                ]}
                                radius='xl'
                                value={value}
                                onChange={(val) => setValue(val)}
                            />
                            <div>
                                <CustomButton
                                    type='button'
                                    text='إضافة عضو جديد'
                                    icon={<Plus />}
                                    variant='light'
                                    radius='xl'
                                    onClick={open}
                                />
                            </div>
                        </div>
                    }
                />
                {/* table */}
                <div className='mt-10'>
                    <PaginationTable
                        data={data}
                        columns={[
                            { key: 'name', label: 'الاسم' },
                            { key: 'email', label: 'البريد الإلكتروني' },
                            { key: 'phone', label: 'رقم الهاتف' },
                            { key: 'role', label: 'الدور' },
                            { key: 'accountStatus', label: 'حالة الحساب' },
                            { key: 'created_At', label: 'تاريخ الإضافة' },]}
                    />
                </div>
            </Container>

            <CustomModal opened={opened} onClose={close} title='إضافة عضو جديد'>
                <AddMemberForm />
            </CustomModal>
        </section>
    );
};

export default SupportTeam;