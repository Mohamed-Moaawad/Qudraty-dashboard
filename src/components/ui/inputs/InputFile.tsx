import './Inputs.css';
import { FileInput, InputWrapper, type FileInputProps } from "@mantine/core"


type TInputType = FileInputProps & {
    placeholder: string;
    label: string;
    leftSection?: React.ReactNode;
    rightSection?: React.ReactNode;
    onChange?: (file: File | null) => void;
    accept?: string;
    error?: boolean;
    errorText?: string;
};

const InputFile = ({ placeholder, leftSection, rightSection, onChange, accept, error, errorText, label, ...rest }: TInputType) => {
    return (
        <InputWrapper error={errorText}>
            <FileInput className='file-input' clearable label={label} placeholder={placeholder}
                variant="filled"
                leftSection={leftSection}
                rightSection={rightSection}
                onChange={onChange}
                accept={accept}
                error={error}
                {...rest}
            />
        </InputWrapper>
    );
};

export default InputFile;