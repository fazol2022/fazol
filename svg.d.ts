declare module '*.svg' {
  import { FunctionComponent, SVGProps } from 'react';
  export const ReactComponent: FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string }
  >;
  const content: any;
  export default content;
}

declare module '*.svg?inline' {
  const content: any;
  export default content;
}
