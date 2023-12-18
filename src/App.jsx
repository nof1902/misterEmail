import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { AppFooter } from './cmps/AppFooter'
import { AboutUs } from './pages/AboutUs'
import { EmailIndex } from './pages/EmailIndex'
import { EmailDetails } from './pages/EmailDetails'
import { HomePage } from './pages/HomePage'
import { EmailCompose } from './cmps/EmailCompose'


export function App() {
    
    return (
        <section className="the-app">
            <Router>
                <main className="main-app">
                    <Routes>
                        {/* Home */}
                        {/* <Route path="/" element={<HomePage />} /> */}
                        <Route path="/" element={<EmailIndex />} />
                        {/* folder */}
                        <Route path="/emails/:folder" element={<EmailIndex />}>
                            <Route path="/emails/:folder/new" element={<EmailCompose />} />
                            <Route path="/emails/:folder/:id" element={<EmailDetails />} />
                        </Route>
                        {/* about as */}
                        <Route path="/about" element={<AboutUs />}/>
                    </Routes>
                </main>
                <footer className='footer'>
                    <AppFooter />
                </footer >
            </Router>
        </section>
    )
}

