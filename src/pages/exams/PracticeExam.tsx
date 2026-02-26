import CustomList from "../../components/lists/CustomList"
import CustomInput from "../../components/ui/inputs/CustomInput"

const PracticeExam = () => {
    return (
        <section className="practice-exam">
            <form className='page-details'>
                <div className="w-full md:w-6/12 px-2 mt-5">
                    <CustomInput
                        type='text'
                        label='اسم الامتحان'
                        value='التدريب'
                        readOnly
                    />
                </div>
                <div className="w-full md:w-6/12 px-2 mt-5">
                    <CustomInput
                        type='text'
                        label='تاريخ الانشاء'
                        value='28/8/2025'
                        readOnly
                    />
                </div>
                <div className="w-full md:w-6/12 px-2 mt-5">
                    <CustomInput
                        type='text'
                        label='الوصف'
                        value='حان وقت التدريب ! جرب معلوماتك الآن'
                        readOnly
                    />
                </div>
                <div className="w-full md:w-6/12 px-2 mt-5">
                    <CustomInput
                        type='text'
                        label='مدة الامتحان'
                        value='120 د'
                        readOnly
                    />
                </div>
            </form>

            {/* <QuestionAndAnswersForm /> */}

            <CustomList
                data={[]}
                onEdit={() => { }}
            />
        </section>
    )
}

export default PracticeExam