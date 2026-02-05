import './Radios.css'
import { Group, Radio } from '@mantine/core'
import CustomInput from '../ui/inputs/CustomInput'
// import type { UseFormRegister } from 'react-hook-form';

// type TAnswers = {
//     id: string;
//     text: string;
//     correct: boolean;
// };

type TCardRadioType = {
    fields: { id: string }[];
    // register: UseFormRegister<any>;
    correctID: string | null;
    onCorrectChange: () => void;
    label: string;
}

const CardRadio = ({ fields, correctID, label, onCorrectChange }: TCardRadioType) => {

    return (
        <Radio.Group
            value={correctID}
            onChange={onCorrectChange}
            label={label}
        >
            <Group pt="md" gap="xs" className='flex flex-wrap !justify-between items-center'>
                {fields.map((field) => (
                    <div className="w-full md:w-5/12 mb-6">
                        <Radio.Card className='root-answers' radius="md" value={field.id} key={field.id}>
                            <Group wrap="nowrap" align="flex-start">
                                <Radio.Indicator />
                                <CustomInput
                                    type="text"
                                    placeholder={'ادخل الاجابة'}
                                    // {...register(``)}

                                />
                            </Group>
                        </Radio.Card>
                    </div>
                ))}
            </Group>
        </Radio.Group >
    )
}

export default CardRadio