export function calcImageSize() {
  const windowWidth = window.innerWidth;
  let width, height;
  const size = {
    width: 0,
    height: 0,
  };
  switch (true) {
    case windowWidth < 768:
      width = 240;
      height = 360;
      break;
    case windowWidth >= 768 && windowWidth < 1279:
      width = 264;
      height = 396;
      break;
    case windowWidth > 1280:
      width = 375;
      height = 563;
      break;
    default:
      width = 240;
      height = 360;
  }
  size.width = width;
  size.height = height;
  return size;
}
