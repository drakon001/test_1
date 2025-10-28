


export interface HistoryItem {
  date: string;
  first_name: string;
  last_name: string;
  count: number;
}

export interface HistoryResponse {
  items: HistoryItem[];
}