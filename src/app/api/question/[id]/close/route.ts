import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function DELETE(request: Request, res: Response) {
  const session = await getServerSession(authOptions)

  if (!session) throw new Error(`Unauthorized`)
  const question = await prisma.question.update({
    where: {
      address: session.user?.address
    },
    data: {
      open: false,
    }
  })
  return NextResponse.json(question);
}
