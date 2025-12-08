export interface SignInRequest {
  login: string;
  password: string;
}

export interface SignUpRequest {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface OAuthServiceIdResponse {
  service_id: string;
}

export interface OAuthCodeRequest {
  code: string;
  redirect_uri: string;
}
