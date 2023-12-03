const followMessage = (user) => `${user} started following you`
const postMessage = (user) => `${user} made a new post`
const replyMessage = (user) => `${user} replied to your comment`
const commentMessage = (user) => `${user} commented on your post`

module.exports = {
    followMessage,
    postMessage,
    replyMessage,
    commentMessage
}