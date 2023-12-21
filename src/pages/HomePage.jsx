import { Link } from "react-router-dom"

export function HomePage() {

    return (
        <section className="welcome">
            <h1>Welcome To MisterEmail APP</h1>
            <Link className="link-button start-app" to="/emails/inbox">To Mail APP</Link>
            <Link className="link-button about-app" to="/about">About The App</Link>
        </section>

    )
}