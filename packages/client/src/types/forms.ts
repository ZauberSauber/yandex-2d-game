export interface LoginFormData {
  login: string;
  password: string;
}

export interface SignUpFormData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export type FormDataType = LoginFormData | SignUpFormData;
