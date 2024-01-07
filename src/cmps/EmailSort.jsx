import { useForm } from "../customHooks/useForm"

export function EmailSort({ searchBy, onSetSearch }) {
    
    const [sortByToEdit, setSortByToEdit] = useForm(searchBy, onSetSearch)

    return (
        <form className="email-sort"> 
            <select name="fieldToSort" onChange={setSortByToEdit} >
                <option value="">Select Field</option>
                <option value="subject">Subject</option>
                <option value="date">Date</option>
                {/* <option value="from">From</option>
                <option value="subject">Subject</option> */}
            </select>

            <select name="sortOrder" onChange={setSortByToEdit} >
                <option value="">Select Order</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
            {/* <button>Sort</button> */}
        </form>
    )

   
}