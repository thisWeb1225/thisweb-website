'use client';
import Image from 'next/image';

// Framer motion
import { motion } from 'framer-motion';

// Components

// lib
import { subscribeConvertKitEmail } from '@/lib/subscribeConvertKitEmail';

// Data
import { convertKitFormId } from '@/lib/convertKitFormId';
import Newsletter from './components/Newsletter';

const { heroFormId } = convertKitFormId;

function HeroBanner() {
  return (
    <section className="min-h-[120vh] md:min-h-[90vh] flex flex-col md:flex-row lg:gap-16 mb-24">
      <motion.div
        animate={{ x: 0, opacity: 1 }}
        className="flex-1 basis-1/3 md:basis-2/3 flex flex-col justify-center md:gap-4 gap-2 text-center md:text-left"
        initial={{ x: '-100%', opacity: 0 }}
        transition={{
          duration: 0.8,
        }}
      >
        <p className="text-xs font-normal tracking-widest text-gray-500">
          請網這邊走 ThisWeb | 前端 x 轉職 x 提升競爭力
        </p>
        <h2 className="font-semibold text-3xl md:text-4xl leading-tight drop-shadow-md">
          幫助你從零開始學習網頁程式
        </h2>
        <p className="text-gray-500 text-xs md:text-base">
          提供完整入門教學、JS
          核心觀念講解，讓你快速上手網頁程式，學會前端核心技能，轉職更順利。
        </p>
        <p className="text-base">
          加入<span className="text-secondary">電子報</span>，每週三準時收到 1
          篇前端的技術文章。
        </p>
        <Newsletter
          data-testid="newsletter"
          formId={heroFormId}
          onSubscribe={subscribeConvertKitEmail}
        />
      </motion.div>

      <motion.div
        animate={{ x: 0, opacity: 1 }}
        className="flex-1 md:basis-1/3 relative"
        initial={{ x: '100%', opacity: 0 }}
        transition={{
          duration: 0.8,
        }}
      >
        <Image alt="hero banner" fill priority src="/heroBanner.svg" />
      </motion.div>
    </section>
  );
}

export default HeroBanner;
