import type { ReactNode } from 'react';


interface StickyLayoutProps {
  title?: ReactNode;
  titleClassName?: string;
  sidebar: ReactNode;
  className?: string;
  children: ReactNode;
  sidebarActions?: ReactNode;
  headerActions?: ReactNode;
}

const StickyLayout = ({
  children,
  sidebar,
  title,
  className = '',
  titleClassName = '',
  sidebarActions,
}: StickyLayoutProps) => {
  return (
    <div className={`w-full flex flex-col relative lg:max-h-[calc(100vh-8rem)] ${className}`}>
      {title ? <div className={titleClassName}>{title}</div> : null}
      <div className="lg:flex-1 flex lg:flex-row flex-col-reverse gap-4 lg:overflow-hidden">
        <section className="lg:flex-1 rounded-xl overflow-y-auto min-h-0">{children}</section>
        <aside className="xl:w-[350px] rounded-xl p-4 bg-white lg:w-[280px] w-full lg:flex-shrink-0 lg:sticky lg:top-0 !h-fit">{sidebar}</aside>
        {sidebarActions ? <div className="absolute -top-20 right-0">{sidebarActions}</div> : null}
      </div>
    </div>
  );
};

export default StickyLayout;
