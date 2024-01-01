import { useForm } from "../customHooks/useForm"

export function EmailFilter({ searchBy, onSetSearch }) {
    
    const [filterByToEdit, setFilterByToEdit] = useForm(searchBy , onSetSearch)

    return (
        <form className="email-filter">
            <select name="isRead" onChange={setFilterByToEdit}>
                <option value={undefined}>All</option>
                <option value={true}>Read</option>
                <option value={false}>Unread</option>
            </select>
        </form>
    )
}