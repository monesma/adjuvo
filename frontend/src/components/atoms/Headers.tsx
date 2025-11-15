import { twMerge } from 'tailwind-merge'

const H1 = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <h1 className={twMerge('font-poppins text-4xl m-5 font-bold text-center', className)}>
      {children}
    </h1>
  )
}

const H2 = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <h2 className={twMerge('font-poppins uppercase font-bold text-3xl my-5 text-center mb-12', className)}>{children}</h2>
}

const H3 = ({
  children,
  className = '',
}: {
  children: string
  className?: string
}) => {
  return (
    <h3
      className={`my-6 text-2xl font-bold text-center uppercase ${className}`}
    >
      {children}
    </h3>
  )
}
export { H1, H2, H3 }
