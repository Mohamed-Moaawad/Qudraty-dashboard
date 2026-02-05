import './SelectInput.css'
import { Select } from '@mantine/core';
import { Controller, useFormContext } from 'react-hook-form';

type TOption = {
    label: string;
    value: string;
}

type TSelectInputProps = {
    name?: string;
    data: string[] | TOption[];
    label?: string;
    placeholder: string;
    radius: 'sm' | 'md' | 'lg' | 'xl';
    value?: string | null;
    onChange?: (e: string | null) => void;
}

const SelectInput = ({ name, data, label, placeholder, radius, value, onChange, ...rest }: TSelectInputProps) => {
    const form = useFormContext();

    // تحويل البيانات: لو array من النصوص → array من objects
    const formattedData: TOption[] = (data as string[]).every(item => typeof item === 'string')
        ? (data as string[]).map(item => ({ label: item, value: item }))
        : (data as TOption[]);

    if (name && form && form.control) {
        return (
            <Controller
                name={name}
                control={form.control}
                render={({ field, fieldState }) => (
                    <Select className='select-input' size='md' radius={radius} variant='filled'
                        label={label}
                        placeholder={placeholder}
                        data={formattedData}
                        value={field.value ?? null}
                        onChange={(value: string | null) => field.onChange(value ?? '')}
                        error={fieldState.error?.message}
                    />
                )}
            />
        )
    }
    return (
        <Select className='select-input' size='md' radius={radius} variant='filled'
            label={label}
            placeholder={placeholder}
            data={formattedData}
            value={value}
            onChange={onChange}
            searchable
            {...rest}
        />
    );
};


export default SelectInput;