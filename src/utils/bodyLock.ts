export const MOBILE_DEVICE_MAX_WIDTH = 1279;

export const lock = () => {
  document.body.style.overflow = 'hidden';

  if (window.innerWidth > MOBILE_DEVICE_MAX_WIDTH) {
    document.body.style.paddingRight = '15px';
  }
};

export const unlock = () => {
  document.body.style.overflow = 'auto';

  if (window.innerWidth > MOBILE_DEVICE_MAX_WIDTH) {
    document.body.style.paddingRight = '0';
  }
};
