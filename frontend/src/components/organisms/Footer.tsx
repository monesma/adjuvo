import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLinkedin,
  faYoutube,
  faDiscord,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons'
import Logo from '../../assets/images/arzelogo.png'

const Footer = () => {
  return (
    <footer className="px-[20px] bg-[#171717] border-t border-t-neutral-700 md:flex md:justify-between md:items-center text-white">
      <Link to="/">
        <img
          src={Logo}
          alt=""
          height={80}
          width={80}
          className="rounded-3xl mx-auto mb-4 mt-4 md:m-4"
        />
      </Link>
      <nav className="flex justify-between items-center mb-6 md:mb-0">
        <Link to="/gdpr" className="mr-5">
          GDPR
        </Link>
        <Link to="/privacy" className="mr-5">
          Privacy
        </Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="flex justify-center items-center mb-6 md:mb-0">
        <a href="#">
          <FontAwesomeIcon
            icon={faDiscord}
            className="w-[30px] h-[30px] mr-5"
          />
        </a>
        <a href="https://www.youtube.com/@arzepayroll" target="_blank">
          <FontAwesomeIcon
            icon={faYoutube}
            className="w-[30px] h-[30px] mr-5"
          />
        </a>
        <a href="https://x.com/ArzeApp" target="_blank">
          <FontAwesomeIcon
            //@ts-ignore
            icon={faXTwitter}
            className="w-[22px] h-[22px] mr-5"
          />
        </a>
        <a href="https://www.linkedin.com/company/arzetechnologies">
          <FontAwesomeIcon
            //@ts-ignore
            icon={faLinkedin}
            className="w-[20px] h-[20px]"
          />
        </a>
      </div>
    </footer>
  )
}

export default Footer
