import React from 'react';

interface Props {
  className?: string;
  src: string;
  altText: string;
}

const Image = ({ className, src, altText }: Props) => {
  return (
    <img
      className={`w-full object-cover ${className ?? ''}`}
      src={src}
      alt={altText}
    />
  );
};

export default Image;
