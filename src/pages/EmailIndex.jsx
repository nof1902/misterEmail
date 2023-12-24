
import { AppHeader } from '../cmps/AppHeader'
import { SideBar } from '../cmps/SideBar'
import { Outlet, useParams } from "react-router-dom"
import { useEffect, useState} from "react"
import { EmailList } from "../cmps/EmailList"
import { emailService } from '../services/email.service'
import { EmailFilter } from "./EmailFilter"


export function EmailIndex() {
    
    const [emails, setEmails] = useState(null)
    const [newEmail, setNewEmail] = useState({
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
    },[filterBy][emails])

    async function loadEmail(filterBy) {
        const { emails } = await emailService.query(filterBy,params.folder,EmailFilter)
        setEmails(emails)
    }

    async function onRemoveEmail(emailId) {
        try{
            if(params.folder === 'trash'){
                await emailService.remove(emailId)
            } else {
                const emailToRemove = await emailService.getById(emailId);
                emailToRemove.removedAt = Date.now();
                await emailService.save(emailToRemove);
            }
            setEmails((prevEmail) => prevEmail.filter(email => email.id !== emailId))
        } catch (error) {
            console.log('error:', error)
        }
    }

    async function onUpdateEmail(mailToUpdate){
        try{
            const updatedEmail = await emailService.save(mailToUpdate);
            setEmails((prevEmails) => prevEmails.map( email => {
                return email.id === mailToUpdate.id ? updatedEmail : email
            }))
        } catch (error) {
            console.log('error:', error)
        }
    }

    async function onAddEmail(emailToAdd){
        try{
            const addedEmail = await emailService.save(emailToAdd);
            setEmails((prevEmails) => [...prevEmails,addedEmail])
        } catch {
            console.log('error:', error)
        }
    }


    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    const {textSearch, isRead} = filterBy
    if (!emails) return <div>Loading...</div>
    
    return (
        <section className='mail-app'>
            <header>
                <AppHeader filterBy={{ isRead }} onSetFilter={onSetFilter}/>
            </header>
            <aside>
                <SideBar currentNav={params.folder}/>
            </aside>
            <section className="main">
                <EmailFilter filterBy={{ isRead }} onSetFilter={onSetFilter}/>
                {!params.id && <EmailList 
                    emails={emails} 
                    onRemoveEmail={onRemoveEmail}
                    onUpdateEmail={onUpdateEmail}
                    />}
                <Outlet context={{onAddEmail , onUpdateEmail, onRemoveEmail}}/> 
            </section>
        </section>
    )
}
