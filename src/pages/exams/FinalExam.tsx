import { useEffect, useState } from "react";
import AddNewFinalExamForm from "../../components/forms/AddNewFinalExamForm"
import CustomModal from "../../components/ui/modals/CustomModal"
import PaginationTable from "../../components/ui/tables/PaginationTable"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import thunkGetFinalExam from "../../store/exams/thunk/FinalExam/thunkGetFinalExam";
import SkeletonTable from "../../components/skeleton/SkeletonTable";
import thunkGetAllSubjects from "../../store/subjects/thunk/thunkGetAllSubjects";
import moment from "moment";

type TFinalExam = {
    opened: boolean,
    close: () => void
}

const FinalExam = ({ opened, close }: TFinalExam) => {
    const dispatch = useAppDispatch();
    const { data, loading, pageNumber, totalPages } = useAppSelector((state) => state.exams);

    const { subjects } = useAppSelector((state) => state.subjects);

    const [activePage, setActivePage] = useState(pageNumber || 1);

    useEffect(() => {
        dispatch(thunkGetFinalExam({ pageNumber: activePage, pageSize: 10 }));
        dispatch(thunkGetAllSubjects({}));
    }, [dispatch, activePage])

    const formattedExams = data.map((exam) => ({
        id: exam.examId,
        ...exam,
        isActive: exam.isActive ? 'نشط ✅' : 'غير نشط ❌',
        created: moment(exam.created).format('YYYY/MM/DD'),
        examQuestionCount: exam.examQuestionCount + exam.standaloneQuestionCount
    }))

    return (
        <div>
            <div className="mt-5">
                {loading === 'pending' && (
                    <SkeletonTable />
                )}
                {data.length > 0 && loading === 'succeeded' && (
                    <PaginationTable
                        data={formattedExams}
                        columns={[
                            { key: 'subjectName', label: 'اسم الامتحان' },
                            { key: 'subjectTypeName', label: 'المنهج' },
                            { key: 'examQuestionCount', label: 'عدد أسئلة الامتحان' },
                            { key: 'isActive', label: 'حالة الامتحان' },
                            { key: 'created', label: "تاريخ الإنشاء" },
                        ]}
                        totalPages={totalPages}
                        activePage={activePage}
                        onPageChange={setActivePage}
                    />
                )}
            </div>
            <CustomModal opened={opened} onClose={close} title="اضافة امتحان جديد">
                <AddNewFinalExamForm subjects={subjects} close={close} />
            </CustomModal>
        </div>
    )
}

export default FinalExam