import { useEffect, useState } from "react"
import { useNavigate, useParams, useOutletContext } from "react-router-dom"
import { emailService } from '../services/email.service'
import { ArrowLeft, Trash2} from 'lucide-react'

export function EmailDetails()
{
    const [email, setEmail] = useState(null);
    const navigate = useNavigate();
    const { folder, id } = useParams();
    const { onRemoveEmail, onUpdateEmail} = useOutletContext()

    useEffect(() => {
        loadEmail()
    }, [folder.id])

    async function loadEmail() {
        try {
            let email = await emailService.getById(id)
            email.isRead = true
            onUpdateEmail(email)
            setEmail(email);
        } catch (error) {
            onBack();
            console.log('error:', error)
        }
    }

    async function onHandleRemoveEmail(emailId) {
        onRemoveEmail(emailId);
        onBack();
    }

    function onBack() {
        navigate(`/emails/${folder}`)
    }

    if (!email) return <div>Loading...</div>
    
    return(
        <section className="email-details">
            <section className="header-page">
                <h1>{email.subject}</h1>
                <section className="actions">
                    <ArrowLeft onClick={onBack}/>
                    <Trash2 onClick={() => onHandleRemoveEmail(email.id)}/>
                </section>
            </section>
            <section className="body-page">
                <p className="body-of-email">{email.body}</p>
                <p className="email-data">this email sent from {'<' +email.from + '>'} at {email.sentAt} to {email.to}</p>
            </section>
        </section>
        
    )
}