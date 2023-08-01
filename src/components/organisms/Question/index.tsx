type Props = {
  content: string
}

export default function Question({ content }: Props) {
  return (
    <div className="py-4">
      <p className="text-lg">
        {content}
      </p>
    </div>
  )
}
