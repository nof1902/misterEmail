import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { faker } from '@faker-js/faker';

const EMAIL_COUNT = 10;

export const emailService = {
    query,
    save,
    remove,
    getById,
    getDefaultEmail,
    
    getLoggedInUser,

    getDefaultScreenState,

    getDefaultSearchOptions,
    getDefaultSearch
}

const STORAGE_KEY = 'emails'


/* getDefaultFilter,
    getFilterFromParams,
    getDefaultSort,
    getFilterSortParams, */

// localStorage.clear()
 _createEmails()

async function query(searchBy,folder) {
    let emails = await storageService.query(STORAGE_KEY);

    switch (folder) {
        case 'trash':
            emails = emails.filter(email => email.removedAt);
            break;
        case 'inbox':
            emails = emails.filter(email => email.to === getLoggedInUser().email && !email.removedAt);
            break;
        case 'starred':
            emails = emails.filter(email => !email.removedAt && email.isStarred);
            break;
        case 'sent':
            emails = emails.filter(email => email.to !== getLoggedInUser().email && !email.removedAt);
            break;
        case 'draft':
            emails = emails.filter(email => email.from === getLoggedInUser().email && !email.sentAt && !email.removedAt);
            break;
        default:
            console.log('No such folder');
            break;
    }

    // const emailCount = emails.length;

    if(searchBy.fieldToSort === 'date')
    {
        emails.sort((a, b) =>
            (searchBy.sortOrder === 'asc') ? new Date(a.sentAt) - new Date(b.sentAt) : new Date(b.sentAt) - new Date(a.sentAt)
        );
    }

    if(searchBy.fieldToSort === 'subject')
    {  
        emails.sort((a, b) => {
            const subjectA = a.subject.toLowerCase();
            const subjectB = b.subject.toLowerCase();
    
            if (searchBy.sortOrder === 'asc') {
                return subjectA.localeCompare(subjectB);
            } else {
                return subjectB.localeCompare(subjectA);
            }
        });
    }

    
    if(!searchBy) return emails;
    else{
        const { textSearch = '', isRead} = searchBy;

        switch (isRead) {
            case 'true':
                emails = emails.filter(email => email.isRead === true);
                break;
            case 'false':
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
    // put new data when send
    emailToSave.sentAt = new Date();
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        // emailToSave.isOn = false
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}

function getDefaultEmail(from = '', to ='', subject='', body='') {
    return {
            id: '',
            subject: subject,
            body: body,
            isRead: false,
            isStarred: false,
            sentAt : _generateRandomDate(new Date(2023, 1, 1), new Date()),
            removedAt : null,
            from: from,
            to: to
        }
}


// function getDefaultFilter() {
//     return {
//         status: '',
//         textSearch: '',
//         isRead: null,
//         date: ''
//     }
// }

// function getDefaultSort() {
//     return {
//         fieldToSort:'',
//         sortOrder:''
//     }
// }

function getDefaultScreenState() {
    return {
        fullscreen: null,
        minimize: null,
        normal: true
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
    let emails = utilService.loadFromStorage(STORAGE_KEY) || []
    
    if (!emails.length) {
        emails = _generateEmails(EMAIL_COUNT, emails)
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}

function _generateEmails(count, emails) {
    for (let i = 0; i < count; i++) {
        const email = _createSingleEmail()
        emails.push(email)
    }
    return emails
}

function _createSingleEmail() {
    
    const email = getDefaultEmail()
    email.id = utilService.makeId()
    email.subject = faker.lorem.sentence()
    email.body = faker.lorem.paragraphs(1)
    
    if (Math.random() > 0.4) {
        // Generate sent emails
        email.from = getLoggedInUser().email
        email.to = faker.internet.email()
    } else {
        // Generate inbox emails
        email.from = faker.internet.email()
        email.to = getLoggedInUser().email
    }

    email.isRead = Math.random() > 0.8
    email.isStarred = Math.random() > 0.8

    return email
}

function _generateRandomDate(from, to) {
    return new Date(
      from.getTime() +
        Math.random() * (to.getTime() - from.getTime()),
    )
  }


// function getFilterSortParams(searchParams){
//     let defaultSort = getDefaultSort()
//     const sortBy = {}
//     for(const field in defaultSort){
//         sortBy[field] = searchParams.get(field) || defaultSort[field]
//     }
//     return sortBy
// }


function getDefaultSearch(searchParams) {
    const defaultFilter = getDefaultSearchOptions()
    const searchBy = {}
    for (const field in defaultFilter) {
        searchBy[field] = searchParams.get(field) || defaultFilter[field]
    }
    return searchBy
}

function getDefaultSearchOptions() {
    return {
        textSearch: '',
        isRead: null,
        date: '',
        fieldToSort:'',
        sortOrder:''
    }
}


    




