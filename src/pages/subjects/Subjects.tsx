import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/header/Header"
import HeadTitle from "../../components/headTitle/HeadTitle"
import CustomButton from "../../components/ui/buttons/CustomButton"
import CustomCard from "../../components/ui/cards/CustomCard"
import Container from "../../components/ui/Container"
import SelectInput from "../../components/ui/selectInput/SelectInput"
import CustomModal from "../../components/ui/modals/CustomModal"

import { Pagination } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

import { Plus } from "lucide-react"
import AddNewSubjectForm from "../../components/forms/AddNewSubjectForm"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import thunkGetAllSubjects from "../../store/subjects/thunk/thunkGetAllSubjects"
import SkeletonCards from "../../components/skeleton/SkeletonCards"
import thunkGetSubjectType from "../../store/subjectType/thunkGetSubjectType"



const Subjects = () => {
    const dispatch = useAppDispatch()
    const { subjects, pageNumber, totalPages, loading } = useAppSelector((state) => state.subjects);
    const { allSubjectType } = useAppSelector((state) => state.subjectType);
    const [activePage, setActivePage] = useState(pageNumber || 1);
    const [selectedSubjectType, setSelectedSubjectType] = useState<string>('');

    useEffect(() => {
        dispatch(thunkGetAllSubjects({ pageNumber: activePage, subjectTypeId: selectedSubjectType }));
        dispatch(thunkGetSubjectType());
    }, [dispatch, activePage, selectedSubjectType]);

    const [opened, { open, close }] = useDisclosure(false);

    const navigate = useNavigate();


    const subjectsType = [
        { label: 'الكل', value: '' }, // default
        ...allSubjectType.map((item) => ({
            label: item.name,
            value: item.id,
        }))
    ];


    return (
        <section className="subjects">
            {/* header */}
            <Header text="المواد الدراسية" />

            <Container>
                {/* Head Title */}
                <HeadTitle title="إدارة المواد الدراسية :"
                    component={
                        <div className='head-title-component'>
                            <SelectInput
                                placeholder="جميع المواد"
                                data={subjectsType}
                                radius="xl"
                                value={selectedSubjectType}
                                onChange={(val) => setSelectedSubjectType(val ? val : '')}
                            />
                            <div>
                                <CustomButton
                                    type="button"
                                    text="إضافة مادة جديدة"
                                    icon={<Plus />}
                                    radius="xl"
                                    variant="light"
                                    onClick={open}
                                />
                            </div>
                        </div>
                    }
                />
                {subjects.length === 0 && loading === 'pending' && (
                    <SkeletonCards />
                )}
                {/* All Subjects */}
                <div className="flex flex-wrap items-stretch py-5">
                    {subjects.map((subject) => (
                        <div key={subject.id} className="w-full md:w-4/12 lg:w-3/12 p-2">
                            <CustomCard
                                title={subject.name}
                                description={subject.description}
                                subjectType={subject.type}
                                // subjectsCount={2}
                                onClick={() => navigate(`/subjects/${subject.id}`)}
                                image={subject.imageUrl}
                            />
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div
                    style={{
                        direction: 'ltr'
                    }}
                    className="flex justify-end"
                >
                    <Pagination
                        total={totalPages}
                        value={activePage}
                        onChange={setActivePage}
                    />
                </div>

            </Container>

            <CustomModal title="إضافة مادة جديدة" opened={opened} onClose={close}>
                <AddNewSubjectForm />
            </CustomModal>
        </section>
    )
}

export default Subjects