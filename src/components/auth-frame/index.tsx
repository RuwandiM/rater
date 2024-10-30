import React from 'react'

interface AuthFrameprops {
    children: React.ReactNode
}

function AuthFrame({ children }: AuthFrameprops) {
    return (
        <main className="grid items-center justify-center h-screen w-full">
            {children}
        </main>
    )
}

export default AuthFrame