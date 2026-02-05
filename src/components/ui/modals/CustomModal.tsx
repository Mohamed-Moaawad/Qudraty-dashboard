import React from 'react';
import { Modal } from '@mantine/core';

type TCustomModalType = {
    opened: boolean;
    onClose: () => void;
    title: string;
    size?: string | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    children: React.ReactNode;
}

const CustomModal = ({ opened, onClose, title, size, children }: TCustomModalType) => {
    return (
        <Modal opened={opened} onClose={onClose} title={title} centered size={size}>
            {children}
        </Modal>
    );
};

export default CustomModal;