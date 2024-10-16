import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'
import { LayoutSplashScreen } from '../../../../_metronic/layout/core'
import { AuthModel, UserModel } from './_models'
import * as authHelper from './AuthHelpers'
import { getUserByToken } from './_requests'
import { WithChildren } from '../../../../_metronic/helpers'
import { SnookyClient } from '../../Request'
import { useNavigate } from 'react-router-dom'
import { userAtom } from '../../../../store/jotai/UserAtom'
import { useAtom } from 'jotai'
import { domainAtom } from '../../../../store/jotai/DomainAtom'

type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  currentUser: UserModel | undefined
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
  logout: () => void
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({ children }) => {
  const [user, setUser] = useAtom(userAtom)
  const [domains, setDomains] = useAtom(domainAtom)
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>()

  // Güncellenmiş saveAuth fonksiyonu
  const saveAuth = (authData: AuthModel | undefined) => {
    if (authData) {
      localStorage.setItem('auth', JSON.stringify(authData)) // auth verisini localStorage'a kaydedin
      setAuth(authData) // Context'teki auth durumunu güncelleyin
    } else {
      localStorage.removeItem('auth') // auth bilgisini localStorage'dan kaldırın
      setAuth(undefined) // Context'teki auth durumunu null yapın
    }
  }

  const logout = () => {
    saveAuth(undefined)
    setCurrentUser(undefined)
  }

  useEffect(() => {
    getMe()
  }, [])

  const getMe = async () => {
    const token = "39|xdw4LZk4Akn4G8KLmB9lCePT300KkgbdvNr7vOGr3f08a887"
    if (token) {
      await SnookyClient.SetToken(token)
      const data: any = await SnookyClient.GetMe({ token })
      if (data?.user) {
        setUser(data.user)
        setDomains({
          ...domains,
          domains: data.user.domains || []
        })
      } else {
        setUser({})
      }
    } else {
      setUser({})
    }
  }

  return (
    <AuthContext.Provider value={{ auth, saveAuth, currentUser, setCurrentUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { auth, logout, setCurrentUser } = useAuth()
  const didRequest = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  
  useEffect(() => {
    const requestUser = async (apiToken: string) => {
      try {
        if (!didRequest.current) {
          const { data } = await getUserByToken(apiToken)
          if (data) {
            setCurrentUser(data)
          }
        }
      } catch (error) {
        console.error(error)
        if (!didRequest.current) {
          logout()
        }
      } finally {
        setShowSplashScreen(false)
      }

      return () => (didRequest.current = true)
    }

    if (auth && auth.api_token) {
      requestUser(auth.api_token)
    } else {
      logout()
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export { AuthProvider, AuthInit, useAuth }
