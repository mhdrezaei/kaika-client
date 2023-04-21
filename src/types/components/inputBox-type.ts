import { ChangeEvent } from "react";

export interface InputProps {
  id?: string;
  name: string;
  label: string;
  type: string;
  register: any;
  error?: any;
  disabled: boolean;
  value?: string | number | FormData;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
