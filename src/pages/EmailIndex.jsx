
import { AppHeader } from '../cmps/AppHeader'
import { SideBar } from '../cmps/SideBar'
import { Outlet, useParams } from "react-router-dom"
import { useEffect, useState} from "react"
import { EmailList } from "../cmps/EmailList"
import { emailService } from '../services/email.service'
import { utilService } from '../services/util.service'
import { EmailFilter } from "./EmailFilter"


export function EmailIndex() {
    
    const [emails, setEmails] = useState(null)
    const [newEmail, setNewEmai] = useState({
        to:'',
        ubject:'',
        body:''
    })

    const [sortBy, setSortBy] = useState({
        date: '' 
        // accending
    })

    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())
    const params = useParams()

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

    // function onUpdateEmail(emailId){

    // }
    function onSendEmail(newMailToSend){

        // await emailService.remove(emailId)
        const from = newMailToSend.from;
        const to = newMailToSend.to;
        const subject = newMailToSend.subject;
        const body = newMailToSend.body;

        const newEmail = emailService.createEmail(from,to,subject,body);
        emailService.save(newEmail);
    }

    function onReadEmail(msgToRead){
        console.log(newMsgToSend)
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }


    const {textSearch, isRead} = filterBy
    if (!emails) return <div>Loading...</div>
    
    return (
        <section className='mail-app'>
            <header>
                <AppHeader />
            </header>
            <aside>
                <SideBar currentNav={params.folder}/>
            </aside>
            <section className="main">
                <EmailFilter filterBy={{ textSearch, isRead }} onSetFilter={onSetFilter}/>
                {!params.id && <EmailList emails={emails} onRemoveEmail={onRemoveEmail} />}
                <Outlet context={onSendEmail}/> 
            </section>
        </section>
    )
}