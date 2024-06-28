import { CSSTransition, SwitchTransition, TransitionGroup } from 'react-transition-group';
import Header from './components/header/ui';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
    const location = useLocation();

    return (
        <>
        {
            location.pathname === '/login' ? null : <Header />
        }
            <main className='w-full'>
                <TransitionGroup>
                    <CSSTransition
                        key={location.key}
                        classNames="fade"
                        timeout={300}
                        unmountOnExit
                    >
                        <div className='w-full h-full'>
                            <Outlet />
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </main>
        </>
    );
}
