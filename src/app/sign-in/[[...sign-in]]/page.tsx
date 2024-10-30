import AuthFrame from '@/components/auth-frame';
import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <AuthFrame>
            <SignIn />
        </AuthFrame>
    );
}