import { utilService } from '../services/util.service'


export function AppHeader() {
    
    return (
        <header className="app-header">
            <section className='logo'>
                <img src={utilService.getImgUrl('../assets/imgs/gmaillogo.png')} alt='gmail logo'></img>
                <h1>Gmail</h1>
            </section>
        </header>
    )
}
