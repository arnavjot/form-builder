"use client"
import { Button } from '@/components/ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
  const { user, isSignedIn } = useUser();
  const path = usePathname();
  useEffect(() => {
    console.log(path)
  }, [path]); // Ensure path is a dependency for re-running effect

  return !path.includes('aiform') && (
    <div className='p-3 px-5 border-b shadow-sm' style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: '#fff'  // Adjust the background color as needed
    }}>
      <div className='flex items-center justify-between'>
        {/* Updated Link usage */}
        <Link href="/">
          <Image src={'/logo.svg'} width={180} height={50} alt='logo' />
        </Link>
        {isSignedIn ? (
          <div className='flex items-center gap-5'>
            <Link href={'/dashboard'}>
              <Button variant="outline">Dashboard</Button>
            </Link>
            <UserButton />
          </div>
        ) : (
          <SignInButton>
            <Button>Get Started</Button>
          </SignInButton>
        )}
      </div>
    </div>
  )
}

export default Header;
