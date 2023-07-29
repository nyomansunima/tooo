import { mergeClass } from '@lib/utils/styles'
import { Slot } from '@radix-ui/react-slot'
import { VariantProps, cva } from 'class-variance-authority'
import { HTMLAttributes, HtmlHTMLAttributes, forwardRef } from 'react'

/**
 * Button variants component
 * that allow another component that must have
 * style like the button to reuse
 */
const buttonVariants = cva(
  'flex justify-center items-center gap-3 text-base font-semibold leading-none relative transition-all duration-500',
  {
    variants: {
      variant: {
        primary: '',
        secondary: '',
        ghost: '',
        link: '',
        outline:
          'border border-neutral-200 text-black bg-transparent hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-800',
      },
      size: {
        small: 'h-10 px-4 rounded-lg',
        base: 'h-12 px-5 rounded-xl',
        madium: 'h-14 px-6 rounded-xl',
        large: 'h-16 px-8 rounded-2xl',
        icon: 'h-12 w-12 rounded-full',
      },
    },
    defaultVariants: {
      size: 'base',
      variant: 'primary',
    },
  },
)

interface ButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    HtmlHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

/**
 * Render the button component
 * for every purpose
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        {...props}
        className={mergeClass(buttonVariants({ className, variant, size }))}
        ref={ref}
      />
    )
  },
)

export { buttonVariants, Button }
