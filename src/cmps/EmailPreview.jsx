// import { useEffect, useState, useRef } from "react"
import { Link, useParams} from "react-router-dom"
import imgUrlclose from '/close.png'
import imgUrlopen from '/open.png'
import imgUrlremove from '/remove.png'

import {MailOpen,Mail, Star, Trash2} from 'lucide-react'
import { useEffect, useState } from "react"


export function EmailPreview({ email , onRemoveEmail, onUpdateEmail}){
    
    const params = useParams();

    function RenderTime(sentAt) {
        const dateObject = new Date(sentAt);
    
        if (!isNaN(dateObject.getTime())) {
            const months = [
                "Jan", "Feb", "Mar", "Apr",
                "May", "Jun", "Jul", "Aug", "Sep",
                "Oct", "Nov", "Dec"
            ];
            
            return `${months[dateObject.getMonth()]} ${dateObject.getDate()}`;
        } else {
            return sentAt;
        }
    }

    async function onHandleStar(){
        try{
            const updatedEmail = { ...email, isStarred: !email.isStarred }
            onUpdateEmail(updatedEmail)
        } catch {
            console.log('error:', error)
        }
        onUpdateEmail(email.id)
    }

    async function onHandleOpen(){
        try {
            const updatedEmail = { ...email, isRead: !email.isRead };
            onUpdateEmail(updatedEmail)
        } catch (error) {
            console.log('error:', error)
        }
    }
    

    const readModeClass = email.isRead ? 'read' : ''
    const star = email.isStarred ? 'none' : 'rgb(240, 195, 14)';

   
    return (
        <li className={`email-preview ${readModeClass}`}>
            <Star size={20} strokeWidth={1.2} onClick={onHandleStar} fill={star}/>
            <Link to={`/emails/${params.list}/${email.id}`}>
                <h1 className="from">{email.from}</h1>
                <h1 className="subject">{email.subject}</h1>
                <h1 className="body">{email.body.substring(0, 25)}</h1>
                <h1 className="sent-at">{RenderTime(email.sentAt)}</h1>
            </Link>
            <section className="actions-email">   
                { email.isRead ? <MailOpen color={'black'} size={25} strokeWidth={1.2} onClick={onHandleOpen} /> : 
                            <Mail color={'black'} size={25} strokeWidth={1.2} onClick={onHandleOpen} />}
                <Trash2 color={'black'} size={25} strokeWidth={1.2} onClick={() => onRemoveEmail(email.id)}/>
            </section>
        </li>
    )
}




