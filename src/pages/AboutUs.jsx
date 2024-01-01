import { Link } from "react-router-dom"

export function AboutUs() {
    
    return (
        <section className="about-us">
                <h2>We are all about Emails</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt voluptates odit quibusdam id
                     at veritatis adipisci alias corrupti quia incidunt. Et hic optio voluptas nesciunt laudantium voluptate. Quas, quod explicabo.
                    Lorem ipsum dolor sit amet  temporibus porro pariatur totam hic. Nobis,
                    cupiditate veritatis? Similique cum corporis tempore?</p>
                <Link className="start-app" to="/emails/inbox">To Mail APP</Link>
                <Link className="back" to="/">Back</Link>
        </section>
    )
}
