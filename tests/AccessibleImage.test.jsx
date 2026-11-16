import { describe, it, expect, vi, afterEach } from 'vitest';
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { AccessibleImage } from '../src/components/ui/AccessibleImage';

describe('AccessibleImage component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders img with provided alt text', () => {
    const { getByRole } = render(
      <AccessibleImage src="plant.jpg" alt="A green fern in a clay pot" />
    );
    const img = getByRole('img');
    expect(img.getAttribute('alt')).toBe('A green fern in a clay pot');
    expect(img.getAttribute('src')).toBe('plant.jpg');
  });

  it('uses default fallbackAlt when alt is omitted and not decorative', () => {
    const { getByRole } = render(
      <AccessibleImage src="plant.jpg" />
    );
    const img = getByRole('img');
    expect(img.getAttribute('alt')).toBe('Image description unavailable');
  });

  it('uses default fallbackAlt when alt is empty string and not decorative', () => {
    const { getByRole } = render(
      <AccessibleImage src="plant.jpg" alt="" />
    );
    const img = getByRole('img');
    expect(img.getAttribute('alt')).toBe('Image description unavailable');
  });

  it('uses custom fallbackAlt when provided and alt is empty', () => {
    const { getByRole } = render(
      <AccessibleImage src="plant.jpg" alt="" fallbackAlt="Custom fallback" />
    );
    const img = getByRole('img');
    expect(img.getAttribute('alt')).toBe('Custom fallback');
  });

  it('renders empty alt="" when isDecorative is true', () => {
    const { container } = render(
      <AccessibleImage src="decorative.jpg" alt="Should be overridden" isDecorative={true} />
    );
    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img.getAttribute('alt')).toBe('');
  });

  it('forwards additional props and className to underlying img element', () => {
    const handleError = vi.fn();
    const { getByTestId } = render(
      <AccessibleImage
        src="plant.jpg"
        alt="Test Image"
        className="custom-class"
        data-testid="test-img"
        onError={handleError}
      />
    );
    const img = getByTestId('test-img');
    expect(img.classList.contains('custom-class')).toBe(true);
    expect(img.getAttribute('alt')).toBe('Test Image');
  });
});
