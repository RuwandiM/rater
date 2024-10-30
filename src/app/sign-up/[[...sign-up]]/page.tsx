import AuthFrame from '@/components/auth-frame'
import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <AuthFrame>
      <SignUp />
    </AuthFrame>
  )
}