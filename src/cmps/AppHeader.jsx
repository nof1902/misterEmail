import imgUrlGmailLogo from'/google-mail-logo.png'
import { Search, AlignJustify } from 'lucide-react'
import { useEffect, useState } from 'react'


export function AppHeader({ filterBy, onSetFilter }) {
    
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    },[filterByToEdit])

    function handleChange({ target }){
        const { name: field, value } = target;
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }
    
    return (
        <header className="app-header">
            <section className='button-marg'>
                <AlignJustify />
            </section>
            <img src={imgUrlGmailLogo} alt='gmail logo'></img>
            <form className="search-container">
                <button className='search-btn'>
                    <Search size={20}/>
                </button>
                <input className="search-input" 
                        onChange={handleChange} 
                        id="textSearch" 
                        name="textSearch" 
                        type="text" 
                        value={filterByToEdit.textSearch} 
                        /* the value displayed in the input will 
                        always be the value in the component's state, 
                        and updating that state will update the input display. */
                        placeholder="Search email..." 
                        />
            </form>
        </header>
    )
}
