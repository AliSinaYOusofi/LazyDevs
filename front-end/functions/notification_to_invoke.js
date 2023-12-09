export const notification_to_invoke = (message) => {
    if (message.includes('commented')) return 'comment'
    else if (message.includes('replied')) return 'replied'
    else if (message.includes('followed')) return 'follow'
    else if (message.includes('new')) return 'post'
    else if (message.includes('liked')) return 'like'
}