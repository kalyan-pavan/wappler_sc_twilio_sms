exports.twilio_send_sms = async function (options) {

    const accountSid = this.parseRequired(options.account_sid, 'string', 'Account SID is required');
    const authToken = this.parseRequired(options.auth_token, 'string', 'Auth Token is required');

    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            body: this.parse(options.message_body) || 'No body defined',
            from: this.parseRequired(options.sender_mobile, 'string', 'Sender Mobile is required'),
            to: this.parse(options.recipient_mobile) || '',
        })
        .then(message => console.log(message.sid))
        .catch(err => console.error(`Error sending message: ${err}`));

}