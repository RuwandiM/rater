import { Toaster } from 'sonner'
import Header from './header'
interface AppLayoutProps {
    children: React.ReactNode
}

function AppLayout({ children }: AppLayoutProps) {

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <Header />
            <div className="flex-1 w-full max-w-5xl lg:max-w-7xl p-4 relative">{children}</div>
            <Toaster richColors position="top-center" />
        </main>
    )
}

export default AppLayout