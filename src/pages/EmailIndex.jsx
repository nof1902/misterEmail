import { useEffect, useState } from "react"
import { EmailList } from "../cmps/EmailList"
import { emailService } from '../services/email.service'
import { EmailFilter } from "./EmailFilter"

export function EmailIndex() {
    
    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())

    useEffect(() => {
        loadEmail(filterBy)
    },[filterBy])

    async function loadEmail(filterBy) {
        const emails = await emailService.query(filterBy)
        setEmails(emails)
    }

    async function onRemoveEmail(emailId) {
        try {
            await emailService.remove(emailId)
            setEmails(prevEmail => {
                return prevEmail.filter(email => email.id !== emailId)
            })
        } catch (error) {
            console.log('error:', error)
        }
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    const {textSearch, isRead} = filterBy
    if (!emails) return <div>Loading...</div>
    

    return (
        <section className=".email-details .container">
            <EmailFilter filterBy={{ textSearch, isRead }} onSetFilter={onSetFilter}/>
            <EmailList emails={emails} onRemoveEmail={onRemoveEmail} />
        </section>
    )
}
