import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { AppFooter } from './cmps/AppFooter'
import { AboutUs } from './pages/AboutUs'
import { EmailIndex } from './pages/EmailIndex'
import { EmailDetails } from './pages/EmailDetails'
import { HomePage } from './pages/HomePage'
import { EmailCompose } from './cmps/EmailCompose'
import { UserMsg } from './cmps/UserMsg'

export function App() {
    
    return (
        <section className="the-app">
            <Router>
                <main className="main-app">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutUs />}/>
                        <Route path="/emails/:folder" element={<EmailIndex />}>
                            <Route path=":id" element={<EmailDetails />} />
                            <Route path="edit" element={<EmailCompose />} />
                        </Route>
                    </Routes>
                </main>
                <UserMsg />
                <AppFooter />
            </Router>
        </section>
    )
}

