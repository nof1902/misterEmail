import { useState, useEffect} from "react"
import { useNavigate, useParams, useOutletContext, Link} from "react-router-dom"
import { emailService } from '../services/email.service'
import {X} from 'lucide-react'


export function EmailCompose(){
    
    const [email, setEmail] = useState(emailService.createEmail())
    const { onAddEmail, onUpdateEmail } = useOutletContext()
    const navigate = useNavigate();
    const params = useParams();
 
    // if exist ,load the prev
    useEffect(() => {
        if (params.id) loadRobot()
    }, [])

    async function loadRobot() {
        try {
            const email = await robotService.getById(params.id)
            setRobot(email)
        } catch (err) {
            navigate(`/emails/${params.folder}`);
            console.log('Had issues loading robot', err);
        }
    }

    function handleChange({ target }){
        let { name: field, value} = target
        setEmail((prevEmail) => ({ ...prevEmail, [field]: value }))
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try{
            email.sentAt = new Date();
            if(params.id) await onUpdateEmail(email)
            else onAddEmail(email)
        } catch {
            console.log('error:', error)
        }
        navigate(`/emails/${params.folder}`);
    }

    // email that is is being composed is auto saved every 5
    // seconds and can be viewed in the draft folder until sent 
    
    return(
        <section className="new-msg-container">
            <section className="header-new-msg">
                <h1>New Message</h1>
                <section className="actions">
                    <Link to={`/emails/${params.folder}`}>
                        <button className="close">
                            <X size={15}/>
                        </button>
                    </Link>
                </section>
            </section>

            <form className="the-msg" onSubmit={handleSubmit}>
                <input id="from" placeholder="From" name="from" value={email.from} onChange={handleChange}></input>
                <input id="to" placeholder="To" name="to" value={email.to} onChange={handleChange}></input>
                <input id="subject" placeholder="Subject" name="subject" value={email.subject} onChange={handleChange}></input>
                <textarea id="body" name="body" value={email.body} onChange={handleChange}></textarea>
                <button type="submit" className="send">Send</button> 
            </form>
    </section>
    )
}