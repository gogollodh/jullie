import DEFAULT_IMAGE_FALLBACK from '../assets/placeholders/plant-placeholder.svg';

export { DEFAULT_IMAGE_FALLBACK };

/**
 * Normalizes an image URL, returning the default static fallback if invalid.
 * @param {string} url - The image URL to sanitize.
 * @returns {string} Sanitized image URL or static fallback URL.
 */
export function sanitizeImageUrl(url) {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return DEFAULT_IMAGE_FALLBACK;
  }
  return url.trim();
}

/**
 * Handles image load errors by swapping the failed src attribute with
 * the default static fallback asset path. Prevents infinite loops using a custom flag.
 * @param {Event|HTMLImageElement} event - Synthetic DOM event or HTMLImageElement.
 */
export function handleImageError(event) {
  if (!event) return;
  const img = event.currentTarget || event.target || (event.tagName === 'IMG' ? event : null);
  if (!img) return;

  // Edge case protection: check custom flag to run only once and prevent infinite loops
  if (img.dataset?.fallbackAttempted === 'true' || img.getAttribute('data-fallback-attempted') === 'true') {
    return;
  }

  if (img.dataset) {
    img.dataset.fallbackAttempted = 'true';
  }
  img.setAttribute('data-fallback-attempted', 'true');

  img.src = DEFAULT_IMAGE_FALLBACK;
}

export default handleImageError;
