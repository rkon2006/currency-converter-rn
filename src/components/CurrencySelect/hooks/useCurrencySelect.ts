import { useState } from "react";

interface UseCurrencySelectParams {
    value: string;
    onChange: (value: string) => void;
}

export const useCurrencySelect = ({ onChange, value }: UseCurrencySelectParams) => {
    const [open, setOpen] = useState(false);
    const [pending, setPending] = useState(value);

    const handleOpen = () => {
        setPending(value);
        setOpen(true);
    };

    const handleDone = () => {
        onChange(pending);
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleSetPending = (value: string) => {
        setPending(value);
    }

    return { open, pending, handleOpen, handleDone, handleCancel, handleSetPending };
}
