import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    createEmail,
    getDefaultFilter,
    getLoggedInUser,
    getFilterFromParams,
    getDefaultSort
}

const STORAGE_KEY = 'emails'

// localStorage.clear();
 _createEmails()

async function query(filterBy,folder,sortBy) {
    let emails = await storageService.query(STORAGE_KEY);

    switch (folder) {
        case 'starred':
            emails = emails.filter(email => !email.removedAt && email.isStarred);
            break;
        case 'sent':
            emails = emails.filter(email => email.from === getLoggedInUser().email && !email.removedAt);
            break;
        case 'trash':
            emails = emails.filter(email => email.removedAt);
            break;
        case 'inbox':
            emails = emails.filter(email => email.from !== getLoggedInUser().email && !email.removedAt);
            break;
        case 'draft':
            emails = emails.filter(email => email.from === getLoggedInUser().email && !email.sentAt && !email.removedAt);
            break;
        default:
            console.log('No such folder');
            break;
    }

    // const emailCount = emails.length;
    
    if(sortBy.date)
    {
        emails.sort((a, b) =>
            (sortBy.order === 'asc') ? a.sentAt - b.sentAt : b.sentAt - a.sentAt
        );
    }

    if(sortBy.title)
    {  
        emails.sort((a, b) =>
            sortBy.order === 'asc' ? a.title - b.title : b.title - a.title
        );
    }

    
    if(!filterBy) return emails;
    else{
        const { textSearch = '', isRead} = filterBy;

        switch (isRead) {
            case true:
                emails = emails.filter(email => email.isRead === true);
                break;
            case false:
                emails = emails.filter(email => email.isRead === false);
                break;
            default:
            break;    
        }

        if(textSearch.length && textSearch.length !== 0){
            emails = emails.filter(email => (email.subject.includes(textSearch) || email.body.includes(textSearch)))
        }

        return emails;
    }
    
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

function createEmail(from = '', to ='', subject='', body='') {
    return {
            id: '',
            subject: subject,
            body: body,
            isRead: false,
            isStarred: false,
            sentAt : null,
            removedAt : null,
            from: from,
            to: to
        }
}


function getDefaultFilter() {
    return {
        status: '',
        textSearch: '',
        isRead: null,
        date: ''
    }
}

function getDefaultSort() {
    return {
        date: null,
        title: null,
        order:''
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
                sentAt : 'Jun 15', removedAt : null, from: 'momo@momo.com', to: 'user@appsus.com'
            },
            {
                id: 'e2', subject: 'Miss you!', body: 'Would love to catch up sometimes', isRead: false, isStarred: false,
                sentAt : 'Sep 20', removedAt : null, from: 'momo@momo.com', to: 'user@appsus.com'
            },
            {
                id: 'e3', subject: 'new discounts', body: 'new discounts', isRead: false, isStarred: false,
                sentAt : 'Jun 2', removedAt : null, from: 'eBay', to: 'user@appsus.com'
            },
            {
                id: 'e4', subject: 'Security alert', body: 'Your Google Account was just in to form', isRead: false, isStarred: false,
                sentAt : 'Dec 24', removedAt : null, from: 'Google', to: 'user@appsus.com'
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}

function getFilterFromParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || defaultFilter[field]
    }
    return filterBy
}


    




