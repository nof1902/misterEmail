
import { Link, useParams} from "react-router-dom"
import {MailOpen,Mail, Star, Trash2} from 'lucide-react'

export function EmailPreview({ email , onRemoveEmail, onUpdateEmail, onToggleStar}){
    
    const params = useParams()
    
    function RenderTime(sentAt) {

        const dateObject = new Date(sentAt)
    
        if (!isNaN(dateObject.getTime())) {
            const months = [
                "Jan", "Feb", "Mar", "Apr",
                "May", "Jun", "Jul", "Aug", "Sep",
                "Oct", "Nov", "Dec"
            ];
            
            return `${months[dateObject.getMonth()]} ${dateObject.getDate()}`
        } else {
            return sentAt
        }
    }

    async function handleUpdate(property) {
        try {
            const updatedEmail = { ...email, [property]: !email[property] }
            if(property === 'isStarred'){
                onToggleStar(email.id)
            }
            onUpdateEmail(updatedEmail)
        } catch (error) {
            showErrorMsg(`Could Not Set Email As You Wish`)
            console.log('error:', error)
        }
    }

    const readModeClass = email.isRead ? 'read' : ''

    return (
        <li className={`email-preview ${readModeClass}`}>
            { email.isStarred ? 
                <Star size={20} strokeWidth={1.2} onClick={() => handleUpdate('isStarred')} fill={'rgb(240, 195, 14)'}/> : 
                <Star size={20} strokeWidth={1.2} onClick={() => handleUpdate('isStarred')} fill={'none'}/> }
            <Link to={`/emails/${params.folder}/${email.id}`}>
                <h1 className="from">{email.from}</h1>
                <h1 className="subject">{email.subject.substring(0, 10)}</h1>
                <h1 className="body">{email.body.substring(0, 30)}</h1>
                <h1 className="sent-at">{RenderTime(email.sentAt)}</h1>
            </Link>
            <section className="actions-email">   
                { email.isRead ? <MailOpen color={'black'} size={25} strokeWidth={1.2} onClick={() => handleUpdate('isRead')} /> : 
                            <Mail color={'black'} size={25} strokeWidth={1.2} onClick={() => handleUpdate('isRead')} />}
                <Trash2 color={'black'} size={25} strokeWidth={1.2} onClick={() => onRemoveEmail(email.id)}/>
            </section>
        </li>
    )
}




