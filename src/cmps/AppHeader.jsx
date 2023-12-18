import { utilService } from '../services/util.service'
import imgUrlGmailLogo from'/gmaillogo.png'


export function AppHeader() {
    
    return (
        <header className="app-header">
            <section className='logo'>
                <img src={imgUrlGmailLogo} alt='gmail logo'></img>
                <h1>Gmail</h1>
                {/* Search */}
            </section>
        </header>
    )
}
