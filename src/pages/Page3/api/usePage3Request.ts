import { useEffect, useState } from "react";
import type { HistoryItem, HistoryResponse } from "../types";
import axios from "axios";

export const usePage3Request = () => {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const totalCount = history.reduce((sum, item) => sum + item.count, 0);

    useEffect(() => {
        const loadHistory = async () => {
            try {
                setLoading(true);
                setError('');
                const response = await axios.get<HistoryResponse>('/api/v1/history');
                setHistory(response.data.items);
            } catch (err: any) {
                console.error('Ошибка загрузки истории:', err);
                setError('Не удалось загрузить историю отправок');
            } finally {
                setLoading(false);
            }
        };

        loadHistory();
    }, []);

    return {
        history,
        loading,
        error,
        totalCount
    }
}