import { Button } from "@mantine/core"

type TCustomButtonType = {
    type: 'button' | 'submit' | 'reset';
    text: string;
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
    size?: "lg" | "md" | "sm" | "xl" | "xs" | "compact-lg" | "compact-md" | "compact-sm" | "compact-xl" | "compact-xs";
    variant: 'filled' | 'light' | 'default';
    icon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    radius: 'sm' | 'md' | 'lg' | 'xl';
    color?: string;
};

const CustomButton = ({ type, text = 'ارسال', disabled, loading, onClick, size, variant, icon, rightIcon, radius, color = "var(--main-color)" }: TCustomButtonType) => {
    return (
        <Button fullWidth
            type={type}
            disabled={disabled}
            onClick={onClick}
            loading={loading}
            size={size}
            variant={variant}
            color={color}
            leftSection={icon}
            rightSection={rightIcon}
            radius={radius}
        >
            {text}
        </Button>
    );
};

export default CustomButton;