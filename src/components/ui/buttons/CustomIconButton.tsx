import { ActionIcon } from '@mantine/core'


type TCustomIconButton = {
    type?: "button" | "submit" | "reset";
    icon: React.ReactNode;
    radius: number;
    size: 'lg' | 'xl';
    color: string;
    onClick?: () => void;

}

const CustomIconButton = ({ type, icon, radius, size, color, onClick }: TCustomIconButton) => {
    return (
        <ActionIcon type={type} variant="light" size={size} radius={radius} color={color} onClick={onClick}>
            {icon}
        </ActionIcon>
    )
}

export default CustomIconButton