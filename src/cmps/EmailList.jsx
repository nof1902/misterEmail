import { EmailPreview } from "./EmailPreview";


export function EmailList({ emails, onRemoveEmail }) {
    return (
        <ul className="email-list">
            {emails.map(email => (
                <EmailPreview email={email} onRemoveEmail={onRemoveEmail} key={email.id}/>
            ))}
        </ul>
    )
}

// li inside EmailPreview - if have problems use react fragments