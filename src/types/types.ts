export interface ILoginForm {
  username: string
  password: string
  'g-recaptcha-response': string | null
}

export interface IRegisterForm extends ILoginForm {
  passwordConfirm: string
}

export interface IRefForm extends HTMLFormElement {
  validate: () => Promise<boolean>
}

export interface IErrorData {
  code: number
  message: string
  errors?: {
    [key: string]: {
      [key: string]: string
    }
  }
  errorMessages?: []
}

export interface IUserData {
  email: number
  userID: string
}

export interface IBearerRequest {
  adapter: (arg: string) => void
  baseURL: string
  data: string
  enabled: boolean
  headers: { Accept: string, Authorization: string }
  interval: number
  maxBodyLength: number
  maxContentLength: number
  method: string
  timeout: number
  transformRequest: [(arg: string) => void]
  transformResponse: [(arg: string) => void]
  transitional: { silentJSONParsing: boolean, forcedJSONParsing: boolean, clarifyTimeoutError: boolean }
  url: string
  validateStatus: (arg: string) => void
  xsrfCookieName: string
  xsrfHeaderName: string
}

export interface IBearerResponse {
  config: { url: string, method: string, headers: { [key: string]: string }, baseURL: string, transformRequest: [] }
  data: { email: string, userID: number, token?: string }
  headers: { 'content-length': string, 'content-type': string }
  request: { onreadystatechange: { [key: string]: string }, readyState: number, timeout: number, withCredentials: boolean, upload: XMLHttpRequestUpload }
  status: number
  statusText: string
}

export interface IAuth {
  drivers: {
    http: {
      setHeaders: (req: IBearerRequest, token: { Authorization: string }) => void
      getHeaders: (res: IBearerResponse) => {
        Authorization?: string
        authorization?: string
        'content-length': string
        'content-type': string
      }
    }
  },
  request: (req: IBearerRequest, token: string) => void
  response: (res: IBearerResponse) => string | undefined
}
