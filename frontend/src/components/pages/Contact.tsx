import { Link } from "react-router-dom"
import MainTemplate from "../templates/MainTemplate"
import CtaButton from "../atoms/CtaButton"
import { H1 } from "../atoms/Headers"

const Contact = () => {
  return (
    <>
        <MainTemplate>
        <section className="flex flex-col p-8 rounded-xl w-[90%] md:w-[70%] lg:w-[60%] from-transparent bg-radial-gradient-ct from-purple-clear to-mainBg text-center">
            <H1 className="uppercase mb-8">Contact Information</H1>
            <p>If you have any questions about GDPR compliance, privacy, or your data <br/>please reach out to us using the following contact details:</p>
            <p className="my-2">Email:  <strong>contact@arzetechnologies.com</strong></p>
            <p>Address: <strong>coming soon</strong></p>
            </section>
            <Link to="/"><CtaButton className="my-8">Back to home</CtaButton></Link>
        </MainTemplate>
    </>
  )
}

export default Contact