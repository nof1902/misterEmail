
import { File, Inbox, Pencil, SendHorizontal, Star, Trash2} from 'lucide-react'
import { useParams, NavLink, Link } from "react-router-dom"

export function SideBar({ }) {

    const params = useParams()

    const navItems = [
        {
            folder: 'inbox',
            title: 'Inbox',
            icon: (<Inbox size={20} strokeWidth={1.5}/>)
        },
        {
            folder: 'starred',
            title: 'Starred',
            icon: (<Star size={20} strokeWidth={1.5}/>)
        },
        {
            folder: 'sent',
            title: 'Sent',
            icon: (<SendHorizontal size={20} strokeWidth={1.5}/>)
        },
        {
            folder: 'draft',
            title: 'Draft',
            icon: (<File size={20} strokeWidth={1.5}/>)
        },
        {
            folder: 'trash',
            title: 'Trash',
            icon: (<Trash2 size={20} strokeWidth={1.5}/>)
        },
    ]

    return (
        <nav className="sidebar">
            <ul>
                <li className='compose'>
                    <Link to={`/emails/${params.folder}/:compose=new`}>
                        <Pencil size={20} strokeWidth={1.5}/>
                        <span>Compose</span>  
                    </Link>
                </li>
            {navItems.map((navItem, index) => (
                <li key={index} className='nav-item'>
                    <NavLink to={`/emails/${navItem.folder}`}>
                        {navItem.icon}
                        <span>{navItem.title}</span>
                    </NavLink>
                </li>
                ))}
            </ul>
        </nav>
    )
}
