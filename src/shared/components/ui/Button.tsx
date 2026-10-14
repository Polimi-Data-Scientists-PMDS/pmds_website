import { tv, type VariantProps } from 'tailwind-variants';
import DynamicLink from './DynamicLink';

export const buttonVariants = tv({
  base: 'group rounded-xl inline-flex w-fit cursor-pointer items-center justify-center gap-2 text-center transition-all disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    variant: {
      primary:
        'bg-accent font-bold text-foreground shadow-[0_0_20px_--alpha(var(--color-accent)/30%)] hover:bg-accent-secondary hover:shadow-[0_0_30px_--alpha(var(--color-accent)/50%)]',
      secondary:
        'border border-white/10 bg-white/5 font-semibold text-foreground backdrop-blur-md hover:bg-white/10',
      inverted:
        'bg-foreground font-bold text-background shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-foreground/90',
      cyan: 'bg-linear-to-r from-cyan-400 to-blue-500 font-extrabold text-black shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:from-cyan-300 hover:to-blue-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.55)]',
      amber:
        'bg-linear-to-r from-amber-400 to-orange-500 font-extrabold text-black shadow-[0_0_20px_rgba(251,191,36,0.35)] hover:from-amber-300 hover:to-orange-400 hover:shadow-[0_0_30px_rgba(251,191,36,0.55)]',
      ghost: 'font-medium text-muted hover:text-foreground',
      link: 'font-semibold text-accent hover:text-foreground',
    },
    size: {
      sm: 'px-2.5 py-1 text-xs',
      md: 'px-6 py-3',
      lg: 'px-8 py-3.5 text-sm',
      icon: 'p-2',
    },
    fullWidth: {
      true: 'w-full',
    },
  },
  compoundVariants: [
    {
      variant: ['ghost', 'link'],
      size: ['sm', 'md', 'lg'],
      class: 'p-0',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'lg',
  },
});

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type LinkButtonProps = ButtonVariantProps &
  React.HTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = ButtonVariantProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

export default function Button({
  variant,
  size,
  fullWidth,
  className,
  ...props
}: ButtonProps) {
  const classes = buttonVariants({
    variant,
    size,
    fullWidth,
    className,
  });

  if (props.href !== undefined) {
    return <DynamicLink {...props} className={classes} />;
  }

  const { type = 'button', ...buttonProps } = props as NativeButtonProps;
  return <button type={type} {...buttonProps} className={classes} />;
}
