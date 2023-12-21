import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { emailService } from '../services/email.service'
import imgUrlback from '/back.png'
import imgUrlremove from '/remove.png'
import { ArrowLeft, Trash2} from 'lucide-react'

export function EmailDetails(){

    const [email, setEmail] = useState(null);
    const params = useParams();
    const navigate = useNavigate();

    console.log('EmailDetails ' + params)

    useEffect(() => {
        loadEmail()
    }, [params.folder.id])

    async function loadEmail() {
        try {
            const email = await emailService.getById(params.id)
            setAsRead(email)
            setEmail(email)
        } catch (error) {
            // go to list -> go back
            console.log('error:', error)
        }
    }

   function setAsRead(email){
       email.isRead = true;
        emailService.save(email)
    }

    function onBack() {
        navigate(`/emails/${params.folder}`)
    }

    async function onRemoveEmail(emailId) {
        try {
            await emailService.remove(emailId)
            setEmail(prevEmail => {
                return prevEmail.filter(email => email.id !== emailId)
            })
        } catch (error) {
            console.log('error:', error)
        }

        onBack()
    }

    if (!email) return <div>Loading...</div>
    
    return(
        <section className="email-details">
            <section className="header-page">
                <h1>{email.subject}</h1>
                <section className="actions">
                    <img className="back" src={imgUrlback} alt="Back to Inbox" onClick={onBack} />
                    <img className="remove-email" src={imgUrlremove} alt="Remove message" onClick={() => (onRemoveEmail(email.id)) } />
                </section>
            </section>
            <section className="body-page">
                <p className="body-of-email">{email.body}</p>
                <p className="email-data">this email sent from {'<' +email.from + '>'} at {email.sentAt} to {email.to}</p>
            </section>
        </section>
        
    )
}