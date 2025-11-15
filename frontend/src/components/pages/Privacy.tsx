import { Link } from "react-router-dom"
import MainTemplate from "../templates/MainTemplate"
import CtaButton from "../atoms/CtaButton"
import { H1, H2 } from "../atoms/Headers"

const Privacy = () => {
  return (
    <>
      <MainTemplate>
        <section className="flex flex-col p-8 rounded-xl w-[90%] md:w-[70%] lg:w-[60%] from-transparent bg-radial-gradient-ct from-purple-clear to-mainBg">
          <H1 className="uppercase mb-8">Privacy Policy for Adjuvo</H1>
          <p>
            At Adjuvo, protecting your personal data is a core part of our mission. This Privacy Policy explains how we collect, use, and safeguard your information as you explore and build within the Hedera Hashgraph ecosystem.
          </p>

          <article>
            <H2 className="text-left my-6">1. Data We Collect</H2>
            <p>When you interact with Adjuvo, we collect only what is necessary to power your experience:</p>
            <ul className="my-4 list-disc list-inside">
              <li>Account identifiers (username, email address).</li>
              <li>Wallet addresses for HBAR rewards and transactions.</li>
              <li>Activity data (missions completed, achievements, reputation level).</li>
            </ul>
            <p>All data is provided voluntarily when you register or use the platform.</p>
          </article>

          <article>
            <H2 className="text-left my-6">2. Why We Use Your Data</H2>
            <p>Your data is essential to:</p>
            <ul className="my-4 list-disc list-inside">
              <li>Track missions, rewards, and reputation growth.</li>
              <li>Facilitate secure HBAR payments and transactions on the Hedera network.</li>
              <li>Maintain platform integrity and improve your experience.</li>
            </ul>
          </article>

          <article>
            <H2 className="text-left my-6">3. Data Sharing</H2>
            <p>Your data is strictly used within the Adjuvo ecosystem. We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
            <p>Data may be shared only with:</p>
            <ul className="my-4 list-disc list-inside">
              <li>Service providers essential to the operation of Adjuvo (e.g., hosting, blockchain interaction tools).</li>
              <li>Authorities if legally required (e.g., to comply with a valid legal process).</li>
            </ul>
          </article>

          <article>
            <H2 className="text-left my-6">4. Data Security and Retention</H2>
            <p>
              Your data is protected with state-of-the-art security measures, including encryption, decentralized storage, and continuous security audits. We retain your information only as long as necessary to provide services and meet legal obligations.
            </p>
            <p>
              Upon request, users can delete their accounts and associated personal data, following GDPR guidelines.
            </p>
          </article>

          <article>
            <H2 className="text-left my-6">5. Your Rights</H2>
            <p>
              You have the right to access, correct, or request the deletion of your personal data at any time. For any inquiries or to exercise your rights, contact us at: <a href="mailto:privacy@adjuvo.app" className="text-link">privacy@adjuvo.app</a>.
            </p>
          </article>
        </section>
        <Link to="/"><CtaButton className="my-8">Back to home</CtaButton></Link>
      </MainTemplate>
    </>
  )
}

export default Privacy
