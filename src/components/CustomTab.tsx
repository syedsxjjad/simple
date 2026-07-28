import React from 'react';
import { cn } from '@/utils/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface TabItem {
  value: string;
  label: string;
  disabled?: boolean;
  content: React.ReactNode;
}
interface CustomTabsProps {
  tabs: TabItem[];
  value?: string;
  disabled?: boolean;
  className?: string;
  defaultValue?: string;
  tabsListClassName?: string;
  tabsTriggerClassName?: string;
  tabsContentClassName?: string;
  onChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
}
const CustomTabs: React.FC<CustomTabsProps> = ({
  tabs,
  value,
  onChange,
  className,
  defaultValue,
  disabled = false,
  tabsListClassName,
  tabsTriggerClassName,
  tabsContentClassName,
  orientation = 'horizontal',
}) => {
  return (
    <Tabs
      value={value || defaultValue}
      onValueChange={value => {
        if (!disabled) {
          onChange?.(value);
        }
      }}
      orientation={orientation}
      className={className}
    >
      {/* <TabsList className="sm:w-fit w-full h-12 overflow-x-auto scrollbar-hide"></TabsList> */}
      <TabsList className={cn('w-fit h-12 overflow-x-auto scrollbar-hide', tabsListClassName)}>
        <div className="flex min-w-full gap-2">
          {tabs.map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              disabled={disabled || tab.disabled}
              className={cn('h-12 data-[state=active]:bg-primary data-[state=active]:text-white', tabsTriggerClassName)}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </div>
      </TabsList>
      {tabs.map(tab => (
        <TabsContent key={tab.value} value={tab.value} className={tabsContentClassName}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};
export default CustomTabs;
