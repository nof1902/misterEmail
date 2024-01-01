import { Link } from "react-router-dom"
import imgUrlWelcome from "../../public/welcome-photo3.jpg"

export function HomePage() {
    return (
        <section className="home-page">
            <img src={imgUrlWelcome} alt=""/>
            <h1>Welcome To MisterEmail APP</h1>
            <Link className="start-app" to="/emails/inbox">To Email APP</Link>
            <Link className="about-app" to="/about">About The App</Link>
        </section>
    )
}
