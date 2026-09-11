import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary/90 text-primary-foreground shadow-[0_1px_3px_oklch(from var(--primary) l c h/0.3)] [a]:hover:bg-primary [a]:hover:shadow-[0_2px_8px_oklch(from var(--primary) l c h/0.4)]",
        secondary:
          "bg-secondary/80 text-secondary-foreground backdrop-blur-sm [a]:hover:bg-secondary",
        destructive:
          "bg-destructive/15 text-destructive shadow-[0_1px_3px_oklch(0.577_0.245_27.325/0.2)] focus-visible:ring-destructive/20 dark:bg-destructive/25 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/25",
        outline:
          "border-border/60 text-foreground [a]:hover:bg-muted/50 [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted/60 hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
