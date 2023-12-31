
export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    getImgUrl
}


function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}

function getImgUrl(url) {
    return new URL(url, import.meta.url).href
}




//   {
//     folder: 'sent',
//     icon: (
//     <File
//         size={20}
//         stroke={currentNav === 'drafts' ? 'black' : '#484A49'}
//     />
//     ),
// },
// {
//     to: '/trash',
//     label: 'Trash',
//     icon: (
//     <Trash2
//         size={20}
//         stroke={currentNav === 'trash' ? 'black' : '#484A49'}
//     />
//     ),
// },