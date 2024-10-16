import { AuthModel } from './_models'

const AUTH_LOCAL_STORAGE_KEY = 'authToken' // Anahtar değerini güncelledim

const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    return
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
  if (!lsValue) {
    return
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel
    if (auth) {
      return auth
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

const setAuth = (auth: AuthModel | undefined) => {
  if (!localStorage) {
    return
  }

  try {
    if (auth) {
      const lsValue = JSON.stringify(auth)
      localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue)
    } else {
      localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY) // Yeni haliyle remove işlemini ekledim
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}

const removeAuth = () => {
  setAuth(undefined) // Direkt setAuth kullanılarak localStorage'dan kaldırılıyor
}

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = 'application/json'
  axios.interceptors.request.use(
    (config: { headers: { Authorization: string } }) => {
      const auth = getAuth()
      if (auth && auth.api_token) {
        config.headers.Authorization = `Bearer ${auth.api_token}`
      }

      return config
    },
    (err: any) => Promise.reject(err)
  )
}

export { getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY }
