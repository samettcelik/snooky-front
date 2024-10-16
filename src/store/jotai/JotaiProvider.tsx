import { Provider } from 'jotai'
import { WithChildren } from '../../_metronic/helpers'
import { appStore } from './store'

const JotaiProvider = ({ children }: WithChildren) => {
    return (
        <Provider store={appStore}>
            {children}
        </Provider>
    )
}

export default JotaiProvider
