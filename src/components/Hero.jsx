import { styles } from "../styles";
import { RoBotCanvas, ComputersCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className={`w-full h-screen mx-auto mt-20`}>
      <div
        className={`max-w-12xl mx-auto ${styles.paddingX} flex flex-row items-start gap-18`}
      >
        <div className='flex flex-col justify-center items-center mt-5 mr-5'>
          <div className='w-5 h-5 rounded-full bg-secondary' />
          <div className='w-1 sm:h-40 h-20 orange-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='text-secondary'>Nishanth</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            Results-driven Senior Full-Stack Engineer with 4+ years of experience building
            scalable SaaS platforms using React.js, Next.js, Node.js, and PostgreSQL
          </p>
        </div>
        <div className='w-1/4'>
          <RoBotCanvas />
        </div>
      </div>
      <div className='w-full h-[60vh]'>
        <ComputersCanvas/>
      </div>
    </section>
  );
};

export default Hero;
