import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { authOptions } from '../auth/[...nextauth]/route'

export async function POST(request: Request, res: Response) {
  const req = await request.json()
  console.log(req)
  const session = await getServerSession(authOptions)

  if (!session) throw new Error('Unauthorized')
  const question = await prisma.question.create({
    data: {
      title: req?.title,
      content: req?.content,
      // TODO: get the author(eth address) either from the token or the jwt token
      deadline: new Date(req?.deadline),
      reward: parseFloat(req?.reward),
      open: true,
      address: session.user?.address
    }
  })
  return NextResponse.json(question)
}

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) throw new Error('Unauthorized')
  const questions = await prisma.question.findMany({
    include: {
      answers: true
    }
  })
  return NextResponse.json(questions)
}
