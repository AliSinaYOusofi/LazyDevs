"use client"
import Spinner from '@/components/Spinner/Spinner'
import React, { Suspense } from 'react'
import HandleTemplates from './HandleTemplates'

export default function Page() {
    return (
        <>
            <Suspense fallback={<Spinner />}>
                <HandleTemplates />
            </Suspense>
        </>
    )
}
