import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { ChatGPTAPI } from 'chatgpt'
import prisma from '@/lib/prisma'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

async function ask(question: string, answer: string) {
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY || ''
  })

  const res = await api.sendMessage(`Q: "${question}". A: "${answer}". Is the answer relevant, helpful? Say only yes or no`)
  return res.text
}

export async function POST(request: Request, res: Response) {
  //const session = await getServerSession(authOptions)

  //if (!session) throw new Error(`Unauthorized`)

  const secondLastIndex = request.url.lastIndexOf('/', request.url.lastIndexOf('/') - 1)
  const id = request.url.substring(secondLastIndex + 1, request.url.lastIndexOf('/')); 

  const question = await prisma.question.findUnique({
    where: {
      id
    },
    include: {
      answers: true
    }
  })

  if(!question) throw new Error('No question with specified ID');
  
  let helpfulAnswers = 0
  for (const answer of question?.answers) {
    const resp = await ask(question?.content, answer.content);
    console.log(resp);
    if(resp.toLowerCase().includes("yes")) helpfulAnswers++
    
    await prisma.answer.update({
      where: {
        id: answer.id,
      },
      data: {
        helpful: resp.toLowerCase().includes("yes") 
      }
    })
  }

  await prisma.question.update({
    where: {
      id: question.id
    },
    data: {
      open: false,
    }
  })

  return NextResponse.json({helpful: helpfulAnswers})
}
