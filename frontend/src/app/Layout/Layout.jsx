// React and Router
import { Outlet } from 'react-router-dom';

// Styles
import '@/styles/global.scss';

// Hooks
import { useToastState } from '@/store/useToastState';
import { useErrorState } from '@/store/useErrorState';

// Components
import Header from './Header/Header';
import MobileNavigation from './MobileNavigation/MobileNavigation';
import ModalRoot from '@/components/elements/modals/ModalRoot/ModalRoot';
import Loader from '@/components/ui/Loader/Loader';
import { useAuthQuery } from '@/hooks/query/useUsersQuery';

function Layout() {
    // Error
    const error = useErrorState(state => state.error)

    // Toast
    const isToastShow = useToastState(state => state.isToastShow)
    const message = useToastState(state => state.message)
    const toastDelete = useToastState(state => state.toastDelete)
    const cancelAction = useToastState(state => state.cancelAction);

    // Auth
    const { isLoading } = useAuthQuery()
    const hasToken = !!localStorage.getItem('accessToken');
    

    if (error === 'Network Error') {
        return <div className="error">Network Error</div>
    }

    if (isLoading && hasToken) return <Loader variant="app"/>

    return(
         <div>
            <Header />
            <MobileNavigation />
            <ModalRoot />
            <main className="globalWrapper">
                <div className={`toast ${isToastShow ? 'toastShow' : ''}`}>
                    <p>
                        {message}
                        {toastDelete && <span onClick={() => cancelAction()}>cancel</span>}
                    </p>
                </div>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout;