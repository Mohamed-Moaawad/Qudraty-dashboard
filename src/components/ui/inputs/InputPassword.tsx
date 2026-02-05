import './Inputs.css';
import { Input, PasswordInput } from '@mantine/core';


type TypeInputPassword = {
    placeholder: string;
    icon?: React.ReactNode;
    error: boolean;
    errorText: string | undefined;
    label: string;
};

const InputPassword = ({ placeholder, icon, error, errorText, label, ...rest }: TypeInputPassword) => {
    return (
        <Input.Wrapper error={errorText}>
            <PasswordInput
                label={label}
                leftSection={icon}
                placeholder={placeholder}
                error={error}
                size='md'
                variant='filled'
                {...rest}
            />
        </Input.Wrapper>
    );
};

export default InputPassword;