// import { useEffect, useState, useRef } from "react"
import { Link, useParams} from "react-router-dom"
import imgUrlclose from '/close.png'
import imgUrlopen from '/open.png'
import imgUrlremove from '/remove.png'

export function EmailPreview({ email , onRemoveEmail}){

    const readModeClass = email.isRead ? 'read' : ''
    const params = useParams();

    function RenderTime(sentAt) {
        // Attempt to parse the sentAt string as a Date object if it's not already
        const dateObject = new Date(sentAt);
    
        // Check if the date object is valid
        if (!isNaN(dateObject.getTime())) {
            const months = [
                "Jan", "Feb", "Mar", "Apr",
                "May", "Jun", "Jul", "Aug", "Sep",
                "Oct", "Nov", "Dec"
            ];
            
            // Format the date into a 'Mon DD' format
            return `${months[dateObject.getMonth()]} ${dateObject.getDate()}`;
        } else {
            return sentAt;
        }
    }
    
    
    
    return (
        <li className={`email-preview ${readModeClass}`}>
                <section className="starred"></section>
                <Link to={`/emails/${params.list}/${email.id}`}>
                    <h1 className="from">{email.from}</h1>
                    <h1 className="subject">{email.subject}</h1>
                    <h1 className="body">{email.body.substring(0, 25)}</h1>
                    <h1 className="sent-at">{RenderTime(email.sentAt)}</h1>
                    <section className="isRead">
                        { email.isRead ? (<img src={imgUrlopen} alt="Mark as read" />
                        ) : (
                            <img src={imgUrlclose} alt="Mark as unread" /> 
                            )}
                    </section>
                </Link>
                <section className="remove-email">
                        <img src={imgUrlremove} alt="Remove message" onClick={() => onRemoveEmail(email.id)} />
                </section>
        </li>
    )
}




