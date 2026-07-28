import { useCallback, useMemo, useRef, useState } from 'react';
import Select, {
  components,
  type GroupBase,
  type MenuListProps,
  type MultiValueRemoveProps,
  type DropdownIndicatorProps,
  type NoticeProps,
} from 'react-select';
import makeAnimated from 'react-select/animated';
import { ChevronDownIcon, XIcon } from 'lucide-react';
import { cn } from '@/utils/utils';

const DROPDOWN_MAX_HEIGHT_PX = 240;
const VIEWPORT_EDGE_PADDING_PX = 8;

interface ReactSelectProps {
  options: { value: string; label: string }[];
  value?: any;
  onChange?: (val: any) => void;
  name?: string;
  placeholder?: string;
  error?: boolean;
  onMenuScrollToBottom?: () => void;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  /** First page fetch — shows "Loading..." in menu (like FormSelectScroll). */
  isLoading?: boolean;
  /** Infinite scroll — shows "Loading more..." at bottom of menu. */
  isLoadingMore?: boolean;
  loadingMessage?: string;
  loadingMoreMessage?: string;
}

/** Custom fields on react-select `selectProps` (avoid built-in `loadingMessage` name). */
type ReactSelectExtraProps = {
  isLoadingMore?: boolean;
  menuLoadingMessage?: string;
  menuLoadingMoreMessage?: string;
};

const getExtraSelectProps = (selectProps: unknown): ReactSelectExtraProps =>
  selectProps as ReactSelectExtraProps;

const DropdownIndicator = (props: DropdownIndicatorProps<any, true>) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDownIcon className="size-6 text-placeholder/50" />
    </components.DropdownIndicator>
  );
};

const MultiValueRemove = (props: MultiValueRemoveProps<any, true>) => {
  return (
    <components.MultiValueRemove {...props}>
      <XIcon className="size-[14px] !text-destructive" strokeWidth={2.5} />
    </components.MultiValueRemove>
  );
};

const ClearIndicator = (props: any) => {
  return (
    <components.ClearIndicator {...props}>
      <XIcon className="size-4 text-destructive hover:text-destructive/80 cursor-pointer" />
    </components.ClearIndicator>
  );
};

const LoadingMessage = (props: NoticeProps<any, true, GroupBase<any>>) => {
  const { menuLoadingMessage } = getExtraSelectProps(props.selectProps);
  return <div className="px-3 py-2 text-sm text-placeholder">{menuLoadingMessage ?? 'Loading...'}</div>;
};
LoadingMessage.displayName = 'LoadingMessage';

const MenuList = (props: MenuListProps<any, true, GroupBase<any>>) => {
  const { isLoadingMore, menuLoadingMoreMessage } = getExtraSelectProps(props.selectProps);

  return (
    <components.MenuList {...props}>
      {props.children}
      {isLoadingMore ? (
        <div
          role="status"
          aria-live="polite"
          className="sticky bottom-0 z-10 shrink-0 bg-background px-3 py-2 text-center text-xs text-placeholder"
        >
          {menuLoadingMoreMessage ?? 'Loading more...'}
        </div>
      ) : null}
    </components.MenuList>
  );
};
MenuList.displayName = 'MenuList';

const getScrollParent = (el: HTMLElement | null): HTMLElement | null => {
  if (!el) return null;
  let parent = el.parentElement;
  while (parent) {
    const { overflowY, overflow } = window.getComputedStyle(parent);
    if (/(auto|scroll|overlay)/.test(overflowY) || /(auto|scroll|overlay)/.test(overflow)) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return null;
};

/** Same flip logic as FormSelectScroll — viewport + nearest scroll container. */
const resolveMenuPlacement = (controlEl: HTMLElement | null): 'top' | 'bottom' => {
  if (!controlEl) return 'bottom';

  const rect = controlEl.getBoundingClientRect();
  let spaceBelow = window.innerHeight - rect.bottom - VIEWPORT_EDGE_PADDING_PX;
  let spaceAbove = rect.top - VIEWPORT_EDGE_PADDING_PX;

  const scrollParent = getScrollParent(controlEl);
  if (scrollParent) {
    const parentRect = scrollParent.getBoundingClientRect();
    spaceBelow = Math.min(spaceBelow, parentRect.bottom - rect.bottom - VIEWPORT_EDGE_PADDING_PX);
    spaceAbove = Math.min(spaceAbove, rect.top - parentRect.top - VIEWPORT_EDGE_PADDING_PX);
  }

  if (spaceBelow < DROPDOWN_MAX_HEIGHT_PX && spaceAbove > spaceBelow) {
    return 'top';
  }

  return 'bottom';
};

const ReactSelect = ({
  options,
  value,
  onChange,
  name,
  placeholder,
  error,
  onMenuScrollToBottom,
  onMenuOpen,
  onMenuClose,
  isLoading = false,
  isLoadingMore = false,
  loadingMessage = 'Loading...',
  loadingMoreMessage = 'Loading more...',
}: ReactSelectProps) => {
  const animatedComponents = useMemo(() => makeAnimated(), []);
  const controlRef = useRef<HTMLDivElement>(null);
  const [menuPlacement, setMenuPlacement] = useState<'top' | 'bottom'>('bottom');

  const selectComponents = useMemo(
    () => ({
      ...animatedComponents,
      DropdownIndicator,
      ClearIndicator,
      MultiValueRemove,
      IndicatorSeparator: () => null,
      LoadingMessage,
      MenuList,
    }),
    [animatedComponents],
  );

  const handleMenuOpen = useCallback(() => {
    setMenuPlacement(resolveMenuPlacement(controlRef.current));
    onMenuOpen?.();
  }, [onMenuOpen]);

  const handleMenuClose = useCallback(() => {
    onMenuClose?.();
  }, [onMenuClose]);

  const extraSelectProps: ReactSelectExtraProps = {
    isLoadingMore,
    menuLoadingMessage: loadingMessage,
    menuLoadingMoreMessage: loadingMoreMessage,
  };

  return (
    <div ref={controlRef} className="w-full">
      <Select
        unstyled
        name={name}
        value={value}
        onChange={onChange}
        closeMenuOnSelect={false}
        components={selectComponents}
        isMulti
        options={options}
        placeholder={placeholder}
        classNames={{
          container: () => 'cursor-pointer!',
          control: state =>
            cn(
              'w-full min-h-12! md:min-h-14! px-2 rounded-2xl bg-primary border text-base! cursor-pointer! transition-[color,box-shadow]',
              error
                ? 'border-destructive focus:border-destructive outline-none'
                : state.isFocused
                  ? 'border-border ring-[1px] ring-primary/50 outline-none'
                  : 'border-border'
            ),
          menuPortal: () => 'z-[200]',
          menu: () =>
            'my-1 rounded-xl border border-border! cursor-pointer! bg-background! text-placeholder! shadow-md overflow-hidden z-[200]',
          menuList: () => 'p-1 max-h-60 overflow-y-auto',
          option: state =>
            cn(
              'relative flex w-full cursor-pointer! select-none items-center rounded-xl py-2.5 px-2 text-sm! outline-none transition-colors',
              state.isFocused ? 'bg-primary text-foreground-white' : 'text-placeholder!',
              state.isSelected ? 'bg-primary text-foreground-white font-medium' : ''
            ),
          multiValue: () =>
            'flex items-center w-fit gap-x-1 rounded-full bg-secondary-light/9 border border-secondary-light/15 px-2 py-1 transition-all',
          multiValueLabel: () => 'text-secondary-light text-sm font-normal!',
          multiValueRemove: () =>
            'text-destructive hover:text-destructive/80 hover:bg-transparent cursor-pointer rounded-full transition-colors',
          placeholder: () => 'text-placeholder/30 text-base! mx-1',
          input: () => 'text-foreground-white text-sm! ml-1',
          valueContainer: () => 'flex flex-wrap gap-1 px-1 py-1.5',
          indicatorsContainer: () => 'px-2 flex items-center gap-1',
          clearIndicator: () => 'text-destructive hover:text-destructive/80 cursor-pointer',
          noOptionsMessage: () => 'px-3 py-2 text-sm text-placeholder',
        }}
        menuPlacement={menuPlacement}
        menuPosition="fixed"
        menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
        styles={{
          menuPortal: base => ({ ...base, zIndex: 200 }),
        }}
        menuShouldScrollIntoView={false}
        onMenuOpen={handleMenuOpen}
        onMenuClose={handleMenuClose}
        noOptionsMessage={() => 'No option available'}
        onMenuScrollToBottom={onMenuScrollToBottom}
        isLoading={isLoading}
        {...(extraSelectProps as Record<string, unknown>)}
      />
    </div>
  );
};

export default ReactSelect;
