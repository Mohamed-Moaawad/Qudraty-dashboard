import './Inputs.css';
import { Input } from '@mantine/core';
// import { useMask } from '@react-input/mask';


type TInputTimeType = {
    label: string;
    error: boolean;
    errorText?: string;
}

const InputTime = ({ label, error, errorText, ...rest }: TInputTimeType) => {
    // const inputRef = useMask({ mask: '99:99', replacement: { 9: /\d/ } });
    return (
        <Input.Wrapper label={label} error={errorText}>
            <Input
                placeholder='00:00:00'
                error={error}
                size="md"
                variant='filled'
                {...rest}
            />
        </Input.Wrapper>
    );
};

export default InputTime;