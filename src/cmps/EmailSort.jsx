import { useEffect, useState } from "react"

export function EmailSort({ sortBy, onSetSort }) {
    
    const [sortByToEdit, setSortByToEdit] = useState(sortBy)

    useEffect(() => {
        onSetSort(sortByToEdit)
    },[sortByToEdit])

    function handleChange({ target }) {
        let { name: field, value } = target;
        setSortByToEdit(prevSort => ({ ...prevSort, [field]: value }))
    }

    return (
        <form className="email-sort"> 
            <select name="fieldToSort" onChange={handleChange} >
                <option value="">Select Field</option>
                <option value="subject">Subject</option>
                <option value="date">Date</option>
                {/* <option value="from">From</option>
                <option value="subject">Subject</option> */}
            </select>

            <select name="sortOrder" onChange={handleChange} >
                <option value="">Select Order</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
            {/* <button>Sort</button> */}
        </form>
    )

   
}