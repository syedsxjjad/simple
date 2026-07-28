import type { ReactNode } from 'react';

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordian';
import { cn } from '@/utils/utils';
import { Typography } from './Form/Typography';

interface ReUsableAccordianProps {
  icon?: React.ReactElement;
  title?: string;
  subtitle?: string;
  value?: string;
  defaultOpen?: boolean;
  children?: ReactNode;
  className?: string;
  innerClassName?: string;
  iconClassName?: string;
  subtitleIcon?: React.ReactElement;
  subtitleIconClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

const ReUsableAccordian = ({
  icon ,
  title = "",
  subtitle = "",
  value = "accordion-item",
  defaultOpen = false,
  subtitleIcon,
  subtitleIconClassName,
  subtitleClassName,
  children,
  titleClassName,
}: ReUsableAccordianProps) => {
 

  return (
    <Accordion 
      type="single" 
      collapsible 
      defaultValue={defaultOpen ? value : undefined}
      className={cn("w-full")}
    >
      <AccordionItem value={value} className="">
        <AccordionTrigger className={cn(
          "p-5 border-none hover:no-underline cursor-pointer bg-primary-light",
          "rounded-lg data-[state=open]:rounded-t-lg data-[state=open]:rounded-b-none data-[state=open]:border-b-0",
          "data-[state=closed]:rounded-lg",
          "focus-visible:ring-2 focus-visible:ring-success-border-light focus-visible:ring-offset-2",
        )}>
          {title && (
            <div className="flex items-center gap-5">
              {icon}
              <div className="flex flex-col gap-1.5">
              <Typography variant="p" className={cn("!text-base !font-semibold !text-text-primary", titleClassName)}>
                {title}
              </Typography>
              <Typography variant="p" className={cn("!text-base flex items-center gap-2 !font-semibold !text-text-primary", subtitleClassName)}>
                <span className={cn("", subtitleIconClassName)}>{subtitleIcon}</span>
                {subtitle}
              </Typography>
              </div>
            </div>
          )}
        </AccordionTrigger>
        <AccordionContent className={cn(
          "p-3 bg-white border-none rounded-b-xl! border-t-0",
          "rounded-none rounded-b-none"
        )}>
          {children || (
            <div>
              <p>Content goes here</p>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default ReUsableAccordian
