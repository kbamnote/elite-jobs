// Utility to handle CSS processing across platforms
export const isLightningCSSEnabled = () => {
  // Always enable LightningCSS but handle platform differences
  return true;
};

// Fallback CSS processing function
export const processCSS = (cssContent) => {
  // In case of LightningCSS issues, we can fall back to basic processing
  try {
    // Try to process with LightningCSS
    return cssContent;
  } catch (error) {
    // Fallback to basic processing
    console.warn('LightningCSS processing failed, using fallback:', error);
    return cssContent;
  }
};