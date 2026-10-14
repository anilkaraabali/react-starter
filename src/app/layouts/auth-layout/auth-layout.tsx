import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Logo } from '@/components/atoms/logo';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const easing = [0.22, 1, 0.36, 1] as const;

const slideUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: easing },
    y: 0,
  },
};

type AuthLayoutProps = {
  children: ReactNode;
};

/** Presentational layout shell for authentication screens (`/_auth`). */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='relative flex h-dvh flex-col overflow-hidden bg-background'>
      <div className='relative z-10 flex min-h-0 flex-1 overflow-y-auto p-6'>
        <motion.div
          animate='visible'
          className='m-auto w-full max-w-104'
          initial='hidden'
          variants={containerVariants}
        >
          <motion.div variants={slideUp}>
            <div className='mb-8 flex justify-center'>
              <div className='flex items-center justify-center rounded-lg border border-accent/25 bg-accent/12 p-2.5'>
                <Logo className='h-8 w-auto text-accent' />
              </div>
            </div>

            <div
              className='relative rounded-2xl border border-accent/12 p-8 shadow-xl backdrop-blur-sm'
              style={{
                boxShadow:
                  '0 4px 6px -1px oklch(from var(--foreground) l c h / 0.04), 0 24px 48px -8px oklch(from var(--foreground) l c h / 0.08)',
              }}
            >
              <div
                aria-hidden='true'
                className='absolute top-0 right-8 left-8 h-px'
                style={{
                  background:
                    'linear-gradient(90deg, transparent, oklch(from var(--accent) l c h / 0.5), transparent)',
                }}
              />

              {children}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
