import './EditSubscription.css';
import { useState } from 'react';
import CustomIconButton from "../../ui/buttons/CustomIconButton";
import CustomButton from "../../ui/buttons/CustomButton";

import { BadgeCheck, CirclePlus, Pencil, Trash2 } from "lucide-react";
import { Input } from '@mantine/core';

type TFeatureListType = {
    features: string[];
    setFeatures: React.Dispatch<React.SetStateAction<string[]>>;
}

const FeatureList = ({ features, setFeatures }: TFeatureListType) => {
    const [openInput, setOpenInput] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<boolean>(false);


    const addNewFeature = () => {
        const trimmedValue = value.trim();

        // لو فاضي
        if (!trimmedValue) {
            setError(true);
            return;
        }

        // لو الميزة موجودة قبل كده
        const isDuplicate = features.some(
            (feature) => feature.trim() === trimmedValue
        );

        if (isDuplicate) {
            setError(true);
            return;
        }

        // إضافة الميزة
        setFeatures((prev) => [...prev, trimmedValue]);

        setOpenInput(false);
        setValue('');
        setError(false);
    };

    const deleteFeatureFromFeatures = (feature: string) => {
        setFeatures((prev) => prev.filter((el) => el !== feature))
    }

    return (
        <div className="feature-list mb-10 mt-8">
            <h5>مميزات الخطة :</h5>
            {features.length < 1 ? (
                <p className="text-center my-4">لا توجد مميزات</p>
            ) : (
                <ul className='my-4'>
                    {features.map((feature) => (
                        <li key={feature} className='flex justify-between items-center mb-5'>
                            <div className='flex gap-3'>
                                <BadgeCheck color='var(--success-color)' />
                                <p>{feature}</p>
                            </div>
                            <CustomIconButton
                                type='button'
                                color='var(--danger-color)'
                                icon={<Trash2 />}
                                onClick={() => deleteFeatureFromFeatures(feature)}
                                radius={5}
                                size='lg'
                            />
                        </li>
                    ))}
                </ul>
            )}

            <div className={`add-feature ${openInput && 'opened'} flex gap-4 items-end`}>
                <div className="w-10/12">
                    <Input.Wrapper label="الميزة الجديدة" error={error && 'الميزة مطلوبة'}>
                        <Input
                            placeholder="الميزة الجديدة"
                            variant='filled'
                            error={error}
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                                setError(false);
                            }}
                        />
                    </Input.Wrapper>
                </div>
                <div className="w-2/12">
                    <CustomIconButton
                        type='button'
                        icon={<CirclePlus />}
                        color="var(--main-color)"
                        radius={5}
                        size="xl"
                        onClick={addNewFeature}
                    />
                </div>
            </div>

            <div className="mt-10">
                <div className="w-5/12">
                    <CustomButton
                        type="button"
                        text="إضافة ميزة"
                        radius="xl"
                        variant="light"
                        icon={<Pencil />}
                        onClick={() => setOpenInput((state) => !state)}
                    />
                </div>
            </div>
        </div>
    );
};

export default FeatureList;