import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    createEmail,
    getDefaultFilter,
    getLoggedInUser
}

const STORAGE_KEY = 'emails'

// localStorage.clear();
 _createEmails()


async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY);
    if (filterBy) {
        const { textSearch = '', isRead} = filterBy;
        emails = emails.filter(email => 
            ((textSearch === '' || email.subject.includes(textSearch) || email.body.includes(textSearch))
            && (isRead === null || email.isRead === isRead))
        );
    }
    return emails;
}


function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        emailToSave.isOn = false
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}

function createEmail() {
    return {
            id: '',
            subject: '',
            body: '',
            isRead: false,
            isStarred: false,
            sentAt : 0,
            removedAt : null, //for later use
            from: '',
            to: ''
        }
}

function getDefaultFilter() {
    return {
        status: '',
        textSearch: '',
        isRead: null
    }
}

function getLoggedInUser()
{
    return {
        email: 'nofar@melamed.com',
        fullname: 'Nofar Melamed'
   }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = [
            {
                id: 'e1', subject: 'Miss you!', body: 'Would love to catch up sometimes', isRead: false, isStarred: false,
                sentAt : 'Jun 25', removedAt : null, from: 'momo@momo.com', to: 'user@appsus.com'
            },
            {
                id: 'e2', subject: 'Miss you!', body: 'Would love to catch up sometimes', isRead: false, isStarred: false,
                sentAt : 'Apr 03', removedAt : null, from: 'momo@momo.com', to: 'user@appsus.com'
            },
            {
                id: 'e3', subject: 'new discounts', body: 'new discounts', isRead: false, isStarred: false,
                sentAt : 'Jun 13', removedAt : null, from: 'eBay', to: 'user@appsus.com'
            },
            {
                id: 'e4', subject: 'Security alert', body: 'Your Google Account was just in to form', isRead: false, isStarred: false,
                sentAt : 'Jun 1', removedAt : null, from: 'Google', to: 'user@appsus.com'
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}


    




