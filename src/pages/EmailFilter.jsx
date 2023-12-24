import { useEffect, useState } from "react"
import { Search } from 'lucide-react'

export function EmailFilter({ filterBy, onSetFilter }) {
    
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    function handleChange({ target }) {
        const { name: field, value } = target;
        
        let filterValue = value;
        switch(filterValue) {
            case 'all':
                filterValue = null;
                break;
            case 'read':
                filterValue = true;
                break;
            case 'unread':
                filterValue = false;
                break;
            default:
                filterValue = value; 
        }
        
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: filterValue }));
    }

    useEffect(() => {
        onSetFilter(filterByToEdit)
    },[filterByToEdit])

    return (
        <form className="email-filter">
            <select className="filter-input filter-select" onChange={handleChange} id="isRead" name="isRead">
                <option value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
            </select>
        </form>
    )

   
}