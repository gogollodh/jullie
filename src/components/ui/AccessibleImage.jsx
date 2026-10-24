import React from 'react';

export const AccessibleImage = ({
  src,
  alt,
  isDecorative = false,
  fallbackAlt = 'Image description unavailable',
  className = '',
  ...props
}) => {
  const computedAlt = isDecorative ? '' : (alt || fallbackAlt);
  return <img src={src} alt={computedAlt} className={className} {...props} />;
};
