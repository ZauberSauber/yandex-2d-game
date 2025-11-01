export const FORM_SUBMIT_DELAY = 1000;

export const FORM_IDS = {
  LOGIN: 'loginForm',
  SIGNUP: 'regForm',
} as const;

export const FORM_LABELS = {
  LOGIN: 'ЛОГИН',
  PASSWORD: 'ПАРОЛЬ',
  FIRST_NAME: 'ИМЯ',
  SECOND_NAME: 'ФАМИЛИЯ',
  EMAIL: 'EMAIL',
  PHONE: 'ТЕЛЕФОН',
} as const;

export const FORM_LABELS_PROFILE_INFO = {
  LOGIN: 'Логин',
  FIRST_NAME: 'Имя',
  SECOND_NAME: 'Фамилия',
  DISPLAY_NAME: 'Никнейм',
  EMAIL: 'Email',
  PHONE: 'Телефон',
  BIOGRAPHY: 'Биография',
  OLD_PASSWORD: 'Текущий пароль',
  NEW_PASSWORD: 'Новый пароль',
  REPEAT_NEW_PASSWORD: 'Подтверждения пароля',
} as const;

export const FORM_PLACEHOLDERS = {
  LOGIN: '> Введите ваш логин',
  PASSWORD: '> ********',
  FIRST_NAME: 'Введите ваше имя',
  SECOND_NAME: 'Введите вашу фамилию',
  LOGIN_SIGNUP: 'Введите логин',
  EMAIL: 'Введите email',
  PASSWORD_SIGNUP: 'Введите пароль',
  PHONE: 'Введите телефон',
  BIOGRAPHY: 'Введите вашу биографию',
  DISPLAY_NAME: 'Введите никнейм',
} as const;
