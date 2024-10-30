import { SignedIn, UserButton } from '@clerk/nextjs'
import React from 'react'

interface AppLayoutProps {
    children: React.ReactNode
}

function AppLayout({ children }: AppLayoutProps) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <header className='h-18 sticky top-0 md:h-22 w-full bg-slate-50 z-50'>
                <div className="h-full max-w-7xl mx-auto flex justify-end md:justify-between items-center p-4">
                    <div className="hidden md:block mb-8 mt-5">
                        <h1 className="text-xl font-bold">Rate summary</h1>
                        <p className="text-md text-gray-600">Compare original text with AI-generated content.</p>
                    </div>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </header>
            <div className="flex-1 w-full max-w-7xl p-4">{children}</div>
        </main>
    )
}

export default AppLayout