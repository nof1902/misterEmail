import { useEffect, useState } from "react"

export function EmailFilter({ filterBy, onSetFilter }) {
    
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    
    useEffect(() => {
        onSetFilter(filterByToEdit)
    },[filterByToEdit])

    function handleChange({ target }) {
        let { name: field, value } = target
        
        switch(value) {
            case 'all':
                value = null
                break;
            case 'read':
                value = true
                break;
            case 'unread':
                value = false
                break
            default:
                break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    return (
        <form className="email-filter">
            <select onChange={handleChange} id="isRead" name="isRead">
                <option value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
            </select>
        </form>
    )

   
}