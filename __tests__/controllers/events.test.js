const { postEvent } = require("../../controllers/events");
const Event = require('../../models/Event');



jest.mock('../../models/Event');

const response = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x),
}

const requestOK = {
    body: {
        firstName: 'firstname',
        lastName: 'lastName', 
        email: 'julia@gmail.com',
        date: '1994-05-23'
    }
}


it('should send a status code 200 and correct message when valid data provided', async () => {
    await postEvent(requestOK, response);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({"message": "OK"});
})

const requestWithMissingFirstName = {
    body: {
        firstName: false,
        lastName: 'lastName', 
        email: 'email',
        date: '1994-05-23'
    }
}

it('should send a status code 500 and message: Please provide a firstname', async () => {
    await postEvent(requestWithMissingFirstName, response);
    expect(requestWithMissingFirstName.body.firstName).toBeFalsy();
    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
        "message": "Please provide firstname"
    });
})

const requestWithMissingLastName = {
    body: {
        firstName: 'firstName',
        lastName: '', 
        email: 'email',
        date: '1994-05-23'
    }
}

it('should send a status code 500 and message: Please provide a lastName', async () => {
    await postEvent(requestWithMissingLastName, response);
    expect(requestWithMissingLastName.body.lastName).toBeFalsy();
    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
        "message": "Please provide lastname"
    });
})

const requestWithMissingEmail = {
    body: {
        firstName: 'firstName',
        lastName: 'lastName', 
        email: '',
        date: '1994-05-23'
    }
}

it('should send a status code 500 and message: Please provide an email', async () => {
    await postEvent(requestWithMissingEmail, response);
    expect(requestWithMissingEmail.body.email).toBeFalsy();
    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
        "message": "Please provide email"
    });
})

const requestWithInvalidEmail = {
    body: {
        firstName: 'firstName',
        lastName: 'lastName', 
        email: 'julia',
        date: '1994-05-23'
    }
}

it('should send a status code 500 and message: Please provide a VALID email', async () => {
    await postEvent(requestWithInvalidEmail, response);
    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
        "message": "Please provide valid email"
    });
})

const requestWithMissingDate = {
    body: {
        firstName: 'firstName',
        lastName: 'lastName', 
        email: 'julia@gmail.com',
        date: 0
    }
}

it('should send a status code 500 and message: Please provide a date', async () => {
    await postEvent(requestWithMissingDate, response);
    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
        "message": "Please provide date"
    });
})

