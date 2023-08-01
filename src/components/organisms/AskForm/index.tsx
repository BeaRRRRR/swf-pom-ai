'use client'

import { Fragment, useState } from 'react'
import clsx from 'clsx'
import { Listbox, Transition } from '@headlessui/react'
import {
  CalendarIcon
} from '@heroicons/react/20/solid'
import {
  useAccount, useContractWrite
} from 'wagmi'
import { parseEther } from 'viem'
import { abi } from '@/static/abi'

const dueDates = [
  { name: 'No due date', value: null },
  { name: 'Today', value: 'today' }
  // More items...
]

export default function AskForm() {
  const account = useAccount()
  const [dated, setDated] = useState(dueDates[0])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [budget, setBudget] = useState(0)

  const {
    write, data, isLoading, isSuccess
  } = useContractWrite({
    address: '0x303B1568F8DAb3076D093146394B558f5bf8a1D1',
    abi,
    functionName: 'createSurvey'
  })
  console.log(data, isLoading, isSuccess)

  async function onSubmit(e) {
    e.preventDefault()
    /* e.preventDefault()
* const req = await fetch('/api/question', {
*   method: 'POST',
*   body: JSON.stringify({
*     title,
*     content,
*     budget,
*     deadline: '2023-01-01'
*   })
* })
* const json = await resp.json()
* console.log(json)
 */
    console.log(budget)
    console.log(parseEther(`${budget}`))
    write({
      args: [title, BigInt(1), BigInt(2)],
      value: parseEther(`${budget}`)
    })
    // TODO: redirect
  }

  return (
    <form action="#" className="relative">
      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description" className="sr-only">
          Description
        </label>
        <textarea
          rows={2}
          name="description"
          id="description"
          className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Write a description..."
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
        {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
        <div className="flex flex-nowrap justify-end space-x-2 px-2 py-2 sm:px-3">
          <Listbox as="div" value={dated} onChange={setDated} className="flex-shrink-0">
            {({ open }) => (
              <>
                <Listbox.Label className="sr-only">Add a due date</Listbox.Label>
                <div className="relative">
                  <Listbox.Button className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                    <CalendarIcon
                      className={clsx(
                        dated.value === null ? 'text-gray-300' : 'text-gray-500',
                        'h-5 w-5 flex-shrink-0 sm:-ml-1'
                      )}
                      aria-hidden="true"
                    />
                    <span
                      className={clsx(
                        dated.value === null ? '' : 'text-gray-900',
                        'hidden truncate sm:ml-2 sm:block'
                      )}
                    >
                      {dated.value === null ? 'Due date' : dated.name}
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {dueDates.map((dueDate) => (
                        <Listbox.Option
                          key={dueDate.value}
                          className={({ active }) =>
                            clsx(
                              active ? 'bg-gray-100' : 'bg-white',
                              'relative cursor-default select-none px-3 py-2'
                            )}
                          value={dueDate}
                        >
                          <div className="flex items-center">
                            <span className="block truncate font-medium">{dueDate.name}</span>
                          </div>
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
        <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
          <div>
            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
              Budget
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                name="price"
                id="price"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="0.00"
                aria-describedby="price-currency"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-500 sm:text-sm" id="price-currency">
                  CRO
                </span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={onSubmit}
              type="submit"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
