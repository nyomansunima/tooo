import { mergeClass } from '@lib/utils/styles'
import { Slot } from '@radix-ui/react-slot'
import { VariantProps, cva } from 'class-variance-authority'
import { HTMLAttributes, HtmlHTMLAttributes, forwardRef } from 'react'

/**
 * Button variants component
 * that allow another component that must have
 * style like the button to reuse
 */
const buttonVariants = cva('', {
  variants: {
    variant: {
      flat: '',
      outline: '',
      ghost: '',
      link: '',
    },
    size: {
      small: '',
      base: '',
      madium: '',
      large: '',
      icon: '',
    },
    accent: {
      primary: '',
      secondary: '',
      neutral: '',
    },
  },
})

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
  ({ className, variant, size, accent, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        {...props}
        className={mergeClass(
          buttonVariants({ className, variant, size, accent }),
        )}
        ref={ref}
      />
    )
  },
)

export { buttonVariants, Button }
