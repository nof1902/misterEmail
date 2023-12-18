import { useNavigate } from "react-router-dom"
import imgUrlclose from '/close-window.png'

export function EmailCompose(){
    
    const navigate = useNavigate();

    function onClose() {
        navigate('/emails')
    }

    return(
        <section className="new-msg-container">
            <section className="header-new-msg">
                <h1>New Message</h1>
                <section className="actions">
                    <button className="close" onClick={(onClose)}>
                        <img src={imgUrlclose} alt="Close and save" />
                    </button>
                </section>
            </section>
            <form className="the-msg">
                <div className="separate">
                    <input className="from" id="from" placeholder="From"></input>
                </div>
                <div className="separate">
                    <input className="to" id="to" placeholder="To"></input>
                </div>
                <div className="separate">
                    <input className="subject" id="subject" placeholder="Subject"></input>
                </div>
                <div className="separate">
                    <textarea id="body"></textarea>
                </div>
                <button className="send">Send</button> 
                {/* onclick -> the email will saved at storage (maybediffernt one)
                and will be component that render (get all send emails) */}
            </form>
    </section>
    )
}