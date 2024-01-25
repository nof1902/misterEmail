import { useState, useEffect } from "react"
import {
  useNavigate,
  useParams,
  useOutletContext,
  Link,
  useLocation
} from "react-router-dom"
import { emailService } from "../services/email.service"
import { X, Maximize2, Minimize2, Minus } from "lucide-react"
import { useEffectUpdate } from "../customHooks/useEffectUpdate"
import { useDebounce } from "../customHooks/useDebounce"

export function EmailCompose() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const composedId = queryParams.get('edit')
    const [email, setEmail] = useState(emailService.getDefaultEmail())
    const debouncedEmail = useDebounce(email)
    const { onAddEmail, onUpdateEmail} = useOutletContext()
    const navigate = useNavigate()
    const params = useParams()
    const [screenState, setScreenState] = useState({
        isFull: false,
        isMinimize: false
    }) 

    useEffect(() => {
        if (composedId) loadEmail()
    }, [])

    useEffectUpdate(() => {
        if (email.sentAt) {
            onSaveEmail()
            navigate(`/emails/${params.folder}`)
        }
    }, [email])

//  help to limit re-render the component to many times - and prevent create several emails at once 
    useEffectUpdate(() => {
        onSaveEmail()
    }, [debouncedEmail])

    async function loadEmail() {
        try {
            const email = await emailService.getById(composedId)
            setEmail(email)

        } catch (error) {
            console.log("Had issues loading email", error)
            showErrorMsg("Could Not Update Draft Emil")
            navigate(`/emails/${params.folder}`)
        }
    }

    function handleChange({ target }) {
        let { name: field, value } = target;
        setEmail((prevEmail) => ({ ...prevEmail, [field]: value }))
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try {
        setEmail((prevEmail) => ({ ...prevEmail, sentAt: new Date() }))
        } catch (error) {
        console.log("error:", error)
        }
    }

    async function onSaveEmail() {
        try {
        if (email.id) {
                await onUpdateEmail(email)
                return;
            }
            const { id } = await onAddEmail(email)
            setEmail((prevEmail) => ({ ...prevEmail, id: id }))
        } catch (error) {
        console.log("Error on save:", error)
        }
    }

    function onChangeScreenAttr({ target }) {
        const { value } = target;

        if (value === "fullscreen" && screenState.isFull === false) {
            setScreenState(prevState => ({
                ...prevState,
                isFull: true
            }))
        }

        if (value === "fullscreen" && screenState.isFull === true) {
            setScreenState(prevState => ({
                ...prevState,
                isFull: false
            }))
        }

        if (value === "minimize" && !screenState.isMinimize) {
            setScreenState(prevState => ({
                ...prevState,
                isMinimize: true
            }))
        }

        if (value === "minimize" && screenState.isMinimize) {
            setScreenState(prevState => ({
                ...prevState,
                isMinimize: false
            }))
        }
    }

    let screenModeClass = ""

    if (screenState.isFull) {
        screenModeClass = "fullscreen"
    } else if (screenState.isMinimize) {
        screenModeClass = "minimize"
    }

    return (
        <section className={`new-msg-container ${screenModeClass}`}>
            <section className="new-msg-content">
                <section className="new-msg-header">
                    <h1>New Message</h1>
                    <div></div>
                        <Link to={`/emails/${params.folder}`}>
                            <button className="close">
                                <X size={12} />
                            </button>
                        </Link>
                    <button
                        className="fullscreen"
                        value="fullscreen"
                        onClick={onChangeScreenAttr}
                        >
                        {screenState.isFull ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
                    </button>
                    <button
                        className="minimize"
                        value="minimize"
                        onClick={onChangeScreenAttr}
                        > <Minus size={12} />
                    </button>
                </section>

                <form className="the-msg" onSubmit={handleSubmit}>
                    <input
                    id="from"
                    name="from"
                    placeholder="From"
                    value={email.from}
                    onChange={handleChange}
                    ></input>
                    <input
                    id="to"
                    name="to"
                    placeholder="To"
                    value={email.to}
                    onChange={handleChange}
                    ></input>
                    <input
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                    value={email.subject}
                    onChange={handleChange}
                    ></input>
                    <textarea
                    id="body"
                    name="body"
                    value={email.body}
                    onChange={handleChange}
                    ></textarea>
                    <button type="submit" className="send">
                    Send
                    </button>
                </form>
            </section>
        </section>
    )
    }


