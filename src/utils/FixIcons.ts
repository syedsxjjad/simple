import { SVGProps } from 'react';

export function fixIcon<T>(icon: T) {
  // eslint-disable-next-line no-undef
  return icon as unknown as (props: SVGProps<SVGSVGElement>) => JSX.Element;
}
