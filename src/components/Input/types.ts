/** @format */

import { type InputHTMLAttributes, type HTMLProps } from 'react';

export type InputProps = HTMLProps<HTMLInputElement> & {
  value?: InputHTMLAttributes<HTMLInputElement>['value'];
  onChange?: (v: string) => void;
};
