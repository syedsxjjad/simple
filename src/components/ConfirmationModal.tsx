import React from 'react'
import { Modal } from './Modal'
import Button from './Form/Button'
import { Typography } from './Form/Typography';
import { cn } from '@/utils/utils';
import { Check } from 'lucide-react';


interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    titleClassName?: string;
    subTitle: string;
    subTitleClassName?: string;
    buttonLabel: string;
    bodyClassName?: string;
    icon?: React.ReactNode;
    footer?: React.ReactNode;
    iconClassName?: string;
}
const ConfirmationModal = ({
    isOpen,
    onClose,
    title,
    titleClassName,
    subTitle,
    subTitleClassName,
    buttonLabel,
    icon,
    bodyClassName,
    footer,
    iconClassName,
}: ConfirmationModalProps) => {
    return (
        <div>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                BodyClassName='!p-0 !px-4 !pt-4'
                isCloseIcon
                icon
                footerClassName='sm:px-7 px-3 !pb-8 !pt-2'
                footer={footer ? footer : (
                    <Button
                        fullWidth
                        type="button"
                        variant="default"
                        label={buttonLabel}
                        onClick={onClose}
                    />
                )}
            >
                <div className={cn("flex flex-col gap-y-7 items-center justify-center", bodyClassName)}>

                    <div className={cn("bg-secondary-dark size-20 flex items-center justify-center rounded-full", iconClassName)}>
                        {icon ? icon : (
                            <Check strokeWidth={3} className="text-foreground-white" size={40} />
                        )}
                    </div>
                    <Typography
                        className={cn('text-foreground-white font-sora leading-7 !break-words !text-3xl !font-bold', titleClassName)}
                    >
                        {title}
                    </Typography>
                    {subTitle && (
                        <Typography
                            className={cn('text-placeholder font-sora !text-center sm:w-[90%] w-full leading-7 !break-words !text-lg !font-normal', subTitleClassName)}
                        >
                            {subTitle}
                        </Typography>
                    )}
                </div>
            </Modal>
        </div>
    )
}

export default ConfirmationModal