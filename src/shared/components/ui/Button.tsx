import { tv, type VariantProps } from 'tailwind-variants';
import DynamicLink from './DynamicLink';

export const buttonVariants = tv({
  base: 'group type-label inline-flex w-fit cursor-pointer items-center justify-center gap-2 text-center transition-all disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    variant: {
      primary: 'bg-accent text-white hover:bg-accent-dark',
      secondary:
        'border bg-background-secondary text-foreground hover:border-accent',
      inverted:
        'bg-foreground text-background-secondary hover:bg-accent hover:text-white',
      cyan: 'bg-linear-to-r from-cyan-400 to-blue-500 font-medium text-black shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:from-cyan-300 hover:to-blue-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.55)]',
      amber:
        'bg-linear-to-r from-amber-400 to-orange-500 font-medium text-black shadow-[0_0_20px_rgba(251,191,36,0.35)] hover:from-amber-300 hover:to-orange-400 hover:shadow-[0_0_30px_rgba(251,191,36,0.55)]',
      ghost: 'text-foreground-secondary hover:text-foreground',
      link: 'text-accent hover:text-foreground',
    },
    size: {
      sm: 'px-2.5 py-1',
      md: 'px-6 py-3',
      lg: 'px-8 py-3.5',
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
