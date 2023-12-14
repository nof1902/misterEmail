import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { AboutUs } from './pages/AboutUs'
import { EmailIndex } from './pages/EmailIndex'
import { EmailDetails } from './pages/EmailDetails'
import { ToolBar } from './cmps/ToolBar'
import { EmailCompose } from './cmps/EmailCompose'


export function App() {
 
    return (
        <Router>
            <section className='main-app'>
                <header className='header'>
                    <AppHeader />
                </header>
                <aside className='aside'>
                    <ToolBar />
                </aside>
                {/*  <main className="main container"> */}
                <main className="main">
                    <Routes>
                        <Route path="/" element={<EmailIndex />} />
                        <Route path="/about" element={<AboutUs />}/>
                        <Route path="/emails" element={<EmailIndex />} />
                        <Route path="/emails/:id" element={<EmailDetails />} />
                        <Route path="/emails/new" element={<EmailCompose />} />
                    </Routes>
                </main>
                <footer className='footer'>
                    <AppFooter />
                </footer >
            </section>
        </Router>
    )
}

