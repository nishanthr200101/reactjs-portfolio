import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { styles } from '../styles';
import { resumepreview } from '../assets';
import { fadeIn } from '../utils/motion';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Resume = () => {
  const [resumeUrl, setResumeUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [containerWidth, setContainerWidth] = useState(600);
  const containerRef = React.useRef(null);

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_BASE_URL;
    if (!apiBase) return;
    fetch(`${apiBase}/settings/public`)
      .then((r) => r.json())
      .then((data) => { if (data?.resumeUrl) setResumeUrl(data.resumeUrl); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const src = resumeUrl || resumepreview;

  return (
    <motion.div
      variants={fadeIn('up', 'spring', 0.3, 0.75)}
      className='max-w-3xl mx-auto px-4'
    >
      {/* Header */}
      <div className='text-center mb-8'>
        <h2 className={styles.sectionHeadText}>My Resume</h2>
        <p className='mt-3 text-secondary text-[17px]'>
          View my resume or download a copy below.
        </p>
      </div>

      {/* PDF Viewer card */}
      <div
        className='rounded-2xl overflow-hidden shadow-2xl'
        style={{ background: 'var(--color-tertiary)' }}
      >
        {/* Toolbar */}
        <div
          className='flex items-center justify-between px-5 py-3 border-b border-white/10'
          style={{ background: 'var(--color-secondary)' }}
        >
          {/* Page controls */}
          <div className='flex items-center gap-3'>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className='w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center disabled:opacity-30 hover:bg-white/30 transition-colors text-sm'
            >
              ‹
            </button>
            <span className='text-white text-sm font-medium'>
              {currentPage} / {numPages ?? '—'}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(numPages ?? 1, p + 1))}
              disabled={currentPage >= (numPages ?? 1)}
              className='w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center disabled:opacity-30 hover:bg-white/30 transition-colors text-sm'
            >
              ›
            </button>
          </div>

          {/* Actions */}
          <div className='flex gap-2'>
            <a
              href={src}
              target='_blank'
              rel='noreferrer'
              className='text-white/80 hover:text-white text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors'
            >
              Open ↗
            </a>
            <a
              href={src}
              download='Nishanth_Resume.pdf'
              className='text-white text-xs px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors font-semibold'
            >
              Download ↓
            </a>
          </div>
        </div>

        {/* PDF canvas */}
        <div
          ref={containerRef}
          className='flex justify-center overflow-auto'
          style={{ maxHeight: '75vh', background: '#f0f0f0' }}
        >
          <Document
            file={src}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={
              <div className='flex items-center justify-center h-64 w-full'>
                <span className='text-gray-500 text-sm animate-pulse'>Loading PDF…</span>
              </div>
            }
            error={
              <div className='flex items-center justify-center h-64 w-full'>
                <span className='text-red-500 text-sm'>Failed to load PDF.</span>
              </div>
            }
          >
            <Page
              pageNumber={currentPage}
              width={Math.min(containerWidth, 780)}
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </Document>
        </div>

        {/* Bottom page dots */}
        {numPages > 1 && (
          <div className='flex justify-center gap-2 py-3 border-t border-white/10'>
            {Array.from({ length: numPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentPage === i + 1
                    ? 'bg-secondary scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Resume;
