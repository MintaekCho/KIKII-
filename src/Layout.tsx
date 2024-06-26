import Header from './components/header/ui';
import { Outlet, useLocation } from 'react-router-dom';
import { CSSTransition, SwitchTransition, TransitionGroup } from 'react-transition-group';

export default function Layout() {
    const location = useLocation();
    console.log(location);


    return (
        <>
        {
            location.pathname === '/login' ? null : <Header />
        }
            <main className='w-full h-full'>
                <TransitionGroup>
                    <CSSTransition key={location.key} classNames="w-full h-full fade" timeout={300}>
                        <div className='w-full h-full'>
                            <Outlet />
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </main>
        </>
    );
}
