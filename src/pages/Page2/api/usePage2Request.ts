import { useCallback, useState, type FormEvent } from "react";
import type { Page2BackendError, Page2BackendResponse, Page2FormData, Page2SuccessData } from "../types";
import axios from "axios";


export const usePage2Request = (formData: Page2FormData  ) => {

    const [errors, setErrors] = useState<Page2BackendError>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [successData, setSuccessData] = useState<Page2SuccessData[]>([]);

    const handleSubmit = useCallback(async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setSuccessData([]);

        try {
            const response = await axios.post<Page2BackendResponse>('/api/v1/submit', formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.data.success && response.data.data) {
                setSuccessData(response.data.data);
            } else if (response.data.error) {
                setErrors(response.data.error);
            }
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                const backendError = error.response.data as Page2BackendResponse;
                if (backendError.error) {
                    setErrors(backendError.error);
                }
            } else {
                setErrors({
                    general: ['Произошла ошибка при отправке формы. Попробуйте еще раз.']
                });
            }
        } finally {
            setLoading(false);
        }
    }, [formData,]);

    return {
        handleSubmit,
        loading,
        errors,
        setErrors,
        data: successData 
    }

} 