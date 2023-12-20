import imgUrlGmailLogo from'/gmaillogo.png'
import imgUrlsearch from '/search.png'
import { EmailFilter } from '../pages/EmailFilter'

export function AppHeader() {
    
    return (
        <header className="app-header">
            <section className='logo'>
                <img src={imgUrlGmailLogo} alt='gmail logo'></img>
                <h1>Gmail</h1>
            </section>
            <form className="text-filter">
                <section className="input-icon-container">
                        <input className="text-input" onChange={EmailFilter.handleChange} id="textSearch" name="textSearch" 
                            type="text" placeholder="Search email..." />
                        <img className="search-icon" src={imgUrlsearch} alt="search icon"/>
                </section>
            </form>
        </header>
    )
}
