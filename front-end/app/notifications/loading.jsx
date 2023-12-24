import React from 'react'
import LoadingNotificationCard from './LoadingNotificationCard'

export const metadata = {
    title: "Notifications"
}

export default function Loading() {
    return (
        <>
            <LoadingNotificationCard />
            <LoadingNotificationCard />
            <LoadingNotificationCard />
            <LoadingNotificationCard />
            <LoadingNotificationCard />
        </>
    )
}
