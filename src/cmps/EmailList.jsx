import { EmailPreview } from "./EmailPreview"


export function EmailList({ emails, onRemoveEmail,onUpdateEmail,onToggleStar }) {
    return (
        <ul className="email-list">
            {emails.map(email => (
                <EmailPreview email={email} 
                                onRemoveEmail={onRemoveEmail} 
                                key={email.id} 
                                onUpdateEmail={onUpdateEmail} 
                                onToggleStar={onToggleStar}/>
            ))}
        </ul>
    )
}
