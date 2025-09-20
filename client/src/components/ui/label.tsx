import * as React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '@util/tn-merge';

const labelVariants = cva('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70');

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants> & { optional?: boolean }
>(({ className, children, optional = false, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props}>
    {children}
    {optional && <span className="text-xs font-normal text-gray-400"> (Opsional)</span>}
  </LabelPrimitive.Root>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
