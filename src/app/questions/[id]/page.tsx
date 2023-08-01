'use client'

import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'
import { useParams } from 'next/navigation'
import { Switch as HeadlessSwitch } from '@headlessui/react'
import {
  useContractWrite
} from 'wagmi'
import Switch from '@/components/atoms/Toggle'
import Question from '@/components/organisms/Question'
import QuestionHeader from '@/components/organisms/QuestionHeader'
import Answer from '@/components/organisms/Answer'
import { fetcher } from '@/utils/swr'
import AnswerForm from '@/components/organisms/AsnwerForm'
import CloseSurveyModal from '@/components/templates/Modal'
import { abi } from '@/static/abi'

async function closeQuestion(url) {
  return fetch(url, {
    method: 'POST'
  }).then((res) => res.json())
}

// The page with the question and all of it's answers
export default function QuestionDetails() {
  const params = useParams()
  const { data, error, isLoading } = useSWR(`/api/question/${params.id}`, fetcher)

  const { data: resp, trigger } = useSWRMutation(`/api/question/${params.id}/evaluate`, closeQuestion)

  const {
    write
  } = useContractWrite({
    address: '0x303B1568F8DAb3076D093146394B558f5bf8a1D1',
    abi,
    functionName: 'createSurvey'
  })

  function onClose() {
    trigger()
  }

  function onModalClose() {
    write({
      args: data?.answers.map((a) => a.address)
    })
  }

  return isLoading ? (<>Loading...</>) : (
    <>
      {resp && <CloseSurveyModal helpful={resp?.helpful} total={data.answers?.length} onClose={onModalClose} />}
      <QuestionHeader title={`${!data.open ? 'CLOSED: ' : ''}${data.title}`} reward={data.reward} deadline={data.deadline} address={data.address} onClose={onClose} isOpen={data.open} />
      <Question content={data.content} />
      <div className="flex items-center justify-between pt-10">
        <p className="text-2xl font-bold">
          Answers:
          {' '}
          {data.answers?.length || 0}
        </p>
        {/* <div className="flex items-center flex-row-reverse">
          <HeadlessSwitch.Group>
            <span className="flex flex-grow flex-col ml-2">
              <HeadlessSwitch.Label as="span" className="text-sm font-medium leading-6 text-gray-900" passive>
                Helpful first
              </HeadlessSwitch.Label>
              <HeadlessSwitch.Description as="span" className="text-sm text-gray-500">
                Show the answers AI deemed as helpful first
              </HeadlessSwitch.Description>
            </span>
            <Switch />
          </HeadlessSwitch.Group>
        </div> */}
      </div>
      {data?.answers.map((answer) => <Answer text={answer.content} author={answer.address} isHelpful={answer.helpful} />)}
      <div className="mt-5">
        <AnswerForm questionId={params.id} />
      </div>
    </>
  )
}
