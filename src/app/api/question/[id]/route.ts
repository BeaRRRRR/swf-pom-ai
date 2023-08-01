import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request, context) {
  const id = context?.params?.id ?? '1'

  const question = await prisma.question.findUnique({
    where: {
      id
    },
    include: {
      answers: true
    }
  })
  return NextResponse.json(question)
}
