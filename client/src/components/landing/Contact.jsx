import React from "react";
import { SiDiscord, SiInstagram, SiMaildotru } from "react-icons/si";

const Contact = () => {
  return (
    <section className="p-4 md:p-8">
      <h2 className="pb-4  text-center text-2xl lg:text-4xl text-black">
        CONTACT US
      </h2>
      <div className="p-8 flex flex-col justify-center items-center md:flex-row md:p-4 gap-4 md:gap-8">
        <SiDiscord
          className="transition duration-150 hover:scale-110"
          size="56"
        />
        <SiInstagram
          className="transition duration-150 hover:scale-110"
          size="56"
        />
        <SiMaildotru
          className="transition duration-150 hover:scale-110"
          size="56"
        />
      </div>
    </section>
  );
};

export default Contact;
