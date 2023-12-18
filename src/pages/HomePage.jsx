import { Link } from "react-router-dom";

export function HomePage() {

    return(
        <section className="home-page">
            <h1>HomePage</h1>
            <Link to="/emails/:folder">Gmail</Link>
        </section>
    )
}