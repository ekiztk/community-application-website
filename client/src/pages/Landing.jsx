import { heroImage } from '../assets/img';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Navbar from '../components/ui/Navbar';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';

const Landing = () => {
  return (
    <>
      <Navbar />
      <div className="relative">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{import.meta.env.VITE_WEB_NAME}</title>
        </Helmet>

        <section className="h-96 lg:h-128 relative">
          <img
            src={heroImage}
            alt="Hero"
            className="h-full w-full object-cover"
          />
          <div className="p-4 absolute top-0 h-full w-full flex flex-col justify-center gap-y-6 bg-gradient-to-b from-transparent to-black">
            <div className="text-center tracking-tight md:tracking-wide">
              <Typography className="text-white" variant="h1" component="h1">
                Lorem Ipsum
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
              ABOUT US
            </Typography>
            <Typography variant="body1" className="leading-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed
              maximus leo. Fusce consequat sed ipsum non euismod. Sed ante
              metus, faucibus quis lorem sed, ultrices luctus erat. Mauris
              condimentum, lacus ac consequat commodo, nulla tellus maximus
              ipsum, vel gravida risus mauris at tortor. Ut condimentum feugiat
              ante ac pharetra. Praesent interdum accumsan diam vel faucibus.
              Nam eu orci sollicitudin augue tempus suscipit ac nec orci. Nulla
              a consectetur mi, sed mattis urna. Nam eget metus vitae massa
              ullamcorper tempus. Etiam auctor ex id pulvinar suscipit. Praesent
              placerat mattis ligula at sodales. Nunc velit arcu, elementum sed
              varius ac, fermentum sed nulla. Mauris eu maximus nunc. Fusce
              ultricies pretium libero, vel interdum ex tristique a. Proin quis
              nisi sodales, eleifend eros volutpat, rhoncus metus. Quisque
              interdum vehicula risus at eleifend. Vivamus quis diam sit amet
              urna suscipit venenatis. Donec blandit posuere erat nec tincidunt.
              Mauris faucibus egestas convallis. Donec aliquam arcu nec
              pellentesque cursus.
            </Typography>
          </div>
        </section>
        <hr />
        <section className="p-4 md:p-8 ">
          <Typography className="text-center" variant="h2" component="h2">
            OUR VALUES
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 p-8">
            <div className="p-4 auto-rows-auto auto-cols-auto shadow-inner rounded-sm border-solid border-2 border-gray-300">
              <EmojiEmotionsIcon
                fontSize="large"
                className="mx-auto inline-block mb-4"
              />
              <Typography align="center" variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed
                maximus leo. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.
              </Typography>
            </div>
            <div className="p-4 auto-rows-auto auto-cols-auto shadow-inner rounded-sm border-solid border-2 border-gray-300">
              <EmojiEmotionsIcon
                fontSize="large"
                className="mx-auto inline-block mb-4"
              />
              <Typography align="center" variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed
                maximus leo. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.
              </Typography>
            </div>
            <div className="p-4 auto-rows-auto auto-cols-auto shadow-inner rounded-sm border-solid border-2 border-gray-300">
              <EmojiEmotionsIcon
                fontSize="large"
                className="mx-auto inline-block mb-4"
              />
              <Typography align="center" variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed
                maximus leo. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.
              </Typography>
            </div>
          </div>
        </section>
        <hr />
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
        </section>
        <footer className="text-center text-gray-400">
          <span>Copyright © 2023 ekiztk@github.com</span>
        </footer>
      </div>
    </>
  );
};

export default Landing;
