import { FieldError } from 'react-hook-form';
import React from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface IRadio {
  options: string[];
  label: string;
  value: string;
  name: string;
  onChange: (...event: string[]) => void;
  error: FieldError | undefined;
  optional?: boolean;
}

const Radio: React.FC<IRadio> = ({ options, error, label, value, name, onChange, optional = false }) => {
  return (
    <>
      <fieldset>
        <div className="flex justify-between mb-2">
          <legend className="font-semibold leading-6 text-gray-900">{label}</legend>
          {optional ? <span className="text-xs text-gray-500">Optional</span> : null}
        </div>
        <div className="space-y-3">
          {options.map((option, i) => {
            const treatedOption = option.trim();
            return (
              <div key={treatedOption} className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    onChange={e => onChange(e.target.value)}
                    aria-describedby={`${treatedOption}-description`}
                    value={treatedOption}
                    id={`${name}-${treatedOption}-${i}`}
                    name={`${name}-${treatedOption}-${i}`}
                    type="radio"
                    checked={value === treatedOption}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor={`${name}-${treatedOption}-${i}`} className="font-medium text-gray-900">
                    {option.trim()}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </fieldset>
      {error?.message ? (
        <p className="mt-2 text-xs text-red-600" id="email-error">
          {error?.message}
        </p>
      ) : null}
    </>
  );
};

export default Radio;
