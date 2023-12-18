import imgUrlinboxOn from '/inbox-on.png'
import imgUrlinboxOff from '/inbox-off.png'
import imgUrlsendOn from '/send-on.png'
import imgUrlsendOff from '/send-off.png'
import imgUrlcompose from'/compose.png'

import { NavLink } from "react-router-dom";

export function ToolBar() {
    return (
        <section className="app-sidebar">
            <nav>
                <ul>
                    <li className='nav-item compose'>
                        <NavLink to="/emails/new">
                            <img src={imgUrlcompose} alt="Inbox-icon"/>
                            <h1>Compose</h1>  
                        </NavLink>
                    </li>
                    <li className='nav-item inbox'>
                        <NavLink to="/emails">
                            <img src={imgUrlinboxOff} alt="Inbox-icon"/>
                            <h1>Inbox</h1>
                        </NavLink>
                    </li>
                    <li className='nav-item about'>
                        <NavLink to="/about">
                            <h1>About</h1>
                        </NavLink>
                    </li>
                    <li className='nav-item sent'>
                        <NavLink to="/emails">
                            <img src={imgUrlsendOff} alt="Inbox-icon"/>
                            <h1>Sent</h1>
                        </NavLink>
                    </li>
                </ul>
            
            {/* <NavLink to="/">Starred</NavLink>
            <NavLink to="/">Draft</NavLink>
            <NavLink to="/">Trash</NavLink> */}
            </nav>
        </section>
    )
}
