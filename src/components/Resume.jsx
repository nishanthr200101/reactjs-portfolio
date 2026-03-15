import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { resumepreview } from '../assets';
import { fadeIn } from '../utils/motion';

const Resume = () => {
  const [resumeUrl, setResumeUrl] = useState(null);

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_BASE_URL;
    if (!apiBase) return;

    fetch(`${apiBase}/settings/public`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.resumeUrl) setResumeUrl(data.resumeUrl);
      })
      .catch(() => {}); // fall back to local PDF
  }, []);

  const src = resumeUrl || resumepreview;

  return (
    <motion.div variants={fadeIn("up", "spring", 0.3, 0.75)}>
      <div className='bg-tertiary p-8 rounded-2xl w-full sm:w-[600px] mx-auto shadow-lg'>
        <div className='resume-content'>
          <h1 className={`${styles.sectionHeadText} text-center mb-4`}>My Resume</h1>
          <p className='text-primary text-[17px] text-center mb-6 leading-[30px]'>
            You can view and download my resume below. It highlights my experience, skills, and projects as a software developer.
          </p>

          <div className='w-full h-[500px] mb-6'>
            <iframe
              src={src}
              title='My Resume'
              width='100%'
              height='100%'
              className='rounded-xl border-none'
            ></iframe>
          </div>

          <a
            href={src}
            download="Nishanth_Resume.pdf"
            className='bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors text-center block w-full'
          >
            Download Resume
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Resume;
