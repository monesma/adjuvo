import { twMerge } from 'tailwind-merge'

const EmptyTemplate = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={twMerge(
        'font-roboto bg-neutral-900 min-h-screen flex flex-col text-neutral-200',
        className
      )}
    >
      {children}
    </div>
  )
}

export default EmptyTemplate
