

export interface Page2FormData {
  date: string;
  first_name: string;
  last_name: string;
}

export interface Page2BackendError {
  [key: string]: string[];
}

export interface Page2BackendResponse {
  success: boolean;
  data?: Array<{
    date: string;
    name: string;
  }>;
  error?: Page2BackendError;
}

export interface Page2SuccessData {
  date: string;
  name: string;
}

export interface FormFieldProps {
  name: keyof Page2FormData;
  type: "date" | "text";
  data: Page2FormData;
  label: string;
  onChange: (name: string, value: string ) => void;
  errors: Page2BackendError;
  disabled?: boolean;
  id?: string;
  placeholder?:string;
}


export interface FormFiledsMeta {
  label: string,
  name: keyof Page2FormData,
  type: "date" | "text"
}