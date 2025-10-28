import { Outlet } from 'react-router'
import { HeaderComponent, FooterComponent } from '~/widgets';
import { Main } from '~/shared';

const Layout = () => {
    return (
        <section className='grid min-h-[100dvh] grid-rows-[auto_1fr_auto]'>
            <HeaderComponent />
            <Main>
                <Outlet/>
            </Main>
            <FooterComponent />
        </section>
    )
}

export default Layout;