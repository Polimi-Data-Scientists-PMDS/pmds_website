import Confetti from '@/shared/components/ui/Confetti';
import Button from '@/shared/components/ui/Button';
import { FaHeart } from 'react-icons/fa';

export default function ThankYouPage() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 pt-20">
      {/* Celebration Background Glows */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-accent/20 blur-[120px] md:h-[600px] md:w-[600px]"></div>

      <Confetti />

      <div className="relative z-10 flex w-full max-w-[600px] flex-col items-center gap-6 rounded-[32px] border border-white/10 bg-background-secondary p-10 text-center shadow-[0_0_80px_rgba(75,111,254,0.15)] backdrop-blur-xl md:p-16">
        <div className="relative">
          <div className="absolute inset-0 animate-pulse rounded-full bg-accent opacity-40 blur-[20px]"></div>
          <FaHeart className="relative z-10 text-7xl text-accent" />
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="bg-gradient-to-r from-foreground to-foreground-secondary bg-clip-text type-heading text-transparent">
              Thank you so much!
            </h1>
            <p className="type-body text-foreground-secondary">
              Your generous donation has been processed successfully.
              Contributions like yours allow PMDS to keep organizing amazing
              workshops, projects, and events for our community.
            </p>
          </div>

          <Button href="/">Return to Homepage</Button>
        </div>
      </div>
    </div>
  );
}
