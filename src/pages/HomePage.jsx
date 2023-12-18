import { Link } from "react-router-dom";
import imgUrlGooglemail from '/google-mail-logo.png'

export function HomePage() {

    return(
        <section className="home-page">
            <h1>HomePage</h1>
            <ul>
                <li>
                    <Link to="/emails/inbox">
                        <img src={imgUrlGooglemail} alt="link to google email app"/>
                    </Link>
                </li>
            </ul>
        </section>
    )
}