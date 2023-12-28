import { AppHeader } from '../cmps/AppHeader'
import { SideBar } from '../cmps/SideBar'
import { Outlet, useParams, useSearchParams} from "react-router-dom"
import { useEffect, useState} from "react"
import { EmailList } from "../cmps/EmailList"
import { emailService } from '../services/email.service'
import { showSuccessMsg, showErrorMsg} from '../services/event-bus.service'
import { EmailFilter } from "../cmps/EmailFilter"
import { EmailSort } from "../cmps/EmailSort"

export function EmailIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [emails, setEmails] = useState(null)
    const params = useParams()
    const [filterBy, setFilterBy] = useState(emailService.getFilterFromParams(searchParams))
    const [sortBy, setSortBy] = useState(emailService.getDefaultSort(searchParams))

    useEffect(() => {
        setSearchParams(filterBy)
        loadEmail()
    },[filterBy,params.folder,params.new,sortBy])

    async function loadEmail() {
        try{
            const emails = await emailService.query(filterBy,params.folder,sortBy)
            setEmails(emails)
        } catch(error){
            console.log('Had issues loading emails', error)
        }
    }

    async function onRemoveEmail(emailId) {
        try{
            if(params.folder === 'trash'){
                await emailService.remove(emailId)
                showSuccessMsg('Conversation Deleted Forever')
            } else {
                const emailToRemove = await emailService.getById(emailId)
                emailToRemove.removedAt = Date.now();
                await emailService.save(emailToRemove);
                showSuccessMsg('Conversation moved to Trash')
            }
            setEmails((prevEmail) => prevEmail.filter(email => email.id !== emailId))
        } catch(error) {
            showErrorMsg('Could Not Delete Conversation')
            console.log('error:', error)
        }
    }

    async function onUpdateEmail(mailToUpdate){
        try{
            const updatedEmail = await emailService.save(mailToUpdate)
            setEmails((prevEmails) => prevEmails.map( email => {
                return email.id === mailToUpdate.id ? updatedEmail : email
            }))
        } catch(error) {
            console.log('error:', error)
        }
    }

    async function onAddEmail(emailToAdd){
        try{
            const addedEmail = await emailService.save(emailToAdd)
            setEmails((prevEmails) => [...prevEmails,addedEmail])
        } catch(error){
            console.log('error:', error)
        }
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onSetSort(sortBy) {
        setSortBy(prevSort => ({ ...prevSort, ...sortBy }))
    }

    
    const {textSearch, isRead} = filterBy
    const {fieldToSort, sortOrder} = sortBy
    if (!emails) return <div>Loading...</div>
    
    return (
        <section className='mail-app'>
            <header>
                <AppHeader filterBy={{ textSearch }} onSetFilter={onSetFilter}/>
            </header>
            <aside>
                <SideBar currentNav={params.folder}/>
            </aside>
            <section className="main">
                <EmailFilter filterBy={{ isRead }} onSetFilter={onSetFilter}/>
                <EmailSort sortBy={{ fieldToSort, sortOrder }} onSetSort={onSetSort}/>
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
