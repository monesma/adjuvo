import { Link as RouterLink } from 'react-router-dom'
import { twMerge } from "tailwind-merge"

const Link = ({
  href,
  children,
  className='',
  onClick=() => {}
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}) => {
  return (
    <RouterLink to={href} className={twMerge('text-indigo-400 hover:text-indigo-300', className)} onClick={onClick}>
      {children}
    </RouterLink>
  )
}
export default Link
