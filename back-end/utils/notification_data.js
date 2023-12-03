const followMessage = (user) => `${user} started following you`
const postMessage = (user) => `${user} made a new post`
const replyMessage = (user) => `${user} replied to your comment`

module.exports = {
    followMessage,
    postMessage,
    replyMessage
}