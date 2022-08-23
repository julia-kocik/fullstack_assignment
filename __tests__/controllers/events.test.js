const { postEvent } = require("../../controllers/events");
const Event = require('../../models/Event');

jest.mock('../../models/Event');

const request = {
    body: {
        firstName: 'firstname',
        lastName: 'lastName', 
        email: 'email',
        date: '1994-05-23'
    }
}

const response = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x),
}

it('should send a status code of 400 when user exists', async () => {
    await postEvent(request, response);
    expect(response.status).toHaveBeenCalledWith(500);
})