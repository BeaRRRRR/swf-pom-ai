import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(request: Request, res: Response) {
  const req = await request.json();
  console.log(req)
  const session = await getServerSession(authOptions)

  if (!session) throw new Error(`Unauthorized`)
  const question = await prisma.question.update({
    where: {
      address: session.user?.address
    },
    data: {
      answers: {
        create: [
          {
            content: req.content,
            address: session.user?.address
          }
        ]
      }
    }
  })
  return NextResponse.json(question);
}
