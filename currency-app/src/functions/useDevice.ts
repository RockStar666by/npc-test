export interface DeviceState {
  browser: string;
  isDesktop: boolean;
  desktopOS: DesktopOS | undefined;
  isWindowsDesktop: boolean;
  isLinuxOrUnixDesktop: boolean;

  isMobile: boolean;
  mobileOS: MobileOS | undefined;
  isAndroidDevice: boolean;
  isAppleDevice: boolean;
  isUnknownMobileDevice: boolean;

  isTablet: boolean;
  // isLandscapeOrientation: () => boolean;
  // isPortraitOrientation: () => boolean;
}

const userAgent: string =
  navigator.userAgent || navigator.vendor || (window as any).opera || undefined;

// Device typology

const isMobileDevice = (): boolean => {
  const regexs = [
    /(Android)(.+)(Mobile)/i,
    /BlackBerry/i,
    /iPhone|iPod/i,
    /Opera Mini/i,
    /IEMobile/i
  ];
  return regexs.some((b) => userAgent.match(b));
};

const isTabletDevice = (): boolean => {
  const regex =
    /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/;
  return regex.test(userAgent.toLowerCase());
};

const isDesktopDevice = (): boolean => !isMobileDevice() && !isTabletDevice();

const isDesktop = isDesktopDevice();
const isMobile = isMobileDevice();
const isTablet = isTabletDevice();

const getBrowserName = (userAgent: string) => {
  // The order matters here, and this may report false positives for unlisted browsers.
  if (userAgent.includes('Firefox')) {
    // "Mozilla/5.0 (X11; Linux i686; rv:104.0) Gecko/20100101 Firefox/104.0"
    return 'Mozilla Firefox';
  } else if (userAgent.includes('SamsungBrowser')) {
    // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36"
    return 'Samsung Internet';
  } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
    // "Mozilla/5.0 (Macintosh; Intel Mac OS X 12_5_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36 OPR/90.0.4480.54"
    return 'Opera';
  } else if (userAgent.includes('Trident')) {
    // "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729)"
    return 'Microsoft Internet Explorer';
  } else if (userAgent.includes('Edge')) {
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
    return 'Microsoft Edge (Legacy)';
  } else if (userAgent.includes('Edg')) {
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36 Edg/104.0.1293.70"
    return 'Microsoft Edge (Chromium)';
  } else if (userAgent.includes('Chrome')) {
    // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
    return 'Google Chrome or Chromium';
  } else if (userAgent.includes('Safari')) {
    // "Mozilla/5.0 (iPhone; CPU iPhone OS 15_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1"
    return 'Apple Safari';
  } else {
    return 'unknown';
  }
};

const browser = getBrowserName(navigator.userAgent);

// Device Operating System

enum MobileOS {
  Android = 'android',
  iOS = 'ios',
  Unknown = 'unknown',
  WindowsPhone = 'Windows Phone'
}

const getMobileOS = (): MobileOS | undefined => {
  if (isMobileDevice()) {
    if (/windows phone/i.test(userAgent)) return MobileOS.WindowsPhone;
    else if (/android/i.test(userAgent)) return MobileOS.Android;
    else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream)
      return MobileOS.iOS;

    return MobileOS.Unknown;
  } else return undefined;
};

enum DesktopOS {
  Linux = 'linux',
  MacOS = 'mac_os',
  Unix = 'unix',
  Unknown = 'unknown',
  Windows = 'windows'
}

const getDesktopOS = (): DesktopOS | undefined => {
  if (isDesktopDevice()) {
    if (userAgent.indexOf('Win') !== -1) return DesktopOS.Windows;
    else if (userAgent.indexOf('Mac') !== -1) return DesktopOS.MacOS;
    else if (userAgent.indexOf('X11') !== -1) return DesktopOS.Unix;
    else if (userAgent.indexOf('Linux') !== -1) return DesktopOS.Linux;

    return DesktopOS.Unknown;
  } else return undefined;
};

type DeviceOS = DesktopOS | MobileOS;

const getDeviceOS = (): DeviceOS | undefined => getMobileOS() ?? getDesktopOS();

const mobileOS: MobileOS | undefined = getMobileOS();
const isAndroidDevice = getDeviceOS() === MobileOS.Android;
const isAppleDevice =
  getDeviceOS() === MobileOS.iOS || getDeviceOS() === DesktopOS.MacOS;
const isUnknownMobileDevice = getDeviceOS() === MobileOS.Unknown;

const desktopOS: DesktopOS | undefined = getDesktopOS();
const isWindowsDesktop = getDeviceOS() === DesktopOS.Windows;
const isLinuxOrUnixDesktop =
  getDeviceOS() === DesktopOS.Linux || getDeviceOS() === DesktopOS.Unix;

// Device orientation

const supportedScreenOrientation =
  (window.screen?.orientation || {}).type ??
  (window.screen as any).mozOrientation ??
  (window.screen as any).msOrientation;

const safariScreenOrientation: OrientationType =
  !window.screen?.orientation && matchMedia('(orientation: portrait)').matches
    ? 'portrait-primary'
    : 'landscape-primary';

const initialScreenOrientation =
  supportedScreenOrientation ?? safariScreenOrientation ?? 'portrait-primary';
let screenOrientation: OrientationType = initialScreenOrientation;

if (window.screen.orientation) {
  window.screen.orientation.addEventListener(
    'change',
    (ev: Event) => (screenOrientation = (ev.target ?? ({} as any)).type)
  );
}

// const isLandscapeOrientation = () =>
//   ['landscape-primary', 'landscape-secondary'].includes(screenOrientation);
// const isPortraitOrientation = () =>
//   ['portrait-primary', 'portrait-secondary'].includes(screenOrientation);

export const getDeviceInfo = (): DeviceState => ({
  browser,
  isDesktop,
  desktopOS,
  isWindowsDesktop,
  isLinuxOrUnixDesktop,
  isMobile,
  mobileOS,
  isAndroidDevice,
  isAppleDevice,
  isUnknownMobileDevice,
  isTablet
  // isLandscapeOrientation,
  // isPortraitOrientation
});
