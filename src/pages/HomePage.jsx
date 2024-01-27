import { Link } from "react-router-dom"
import imgUrl from '/env-pic.png'

export function HomePage() {
    return (
        <section className="home-page">
            <section className="liner"></section>
            <section className="home-page-content">
                <h1>Welcome To <br></br>MisterEmail APP</h1>
                <Link className="start-app" to="/emails/inbox">click here</Link>
                <img className="icon" src={imgUrl}></img>
            </section>
        </section>
    )
}
