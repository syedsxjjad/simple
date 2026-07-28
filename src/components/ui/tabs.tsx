import * as React from 'react';
import { cn } from '@/utils/utils';
import * as TabsPrimitive from '@radix-ui/react-tabs';

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn('flex flex-col gap-2', className)} {...props} />;
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'bg-foreground-white border border-border-grey text-mute-foreground inline-flex h-9 w-fit items-center justify-center rounded-full',
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'inline-flex h-[calc(100%-1px)] flex-1 items-center gap-2 whitespace-nowrap border border-transparent',
        'data-[orientation=horizontal]:justify-center data-[orientation=horizontal]:rounded-full data-[orientation=horizontal]:px-3 data-[orientation=horizontal]:py-1.5',
        'data-[orientation=vertical]:justify-start data-[orientation=vertical]:rounded-xl data-[orientation=vertical]:px-4 data-[orientation=vertical]:py-3.5',
        'text-placeholder text-base font-medium transition-all duration-200',
        'data-[state=active]:sidebar-active-gradient data-[state=active]:text-secondary-dark data-[state=active]:shadow-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-none focus-visible:ring-[3px]',
        'cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-5',
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn('flex-1 outline-none', className)} {...props} />;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
