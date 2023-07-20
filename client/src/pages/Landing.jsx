import {
  heroImage,
  networkImage,
  skillImage,
  supportImage,
} from '../assets/img';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Navbar from '../components/ui/Navbar';
import { Avatar, Typography } from '@mui/material';
import SEO from 'components/SEO';

const Landing = () => {
  return (
    <>
      <Navbar />
      <div className="relative">
        <SEO
          title={import.meta.env.VITE_WEB_NAME}
          description="desc"
          name="Company name."
          type="article"
        />
        <section className="h-96 lg:h-128 relative">
          <img
            src={heroImage}
            alt="Hero"
            className="h-full w-full object-cover"
          />
          <div className="p-4 absolute top-0 h-full w-full flex flex-col justify-center gap-y-6 bg-gradient-to-b from-transparent to-black">
            <div className="text-center tracking-tight md:tracking-wide">
              <Typography className="text-white" variant="h2" component="h2">
                Empowering Coders, Transforming Careers!
              </Typography>
              <Typography className="text-white" variant="subtitle1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sapiente quas officia aut quidem? Numquam fuga quis repellendus
                ad beatae culpa?
              </Typography>
            </div>
          </div>
        </section>
        <section className="p-4 md:p-8">
          <div className="text-center tracking-tight md:tracking-wide">
            <Typography variant="h2" component="h2">
              About Us
            </Typography>
            <Typography variant="body1" lineHeight={2} className="px-2 md:px-8">
              In today's rapidly changing job market, many talented programmers
              find themselves facing a unique challenge -
              <span className="text-2xl uppercase"> unemployment</span>. The
              field of programming is highly competitive and constantly
              evolving, making it essential for programmers to stay ahead of the
              curve. However, when faced with unemployment, it can be difficult
              to navigate this ever-changing landscape alone. That's where the
              Unemployed Programmers Helper Community comes in. We are a
              dedicated community that aims to empower unemployed programmers by
              providing them with the support and resources they need to
              overcome challenges and unlock new opportunities in their careers.
              At our core, we believe that every programmer has untapped
              potential waiting to be unleashed. Our mission is simple - encoded
              success for unemployed programmers through empowerment and
              collaboration.
            </Typography>
          </div>
        </section>
        <hr />
        <section className="p-4 md:p-8 ">
          <Typography className="text-center" variant="h2" component="h2">
            Our Features
          </Typography>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16 p-8">
            <div className="pt-2 auto-rows-auto auto-cols-auto shadow-inner rounded-lg border-solid border-2 border-gray-300">
              <img
                alt="Skills Enhancement Programs"
                className="mx-auto max-h-48 object-contain"
                src={skillImage}
              />
              <Typography align="center" marginY={2} variant="h5">
                Skills Enhancement Programs
              </Typography>
              <Typography align="center" paddingX={2} variant="body1">
                In a fast-paced industry like programming,it's crucial to
                continually upgrade your skills.Unemployed Programmers provides
                access to various skill enhancement programs.These include
                coding bootcamps,certifications,tutorials,and workshops designed
                to sharpen technical abilities.Expand your knowledge base,enrich
                your portfolio,and boost employability.
              </Typography>
            </div>
            <div className="pt-2 auto-rows-auto auto-cols-auto shadow-inner rounded-lg border-solid border-2 border-gray-300">
              <img
                alt="Networking and Collaboration"
                className="mx-auto max-h-48 object-contain"
                src={networkImage}
              />
              <Typography align="center" marginY={2} variant="h5">
                Networking and Collaboration
              </Typography>
              <Typography align="center" paddingX={2} variant="body1">
                Building a strong professional network is essential for career
                growth.Unemployed Programmers facilitates networking
                opportunities through community events,online forums,and
                collaboration projects.Connect with like-minded
                individuals,share industry insights,and tap into potential job
                leads.Expand your connections and open doors to new
                possibilities.
              </Typography>
            </div>
            <div className="pt-2 auto-rows-auto auto-cols-auto shadow-inner rounded-lg border-solid border-2 border-gray-300">
              <img
                alt="Emotional Support"
                className="mx-auto max-h-48 object-contain "
                src={supportImage}
              />
              <Typography align="center" marginY={2} variant="h5">
                Emotional Support
              </Typography>
              <Typography align="center" paddingX={2} variant="body1">
                Job loss can be emotionally challenging.Our community offers a
                safe space where members can share
                experiences,struggles,successes,and find emotional support
                during their journey towards employment.We believe that
                together,we are stronger;encouraging each other to
                persevere,tackle challenges head-on and remain motivated
                throughout the process.
              </Typography>
            </div>
          </div>
        </section>
        {/* <hr />
        <section className="p-4 md:p-8">
          <Typography className="text-center" variant="h2" component="h2">
            CONTACT US
          </Typography>
          <div className="p-8 flex flex-col justify-center items-center md:flex-row md:p-4 gap-4 md:gap-8">
            <EmojiEmotionsIcon
              fontSize="large"
              className="transition duration-150 hover:scale-110"
            />
            <EmojiEmotionsIcon
              fontSize="large"
              className="transition duration-150 hover:scale-110"
            />
            <EmojiEmotionsIcon
              fontSize="large"
              className="transition duration-150 hover:scale-110"
            />
          </div>
        </section> */}
        <footer className="text-center text-gray-400">
          <span>Copyright © 2023 ekiztk@github.com</span>
        </footer>
      </div>
    </>
  );
};

export default Landing;
