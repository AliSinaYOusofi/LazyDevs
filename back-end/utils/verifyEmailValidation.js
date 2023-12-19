function validateEmail(response) {
    return response.formatCheck === 'true' && response.dnsCheck === 'true' && response.smtpCheck === 'true'
     
}

module.exports = validateEmail;