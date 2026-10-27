export interface PageHeadingProps {
  text: string;
  highlightedText?: string;
  description?: string;
}

export function PageHeading({
  text,
  highlightedText,
  description,
}: PageHeadingProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="w-fit type-heading">
        {text}
        {highlightedText && (
          <span className="text-accent italic"> {highlightedText}</span>
        )}
      </h1>
      {description && (
        <p className="type-body text-foreground-secondary md:max-w-[50%]">
          {description}
        </p>
      )}
    </div>
  );
}
