'use client'

import { Dispatch, SetStateAction } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import {
  Bars3Icon, BellIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import ProfileDropdown from '@/components/organisms/ProfileDropdown'
import Button from '@/components/atoms/Button/index'
import SignInButton from '@/components/organisms/SignInButton'
import { useSignIn } from '@/hooks'

type Props = {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>,
  children: React.ReactNode
}

export default function Header({ setSidebarOpen, children }: Props) {
  const { data: session } = useSession()
  const {
    isConnected
  } = useSignIn()

  console.log(session, isConnected)

  return (
    <div className="lg:pl-72">
      <div className="sticky top-0 z-40 lg:mx-auto lg:max-w-7xl lg:px-8">
        <div className="flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <form className="relative flex flex-1" action="#" method="GET">
              <label htmlFor="search-field" className="sr-only">
                Search
              </label>
              <MagnifyingGlassIcon
                className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                aria-hidden="true"
              />
              <input
                id="search-field"
                className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Search..."
                type="search"
                name="search"
              />
            </form>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Separator */}
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />
              <Link href="/ask">
                <Button>Ask a question</Button>
              </Link>
              {status !== 'loading' ? session ? <ProfileDropdown /> : <SignInButton /> : null}
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>

  )
}
