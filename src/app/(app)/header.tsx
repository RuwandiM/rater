"use client"
import React, { useCallback } from 'react'
import { AddTextDrawer } from './addTextDrawer'
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Header() {
    const { user } = useUser()
    const isAdmin = user?.publicMetadata?.role === 'admin'
    const pathname = usePathname()

    const getNav = useCallback(
        () => {
            if (pathname === '/results') {
                return <Button variant="link">
                    <Link href="/">
                        <p>Go to Home</p>
                    </Link>
                </Button>
            } else {
                return <Button variant="link">
                    <Link href="/results">
                        <p>View Results</p>
                    </Link>
                </Button>
            }
        }
        , [pathname])

    return (
        <header className='h-[100px] sticky top-0 md:h-22 w-full bg-slate-50 z-50'>
            <div className="h-full max-w-5xl lg:max-w-7xl mx-auto flex justify-between items-center p-4">
                <div className="mb-8 mt-5">
                    {isAdmin && <AddTextDrawer />}
                </div>
                <div className="flex gap-6">

                    {isAdmin && getNav()}
                    <Button variant="link">
                        <Link href="/data-grid">data-grid (testing)</Link>
                    </Button>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </header>
    )
}

export default Header