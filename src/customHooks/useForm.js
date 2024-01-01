import { useState } from "react"
import { useEffectUpdate } from "./useEffectUpdate"

export function useForm(initialState, callBack) {
    
    const [fields, setFields] = useState(initialState)

    useEffectUpdate(() =>{
        callBack(fields)
    },[fields]) 

    function handleChange({ target }) {
        let { name: field, value ,type} = target

        switch(type) {
            case 'number':
            case 'range':
                value = (+value || '')
                break;
            case 'checkbox':
                value = target.checked
            default:
                break;
        }

        setFields(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    return [fields, handleChange]


}