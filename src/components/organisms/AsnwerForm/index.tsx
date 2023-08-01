'use client'

import { Fragment, useState } from 'react'
import clsx from 'clsx'
import { Listbox, Transition } from '@headlessui/react'
import {
  CalendarIcon
} from '@heroicons/react/20/solid'

type Props = {
  questionId: string,
}

export default function AnswerForm({ questionId }: Props) {
  const [content, setContent] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    const resp = await fetch(`/api/question/${questionId}/answer`, {
      method: 'POST',
      body: JSON.stringify({
        content
      })
    })
    const json = await resp.json()
    console.log(json)
    // TODO: redirect
  }

  return (
    <form action="#" className="relative">
      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
        <label htmlFor="description" className="sr-only">
          Description
        </label>
        <textarea
          rows={2}
          name="description"
          id="description"
          className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Write your answer..."
          defaultValue=""
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Spacer element to match the height of the toolbar */}
        <div aria-hidden="true">
          <div className="py-2">
            <div className="h-9" />
          </div>
          <div className="h-px" />
          <div className="py-2">
            <div className="py-px">
              <div className="h-9" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-px bottom-0">
        <div className="flex flex-row-reverse items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
          <div className="flex-shrink-0">
            <button
              onClick={onSubmit}
              type="submit"
              className="ml-auto inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
