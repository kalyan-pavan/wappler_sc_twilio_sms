exports.twilio_send_sms = async function (options) {

    const accountSid = this.parseRequired(options.account_sid, 'string', 'Account SID is required');
    const authToken = this.parseRequired(options.auth_token, 'string', 'Auth Token is required');

    const messageBody = this.parse(options.message_body);
    const senderMobile = this.parseRequired(options.sender_mobile, 'string', 'Sender Mobile is required');
    const recipientMobile = this.parse(options.recipient_mobile) || '';

    // Check if mobile number or message body is empty
    if (!senderMobile|| !messageBody) {
        return Promise.reject('Sender Mobile and Message Body cannot be empty');
    }

    const client = require('twilio')(accountSid, authToken);

    return client.messages
        .create({
            body: messageBody,
            from: senderMobile,
            to: recipientMobile,
        })
        .then(message => {
            console.log(message.sid);
            return Promise.resolve(message.sid);
        })
        .catch(err => {
            console.error(`Error sending message: ${err}`);
            return Promise.reject(`Error sending message: ${err}`);
        });
}