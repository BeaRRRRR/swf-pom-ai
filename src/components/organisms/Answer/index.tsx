import { UserIcon, CheckBadgeIcon } from '@heroicons/react/20/solid'

export type Props = {
  text: string,
  author: string,
  isHelpful: boolean,
}

export default function Answer({ text, author, isHelpful }: Props) {
  return (
    <div className="py-4 border-t border-b flex">
      <div>
        {isHelpful && (
        <div className="flex items-center text-green-300">
          Helpful
          <CheckBadgeIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
        </div>
        )}
        <p className="text-lg">{text}</p>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <UserIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
          By:
          {' '}
          {author}
        </div>
      </div>
    </div>
  )
}
