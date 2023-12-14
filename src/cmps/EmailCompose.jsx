
export function EmailCompose(){

    return(
        <section className="new-msg-container">
        <section className="header-new-msg">
            <h1>new message</h1>
            <section className="actions">
                {/* close + wide-mode + minimization */}
            </section>
        </section>
        <form className="the-msg">
            <input className="from" id="from" placeholder="from - put your mail"></input>
            <input className="to" id="to" placeholder="to"></input>
            <input className="subject" id="subject" placeholder="subject"></input>
            <input className="body" id="body" ></input>
            <button className="send">Send</button>
        </form>
    </section>
    )
}