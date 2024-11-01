"use client"
import React from 'react'
import { AddTextDrawer } from './addTextDrawer'
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'

function Header() {
    const { user } = useUser()
    const isAdmin = user?.publicMetadata?.role === 'admin'

    return (
        <header className='h-[100px] sticky top-0 md:h-22 w-full bg-slate-50 z-50'>
            <div className="h-full max-w-5xl lg:max-w-7xl mx-auto flex justify-end md:justify-between items-center p-4">
                <div className="hidden md:block mb-8 mt-5">
                    <h1 className="text-xl font-bold">Rate summary</h1>
                    <p className="text-md text-gray-600">Compare original text with AI-generated content.</p>
                </div>
                <div className="flex gap-6">
                    {isAdmin && <AddTextDrawer />}
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </header>
    )
}

export default Header