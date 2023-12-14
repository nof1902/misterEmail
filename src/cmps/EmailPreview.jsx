// import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import imgUrlclose from '/close.png'
import imgUrlopen from '/open.png'
import imgUrlremove from '/remove.png'

export function EmailPreview({ email , onRemoveEmail}){

    const readModeClass = email.isRead ? 'read' : ''

    return (
        <li className={`email-preview ${readModeClass}`}>
                <section className="starred"></section>
                <Link to={`/emails/${email.id}`}>
                    <h1 className="from">{email.from}</h1>
                    <h1 className="subject">{email.subject}</h1>
                    <h1 className="body">{email.body}</h1>
                    <h1 className="sent-at">{email.sentAt}</h1>
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




