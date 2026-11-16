import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { handleImageError, sanitizeImageUrl, DEFAULT_IMAGE_FALLBACK } from '../src/utils/imageFallback';

describe('imageFallback utilities', () => {
  it('sanitizeImageUrl returns valid url or fallback when url is empty or invalid', () => {
    expect(sanitizeImageUrl('https://example.com/plant.jpg')).toBe('https://example.com/plant.jpg');
    expect(sanitizeImageUrl('')).toBe(DEFAULT_IMAGE_FALLBACK);
    expect(sanitizeImageUrl(null)).toBe(DEFAULT_IMAGE_FALLBACK);
    expect(sanitizeImageUrl(undefined)).toBe(DEFAULT_IMAGE_FALLBACK);
  });

  it('handleImageError swaps broken image src with static fallback asset path', () => {
    const img = document.createElement('img');
    img.src = 'https://broken-domain.com/invalid-image.jpg';

    const event = { target: img, currentTarget: img };
    handleImageError(event);

    expect(img.src).toContain(DEFAULT_IMAGE_FALLBACK);
    expect(img.getAttribute('data-fallback-attempted')).toBe('true');
  });

  it('handleImageError prevents infinite error loops on repeated error triggers', () => {
    const img = document.createElement('img');
    img.src = 'https://broken-domain.com/invalid-image.jpg';

    const event = { target: img, currentTarget: img };
    handleImageError(event);

    expect(img.getAttribute('data-fallback-attempted')).toBe('true');

    // Simulate secondary image error event on the fallback image
    img.src = 'http://failed-fallback.com/asset.png';
    handleImageError(event);

    // Because data-fallback-attempted is true, handleImageError should ignore subsequent calls
    expect(img.src).toBe('http://failed-fallback.com/asset.png');
  });

  it('onError handler works correctly when attached to React img element', () => {
    const { getByAltText } = render(
      React.createElement('img', {
        src: 'https://invalid-url.com/nonexistent.png',
        alt: 'Test Plant',
        onError: handleImageError
      })
    );

    const imageEl = getByAltText('Test Plant');
    fireEvent.error(imageEl);

    expect(imageEl.src).toContain(DEFAULT_IMAGE_FALLBACK);
    expect(imageEl.getAttribute('data-fallback-attempted')).toBe('true');
  });
});
