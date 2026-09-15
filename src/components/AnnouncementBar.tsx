import { FaRocket } from 'react-icons/fa';

export default function AnnouncementBar({
  title,
  linkText,
  link,
}: {
  title: string;
  linkText?: string;
  link?: string;
}) {
  return (
    <div className="w-full bg-gradient-to-r from-[#4b6ffe] to-indigo-600 px-4 py-2 flex items-center justify-center relative z-50 shadow-md">
      <div className="flex items-center gap-2 text-white text-sm font-semibold">
        <FaRocket className="text-white/80" />
        <span>{title}</span>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 underline underline-offset-2 hover:text-white/80 transition-colors"
          >
            {linkText}
          </a>
        )}
      </div>
    </div>
  );
}
