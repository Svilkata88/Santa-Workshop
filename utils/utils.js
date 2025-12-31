

const fetchToDb = (url, method, body, module, user) => {
    return user.getIdToken().then(token => {
        return fetch(`${url}/${module}.json?auth=${token}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : null
        })
        .then(response => response.json()); 
    });
};

// the same as fetchtoDB just explicitly named
const patchToDb = (url, method, body, module, user) => {
    return user.getIdToken().then(token => {
        return fetch(`${url}/${module}.json?auth=${token}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : null
        })
        .then(response => response.json()); 
    });
};

const fetchById = (url, module, id, user) => {
    return user.getIdToken().then(token => {
        return fetch(`${url}/${module}/${id}.json?auth=${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => data);          
    })
};

const validate = (fieldName, value) => {
        switch (fieldName) {
            case 'toyId':
                if (!value || value.trim() === '') {
                    return 'Please select a toy.';
                }
                break;
            case 'qtty':       
                if (value.trim() === '') {
                    return 'Minimum quantity is 1.';
                }
                break;
            case 'childName':
                if (value.trim() === '') {
                    return 'Please enter the child\'s name.';
                }
            case 'country':
                if (value.trim() === '') {
                    return 'Please select a country.';
                }
                break;
            case 'status':
                const allowed = ['pending', 'packed'];
                if (!allowed.includes(value)) {
                    return 'Please change the status to pending or packed.';
                }
                break;
            case 'elfName':
                if (value.trim() === '' || value.trim().lenght < 2) {
                    return 'Elf name must be at least 2 characters.';
                }
                break;
            case 'role':
                if (value.trim() === '') {
                    return 'please choose a role.';
                }
                break;
            case 'energy':
                if (value > 100 || value <= 0) {
                    return 'Choose between 1 and 100.';
                }
                break;
            default:
                break;
        }
    };

export { 
    fetchToDb,
    patchToDb,
    fetchById,
    validate,
};
