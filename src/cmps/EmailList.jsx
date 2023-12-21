import { EmailPreview } from "./EmailPreview";


export function EmailList({ emails, onRemoveEmail,onUpdateEmail }) {
    return (
        <ul className="email-list">
            {emails.map(email => (
                <EmailPreview email={email} onRemoveEmail={onRemoveEmail} key={email.id} onUpdateEmail={onUpdateEmail}/>
            ))}
        </ul>
    )
}

// li inside EmailPreview - if have problems use react fragments