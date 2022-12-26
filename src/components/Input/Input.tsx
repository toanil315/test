/** @format */

import React, { type ChangeEvent, useCallback } from 'react';
import './Input.scss';
import { type InputProps } from './types';
function Input({ value, onChange, disabled, style }: InputProps) {
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  }, []);

  return (
    <input
      className='input'
      style={style}
      value={value}
      onChange={handleChange}
      disabled={disabled}
    />
  );
}

export default Input;
