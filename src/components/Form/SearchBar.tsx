import { ChangeEvent } from 'react';
import { CiSearch } from 'react-icons/ci';
import { fixIcon } from '@/utils/FixIcons';
import { Input } from '@/components/ui/input';

const CiSearchIcon = fixIcon(CiSearch);

interface ISearchBar {
  placeholder: string;
  defaultValue?: string;
  inputClass?: string;
  containerClass?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({ defaultValue, containerClass, inputClass, placeholder, onChange }: ISearchBar) => {
  return (
    <div className={`relative ${containerClass}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
        <CiSearchIcon className='!text-placeholder w-5 h-5' />
      </div>
      <Input
        onChange={onChange}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`pl-10 pr-3 border-sidebar-border !text-sm placeholder:text-placeholder bg-background md:h-[50px] h-12 lg:w-[347px] sm:w-[300px] w-full ${inputClass}`}
      />
    </div>
  );
};
