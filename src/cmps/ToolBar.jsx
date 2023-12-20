import imgUrlinboxOn from '/inbox-on.png'
import imgUrlinboxOff from '/inbox-off.png'
import imgUrlsendOn from '/send-on.png'
import imgUrlsendOff from '/send-off.png'
import imgUrlcompose from'/compose.png'
import imgUrlStarOn from'/starred-on.png'
import imgUrlStarOff from'/starred-off.png'
import imgUrltrash from'/remove.png'
import imgUrlDraft from'/draft.png'


import { NavLink, useParams} from "react-router-dom"

export function ToolBar() {

    const params = useParams();
    
    return (
        <section className="app-sidebar">
            <nav>
                <ul>
                    <li className='nav-item compose'>
                        <NavLink to={`/emails/${params.folder}/new`}>
                            <img src={imgUrlcompose} alt="Inbox-icon"/>
                            <h1>Compose</h1>  
                        </NavLink>
                    </li>
                    <li className='nav-item inbox'>
                        <NavLink to="/emails/inbox">
                            <img src= {imgUrlinboxOff} alt="Inbox-icon"/>
                            <h1>Inbox</h1>
                        </NavLink>
                    </li>
                    <li className='nav-item sent'>
                        <NavLink to="/emails/user-sent-emails">
                            <img src={imgUrlsendOff} alt="send-icon"/>
                            <h1>Sent</h1>
                        </NavLink>
                    </li>
                    <li className='nav-item starred'>
                        <NavLink to="/emails/starred-emails">
                            <img src={imgUrlStarOff} alt="starred-icon"/>
                            <h1>Starred</h1>
                        </NavLink>
                    </li>
                    <li className='nav-item starred'>
                        <NavLink to="/emails/trash">
                            <img src={imgUrltrash} alt="starred-icon"/>
                            <h1>Trash</h1>
                        </NavLink>
                    </li>
                    <li className='nav-item starred'>
                        <NavLink to="/emails/draft">
                            <img src={imgUrlDraft} alt="starred-icon"/>
                            <h1>Draft</h1>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </section>
    )
}


/* 

<li className='nav-item inbox'>
    <NavLink 
        to="/emails/inbox" 
        className={({ isActive }) => isActive ? 'active' : 'inactive'}>
        {({ isActive }) => (
            <img src={isActive ? imgUrlinboxOn : imgUrlinboxOff} alt="Inbox-icon"/>
        )}
        <h1>Inbox</h1>
    </NavLink>
</li>

*/
