import { useNavigate, useParams, useOutletContext} from "react-router-dom"
import imgUrlclose from '/close-window.png'

export function EmailCompose(){
    
    // const [email, setEmail] = useState(create email)
    
    const navigate = useNavigate();
    const params = useParams();
    const { onSendEmail } = useOutletContext();

    console.log('hey')
    function onClose() {
        navigate(`/emails/${params.folder}`)
    }

    function handleSubmit(event) {
        event.preventDefault();
        const formElements = event.target.elements;
        onSendEmail({
            from: formElements.from.value,
            to: formElements.to.value,
            subject: formElements.subject.value,
            body: formElements.body.value
        });
        onClose();
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

            <form className="the-msg" onSubmit={handleSubmit}>
                <input className="from" id="from" placeholder="From"></input>
                <input className="to" id="to" placeholder="To"></input>
                <input className="subject" id="subject" placeholder="Subject"></input>
                <textarea id="body"></textarea>
                <button type="submit" className="send">Send</button> 
            </form>
    </section>
    )
}