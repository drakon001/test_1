import { useEffect, useState } from "react";
import type { Page2FormData } from "../types";



export const useUrlForm = (
    formData:Page2FormData, 
    setFormData: React.Dispatch<React.SetStateAction<Page2FormData>>) => {
    
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const restoredData: Page2FormData = {
            date: urlParams.get('date') || '',
            first_name: urlParams.get('first_name') || '',
            last_name: urlParams.get('last_name') || ''
        };
        setFormData(restoredData);
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;
        const urlParams = new URLSearchParams();
        if (formData.date) urlParams.set('date', formData.date);
        if (formData.first_name) urlParams.set('first_name', formData.first_name);
        if (formData.last_name) urlParams.set('last_name', formData.last_name);
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        window.history.replaceState(null, '', newUrl);
    }, [formData, isMounted]);

}