
import { useEffect, useState } from "react"
import { eventBusService } from "../services/event-bus.service"
import {X} from 'lucide-react'

export function UserMsg() {

    const [msg, setMsg] = useState({ txt: '', type: ''})

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
            setMsg(msg)
            setTimeout(() => {
                onCloseMsg()
            } , 3000)
        })
        return unsubscribe

    } ,[])

    function onCloseMsg(){
        setMsg(null)
    }

    if (!msg || !msg.txt) return <></>

    return(
        <section className={"user-msg " + msg.type}>
            <p>{msg.txt}</p>
            <section className='button-marg'>
                <button onClick={onCloseMsg}>
                    <X />
                </button>
            </section>
        </section>
    )
   
}