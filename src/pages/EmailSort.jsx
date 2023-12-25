import { useEffect, useState } from "react"

export function EmailSort({ sortBy, onSetSort }) {
    
    
    const [sortByToEdit, setSortByToEdit] = useState(sortBy)

    useEffect(() => {
        onSetSort(sortByToEdit)
    },[sortByToEdit])

    function handleChange({ target }) {
        const { name: field, value } = target;
        setSortByToEdit(prevSort => ({ ...prevSort, [field]: value }));
    }

    return (
        <form className="email-sort">
            <select name="sortField" onChange={handleChange} >
                <option value="">Select Field</option>
                <option value="true">Title</option>
                <option value="true">Date</option>
                {/* <option value="from">From</option>
                <option value="subject">Subject</option> */}
            </select>

            <select name="sortOrder" onChange={handleChange} >
                <option value="">Select Order</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </form>
    )

   
}