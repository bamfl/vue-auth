import Axios from 'axios'
import { Notify } from 'quasar'
import { IErrorData } from 'src/types/types'

const config = {
  baseURL: `${process.env.API_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
}

const httpClient = Axios.create(config)

const checkErrors = (data: IErrorData) => {
  console.log(data)
  if (data && Array.isArray(data.errorMessages)) {
    if (data.errorMessages.length > 0) {
      showError(data)
      return true
    }
  }
  return false
}

function showError(data: IErrorData) {
  console.log(data)
  if (data && data.message && !data.errors) {
    Notify.create({
      color: 'negative',
      message: 'Ошибка обработки запроса! Попробуйте позднее.',
      icon: 'report_problem',
      position: 'top',
      avatar: '',
      timeout: 5000
    })
  }

  if (data && data.errors) {
    for (const index in data.errors) {
      for (const subIndex in data.errors[index]) {
        Notify.create({
          color: 'negative',
          message: data.errors[index][subIndex],
          icon: 'report_problem',
          position: 'top',
          avatar: '',
          timeout: 5000
        })
      }
    }
    return
  }

  if (!data) {
    Notify.create({
      color: 'negative',
      message: 'Ошибка загрузки данных! Попробуйте позже...',
      icon: 'report_problem',
      position: 'top',
      avatar: '',
      timeout: 5000
    })
  }
}

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { data } = error?.response || {}
    console.error(data);

    switch (error.response?.status) {
      case 401: {
        showError(data || { message: 'Неавторизован' })
        break
      }
      case 403: {
        showError(data || { message: 'Нет доступа' })
        break
      }
      case 404: {
        showError(data || { message: 'Не найдено' })
        break
      }
      case 400:
      case 422: {
        if (!checkErrors(data)) {
          showError(data)
        }
        break
      }
      case 500: {
        showError(data)
        break
      }
      default:
        showError(data)
    }
    return Promise.reject(error)
  }
)

export default httpClient
