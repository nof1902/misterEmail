import { NavLink, useParams, useNavigate} from "react-router-dom"

export function NavItem({folder , icon}){
    
    const params = useParams();
    const navigate = useNavigate();

    // console.log(params)
    // console.log(navigate)

    return(
        <li className='nav-item'>
            <NavLink to={`/emails/${folder}`}>
                {icon}
                <h1>{folder}</h1>
            </NavLink>
        </li>
    )
}

