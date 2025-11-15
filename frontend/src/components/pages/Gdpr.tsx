import { Link } from "react-router-dom"
import { H1, H2 } from "../atoms/Headers"
import CtaButton from "../atoms/CtaButton"
import MainTemplate from "../templates/MainTemplate"

const Gdpr = () => {
  return (
    <>
      <MainTemplate className="py-24">
        <section className="flex flex-col p-8 rounded-xl w-[90%] md:w-[70%] lg:w-[60%] from-transparent bg-radial-gradient-ct from-purple-clear to-mainBg">
          <H1 className="uppercase mb-8">General Data Protection Regulation (GDPR)</H1>
          <p>
            At Adjuvo, your privacy and the protection of your personal data are our highest priorities. In a connected world where information travels at the speed of light, we are committed to upholding the principles of the General Data Protection Regulation (GDPR) to secure your trust and freedom.
          </p>

          <article>
            <H2 className="text-left my-6">1. Data Collection</H2>
            <p>We collect only the data necessary to provide our services and enhance your experience on the Adjuvo platform. This includes:</p>
            <ul className="my-4 list-disc list-inside">
              <li>Account information (username, email address).</li>
              <li>Participation data (missions completed, badges earned, reputation score).</li>
              <li>Wallet addresses for rewards distribution (HBAR transactions).</li>
            </ul>
            <p>All data is provided voluntarily by users upon registration and interaction with the platform.</p>
          </article>

          <article>
            <H2 className="text-left my-6">2. Purpose of Data Processing</H2>
            <p>The personal data we collect is used to:</p>
            <ul className="my-4 list-disc list-inside">
              <li>Operate and improve the Adjuvo platform.</li>
              <li>Distribute mission rewards and manage reputation systems.</li>
              <li>Enable on-chain actions securely via the Hedera Hashgraph network.</li>
              <li>Comply with legal, financial, and operational requirements.</li>
            </ul>
          </article>

          <article>
            <H2 className="text-left my-6">3. Consent and Control</H2>
            <p>
              Users have full control over their data. By creating an account and using Adjuvo, you consent to the collection and processing of your data as described. You can withdraw your consent or request data modifications at any time via your account settings or by contacting our support team.
            </p>
          </article>

          <article>
            <H2 className="text-left my-6">4. Data Retention</H2>
            <p>
              We retain personal data only as long as necessary to fulfill the purposes outlined above. Data associated with rewards and missions may be retained to comply with financial and legal obligations. Users may request account deletion, after which personal data will be securely erased within legally permitted timelines.
            </p>
          </article>

          <article>
            <H2 className="text-left my-6">5. Your Rights</H2>
            <p>Under GDPR, you have the following rights:</p>
            <ul className="my-4 list-disc list-inside">
              <li>Access: Request a copy of your personal data.</li>
              <li>Correction: Request corrections to inaccurate data.</li>
              <li>Deletion: Request the deletion of your account and associated data.</li>
              <li>Objection: Object to specific types of data processing.</li>
            </ul>
          </article>

          <article>
            <H2 className="text-left my-6">6. Data Security</H2>
            <p>
              Adjuvo employs advanced encryption, decentralized storage techniques, and regular security audits to protect your personal information. Our systems are designed to resist unauthorized access, ensuring your data stays safe in a rapidly evolving digital world.
            </p>
          </article>

          <article>
            <H2 className="text-left my-6">7. Contact</H2>
            <p>
              For any GDPR-related inquiries or to exercise your rights, please contact us at: <a href="mailto:privacy@adjuvo.app" className="text-link">privacy@adjuvo.app</a>.
            </p>
          </article>
        </section>
        <Link to="/"><CtaButton className="my-8">Back to home</CtaButton></Link>
      </MainTemplate>
    </>
  )
}

export default Gdpr
