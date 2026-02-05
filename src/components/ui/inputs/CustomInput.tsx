import './Inputs.css';
import { Input } from "@mantine/core"


type TInputType = {
    type: 'text' | 'email' | 'url' | 'number' | 'file';
    placeholder?: string;
    leftSection?: React.ReactNode;
    rightSection?: React.ReactNode;
    error?: boolean;
    errorText?: string | undefined;
    readOnly?: boolean;
    label?: string;
    value?: string | number;
    required?: boolean;
}

const CustomInput = ({ type, placeholder, leftSection, rightSection, error, errorText, readOnly, label, value, required, ...rest }: TInputType) => {
    return (
        <Input.Wrapper label={label} error={errorText}>
            <Input
                readOnly={readOnly}
                type={type}
                // radius="md"
                placeholder={placeholder}
                error={error}
                leftSection={leftSection}
                rightSection={rightSection}
                value={value}
                size="md"
                variant='filled'
                required={required}
                {...rest}
            />
        </Input.Wrapper>
    );
};

export default CustomInput;