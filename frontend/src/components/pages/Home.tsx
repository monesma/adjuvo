import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainTemplate from '../templates/MainTemplate';
import { H1, H2, H3 } from '../atoms/Headers';
import Card from '../atoms/Card';
import Builder from '../../assets/images/builder.png';
import Hbar from '../../assets/images/hbar.png';
import Bestia from '../../assets/images/bestia.png'
import Car from '../../assets/images/car.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBolt,
  faWallet,
  faTrophy,
  faGamepad,
  faLaptopCode,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  return (
    <MainTemplate className="text-white px-4 pt-[100px] md:pt-[150px]">
      <motion.div
        className="max-w-7xl mx-auto text-center"
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        <motion.div
  className="flex flex-col-reverse md:flex-row text-left items-center"
  initial="hidden"
  animate="show"
  variants={containerVariants}
>
  <div className="md:w-1/2">
    <H1 className="uppercase mb-6 text-left ml-0">Build the Future, Get Rewarded!</H1>
    <p className="text-xl mb-6 uppercase">
      Your contributions, forever on the Hashgraph
    </p>
    <p>
      The platform connecting builders with apps across the Hedera ecosystem.
      Complete missions, earn HBAR, level up, and build your on-chain reputation.
      Every contribution is certified, rewarded, and forever recorded on the Hashgraph.
    </p>
    <div className="flex justify-center md:justify-start gap-4 mb-12 mt-8">
  <Link
    to="/learn"
    className="border border-indigo-400 p-[9px] rounded-md w-40 text-center bg-indigo-400"
  >
    Learn More
  </Link>
  <a
    href="https://calendly.com/antoine-arzepayroll/30min"
    target="_blank"
    className="border border-white p-[9px] rounded-md w-40 text-center"
  >
    Book a Demo
  </a>
</div>

  </div>
  <div className="md:w-1/2">
    <img
      src={Builder}
      alt="Hashgraph builder in cyberpunk style with a gun"
      className="mx-auto w-full max-w-xl mb-2 md:mb-4"
    />
  </div>
</motion.div>




        <section>
          <H2 className="mb-8">Built Outside the Rules</H2>
          <p className="mb-8 max-w-4xl mx-auto">
            The age of centralized platforms is fading. A new path is emerging... open, direct, and permissionless.
            This isn’t just another product... It’s the foundation for a different kind of internet.
          </p>
          <p className="mb-8 max-w-4xl mx-auto">
            Adjuvo is made for builders who move fast and don't ask for permission.
            Every mission leaves a trace. Every reward adds weight. Every contribution strengthens the network.
            It's real impact, anchored in Hedera.
          </p>
          <p className="mb-8 max-w-4xl mx-auto">
            This isn’t about content. It’s about coordination.
            You don’t just participate. You shape outcomes. You are the system.
          </p>
          <p className="mb-8 max-w-4xl mx-auto">
            Web3 isn’t a promise. It’s territory.
            Adjuvo is how you claim your space... connected, distributed, and sovereign.
          </p>
          <p className="mb-8 max-w-4xl mx-auto uppercase font-bold text-xl">
            No gatekeepers. No waiting. Just action.
          </p>
        </section>

        <section>
          <motion.div
            className="grid md:grid-cols-3 gap-8 my-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
          <Card title="For Apps" variants={cardVariants}>
            <p className='uppercase p-2'>Grow faster with verified builders</p>
            <p className='text-left'>Post missions, get skilled contributors, and pay only for verified work. Adjuvo helps you scale securely with a trusted network of builders, transparent reward systems, and on-chain proof of execution.</p>
            <ul className="list-disc text-left pl-5">
              <li className='mb-2'>Access to qualified Hedera builders</li>
              <li className='mb-2'>Pay in HBAR, fully on-chain</li>
              <li className='mb-2'>Track progress and validate work</li>
              <li className='mb-2'>Gamified incentives</li>
              <li className='mb-2'>Immutable proof of contribution</li>
              <li>🔗 Seamless dApp integration</li>
            </ul>
          </Card>
          <Card title="For Builders" variants={cardVariants}>
            <p className='uppercase p-2'>Earn, level up, and build your reputation</p>
            <p className='text-left'>Take on real missions, earn HBAR, and build a public, verifiable on-chain profile. With badges, scores, and a global leaderboard, Adjuvo turns your skills into measurable, visible proof of value.</p>
            <ul className="list-disc text-left pl-5">
              <li className='mb-2'>Earn HBAR for real missions</li>
              <li className='mb-2'>Level up and earn badges</li>
              <li className='mb-2'>On-chain certification</li>
              <li className='mb-2'>Build verifiable reputation</li>
              <li className='mb-2'>Instant payments</li>
              <li>Compete on leaderboards</li>
            </ul>
          </Card>
          <Card title="For the Hedera Ecosystem" variants={cardVariants}>
            <p className='uppercase p-2'>Boost adoption with collaboration</p>
            <p className='text-left'>Adjuvo empowers the ecosystem by connecting builders with dApps, fueling innovation and trust through transparent incentives and on-chain proof. It’s community-driven growth at scale.</p>
            <ul className="list-disc text-left pl-5">
              <li className='mb-2'>Boost engagement</li>
              <li className='mb-2'>Transparent contribution tracking</li>
              <li className='mb-2'>Lower onboarding barriers</li>
              <li className='mb-2'>Talent marketplace for dApps</li>
              <li className='mb-2'>Circulates HBAR utility</li>
              <li>Strengthens builder economy</li>
            </ul>
          </Card>
          </motion.div>
        </section>
        <section className='bg-gray-900/50 p-8 rounded-2xl'>
          <H3 className="mb-4">Gamified Contributions, Real HBAR Rewards</H3>
          <img src={Hbar} alt="Hbar logo" className="mx-auto w-full max-w-[100px] mb-4" />
          <p className="mb-12 max-w-3xl mx-auto">
            Adjuvo turns contribution into an adventure. Builders complete missions, earn HBAR, level up, and collect badges. Every achievement is recorded on-chain with official certification. From leaderboard glory to verified reputation, your journey is provable and rewarded.
          </p>
          <div className="max-w-4xl mx-auto mb-16">
            <div className="aspect-video">
              <iframe
                className="w-full h-full rounded-xl shadow-xl"
                src="https://www.youtube.com/embed/hJqDykTAm3g?si=P17oKm8OC1DNS0vX"
                title="Adjuvo Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        <section>
          <H2 className="my-16">How It Works</H2>
            <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Card>
              <div className="text-indigo-400 mb-2">
                <FontAwesomeIcon icon={faLaptopCode} size="2x" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center uppercase">For Apps</h3>
              <ul className="space-y-2">
                <li>Create missions with HBAR rewards</li>
                <li>Review and validate builder submissions</li>
                <li>Gain XP, level up, and get renowned</li>
                <li>Pay only when the job is done and certified on-chain</li>
                <li>Track leaderboards to see top contributors</li>
              </ul>
            </Card>
            <Card>
              <div className="text-indigo-400 mb-2">
                <FontAwesomeIcon icon={faUsers} size="2x" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center uppercase">For Builders</h3>
              <ul className="space-y-2">
                <li>Choose missions and submit your work</li>
                <li>Earn HBAR when the app validates it</li>
                <li>Gain XP, level up, and get certified on-chain</li>
                <li>Compete on the leaderboard for extra rewards</li>
                <li>Unlock higher-level missions as you level up</li>
              </ul>
            </Card>
          </motion.div>

          <H2 className="my-16">Key Benefits</H2>
            <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Card className='px-2'>
              <div className="text-indigo-400 mb-2">
                <FontAwesomeIcon icon={faBolt} size="2x" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center uppercase">Speed</h3>
              <ul className="list-disc pl-5 space-y-1 text-left">
                <li>Instant HBAR payments 24/7</li>
                <li>Fast mission validation and rewards</li>
                <li>No delays, no intermediaries</li>
              </ul>
            </Card>
            <Card className='px-2'>
              <div className="text-indigo-400 mb-2">
                <FontAwesomeIcon icon={faWallet} size="2x" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center uppercase">Real HBAR Rewards</h3>
              <ul className="list-disc pl-5 space-y-1 text-left">
                <li>Earn HBAR for completed tasks</li>
                <li>Track your progress and rewards</li>
                <li>Withdraw or reinvest your HBAR</li>
              </ul>
            </Card>
            <Card className='px-2'>
              <div className="text-indigo-400 mb-2">
                <FontAwesomeIcon icon={faTrophy} size="2x" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center uppercase">Visibility</h3>
              <ul className="list-disc pl-5 space-y-1 text-left">
                <li>Gain visibility on leaderboards</li>
                <li>Apps reward top contributors</li>
                <li>Boost your reputation with achievements</li>
              </ul>
            </Card>
            <Card className='px-2'>
              <div className="text-indigo-400 mb-2">
                <FontAwesomeIcon icon={faGamepad} size="2x" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center uppercase">Gamification</h3>
              <ul className="list-disc pl-5 space-y-1 text-left">
                <li>Level up with every completed mission</li>
                <li>Unlock exclusive missions and bonuses</li>
                <li>Compete for top positions and rewards</li>
              </ul>
            </Card>
          </motion.div>
        </section>
        <section
        >
          <img src={Car} alt="Cyberpunk car" className="mx-auto w-full max-w-xl mt-16" />
          <H2 className='my-8'>Plug into the future and Join the rebellion</H2>
          <p className="max-w-3xl mx-auto">
              In this fractured world, be the one who hacks the system.
            </p>
            <p className="mt-4 max-w-3xl mx-auto">
              Whether you’re a builder or an app, this is where the revolution takes shape.
            </p>
            <p className="mt-4 max-w-3xl mx-auto">
              Break the chains of the old guard, encode your legacy in HBAR, and leave your mark on-chain.
            </p>
            <p className="mt-4 max-w-3xl mx-auto">
              No rules, no limits — just code, passion, and a hunger to change the game.
            </p>
            <p className="mt-4 max-w-3xl mx-auto">
              The future is dark, decentralized, cybernetic… and it’s waiting for you.
            </p>
          <H2 className="mt-10 mb-16">3 easy steps to get started</H2>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            
          >
            <Card title="Step 1: Connect Wallet">
              <p className='mt-4'>Start by connecting your HashPack wallet. HashPack is a secure wallet for the Hedera network, allowing you to seamlessly access the platform. By connecting, all your actions and rewards are securely linked to your Hedera account.</p>
            </Card>
            <Card title="Step 2: Choose Missions">
              <p className='mt-4'>After connecting your wallet, explore available missions tailored to your skills. Pick a mission, complete the tasks, and submit your work directly through the platform. Once submitted, app owners validate your submission to ensure accuracy and quality.</p>
            </Card>
            <Card title="Step 3: Earn HBAR">
              <p className='mt-4' >Once your submission is validated, you will receive HBAR directly into your HashPack wallet as a reward. As you complete more missions, you’ll earn XP, level up, and unlock new, more valuable missions. All achievements are recorded on-chain, making your progress fully traceable.</p>
            </Card>
          </motion.div>
          <div className="my-16 text-center">
            <H2>Ready to Transform the Future?</H2>
            <img src={Bestia} alt="Cyberpunk bestia" className="mx-auto w-full max-w-xs mb-8" />
            <p className="mt-4 max-w-3xl mx-auto">
              It's more than just an app, it's a catalyst for innovation in the Hedera ecosystem.
            </p>
            <p className="mt-4 max-w-3xl mx-auto">
              By seamlessly connecting developers and apps, it helps drive the growth of decentralized applications and empowers builders to engage in a thriving network of mission-driven collaboration.
            </p>
            <p className="mt-4 max-w-3xl mx-auto">With Adjuvo, developers and apps benefit from real-time contributions, verified on-chain reputations, and instant rewards in HBAR.
            </p>
            <p className="mt-4 max-w-3xl mx-auto">
              The app facilitates transparent and trustworthy collaboration that scales across the Hedera ecosystem, creating new opportunities for growth and success.
            </p>
            <p className="mt-4 max-w-3xl mx-auto">
              Enable decentralized collaboration for Hedera apps
            </p>
            <p className="mt-4 max-w-3xl mx-auto">
              Reward builders with verified HBAR contributions
            </p>

            <p className="mt-4 max-w-3xl mx-auto">
              Strengthen the Hedera community by fostering transparency and engagement
            </p>
            <p className="mt-4 max-w-3xl mx-auto">
              Scale your app's network by engaging top-tier, verified developers
            </p>
            <p className="mt-4 max-w-3xl mx-auto">
              Unlock new possibilities and features through community-driven innovation
            </p>
            <p className="mt-4 max-w-3xl mx-auto font-bold">
              contact@arzetechnologies.com
            </p>
          </div>
        </section>
      </motion.div>
    </MainTemplate>
  );
}
