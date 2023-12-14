import { useEffect, useState } from "react"
import imgUrlsearch from '/search.png'

export function EmailFilter({ filterBy, onSetFilter }) {
    
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    function handleChange(event) {
        const { name, value } = event.target;
        
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
        
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [name]: filterValue }));
    }

    useEffect(() => {
        onSetFilter(filterByToEdit)
    },[filterByToEdit])

    return (
        <form className="email-filter">
            <section className="input-icon-container">
                <input className="filter-input text-filter" onChange={handleChange} id="textSearch" name="textSearch" 
                    type="text" placeholder="Search email..." />
                <img className="search-icon" src={imgUrlsearch} alt="search icon"/>
            </section>
            <select className="filter-input filter-select" onChange={handleChange} id="isRead" name="isRead">
                <option value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
            </select>
        </form>
    )

   
}