export interface HistoryItem {
  date: string;
  first_name: string;
  last_name: string;
  count: number;
}

export interface HistoryResponse {
  items: HistoryItem[];
}

export interface Page3HistoryTableProps {
    totalCount: number,
    history: HistoryItem[];
}

export interface StatsCardProps {
  totalCount: number;
  historyLength: number;
}