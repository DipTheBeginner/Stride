import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { Slot } from "radix-ui";

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-sm border border-transparent px-2 text-xs font-medium outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring/50 [&>svg]:pointer-events-none [&>svg]:shrink-0 [&>svg]:size-3",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground [a]:hover:bg-primary/90",

        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-foreground/10",

        outline:
          "border-border text-muted-foreground [a]:hover:bg-accent",

        success:
          "border-success/20 bg-success/10 text-success",

        warning:
          "border-warning/20 bg-warning/10 text-warning",

        destructive:
          "border-destructive/20 bg-destructive/10 text-destructive",

        ghost:
          "text-muted-foreground [a]:hover:bg-accent [a]:hover:text-foreground",

        link:
          "text-primary underline-offset-4 [a]:hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };