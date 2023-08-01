'use client'

import useSWR from 'swr'
import { ChatBubbleLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { fetcher } from '@/utils/swr'

export default function Questions() {
  const { data, error, isLoading } = useSWR('/api/question', fetcher)

  return isLoading ? (<>Loading...</>) : (
    <ul role="list" className="divide-y divide-gray-100">
      {data?.map((question) => (
        <li
          key={question.id}
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap"
        >
          <div>
            <p className="text-sm font-semibold leading-6 text-gray-900">
              <a href={`/questions/${question.id}`} className="hover:underline">
                {!question.open && 'CLOSED: '}
                {question.title}
              </a>
            </p>
            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              <p>
                By:
                {' '}
                {question.address}
              </p>
              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                <circle cx={1} cy={1} r={1} />
              </svg>
              <p>
                Deadline:
                {' '}
                <time dateTime={question.deadline}>{new Date(question.deadline).toLocaleDateString()}</time>
              </p>
            </div>
          </div>
          <dl className="flex w-full flex-none justify-between gap-x-8 sm:w-auto">
            <div className="flex -space-x-0.5">
              <dt className="sr-only">Commenters</dt>
              <dd>
                Reward:
                {' '}
                {question.reward}
                $CRO
              </dd>
              {/* {question.commenters.map((commenter) => (
                <dd key={commenter.id}>
                  <img
                    className="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white"
                    src={commenter.imageUrl}
                    alt={commenter.name}
                  />
                </dd>
              ))} */}
            </div>
            <div className="flex w-16 gap-x-2.5">
              <dt>
                <span className="sr-only">Total comments</span>
                {!question.open ? (
                  <CheckCircleIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                ) : (
                  <ChatBubbleLeftIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                )}
              </dt>
              <dd className="text-sm leading-6 text-gray-900">{question.answers?.length || 0}</dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  )
}
