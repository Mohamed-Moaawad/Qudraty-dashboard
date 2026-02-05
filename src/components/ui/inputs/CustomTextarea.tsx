import { Input, Textarea } from "@mantine/core";


type TTextareaType = {
    label: string;
    placeholder: string;
    leftSection?: React.ReactNode;
    rightSection?: React.ReactNode;
    error?: boolean;
    errorText?: string | undefined;
    readOnly?: boolean;
    value?: string | number;
    onChange?:  (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
}



const CustomTextarea = ({ placeholder, leftSection, rightSection, error, errorText, readOnly, label, value, onChange, required, ...rest }: TTextareaType) => {
    return (
        <Input.Wrapper label={label} error={errorText}>
            <Textarea
                styles={{
                    input: { textAlign: 'right' },
                }}
                readOnly={readOnly}
                placeholder={placeholder}
                error={error}
                leftSection={leftSection}
                rightSection={rightSection}
                value={value}
                onChange={onChange}
                size="md"
                variant='filled'
                required={required}
                {...rest}
            />
        </Input.Wrapper>
    )
}

export default CustomTextarea