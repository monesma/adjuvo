import HeaderDash from '../organisms/HeaderDash'
import EmptyTemplate from './EmptyTemplate'

const CenterCardTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <EmptyTemplate>
      <HeaderDash/>
      <main className="grow flex flex-col justify-center items-center bg-radial-gradient-ct from-[rgb(49,38,90)4%] to-[rgb(22,22,30)71%] shadow-indigo-900">
        {children}
      </main>
    </EmptyTemplate>
  )
}
export default CenterCardTemplate
