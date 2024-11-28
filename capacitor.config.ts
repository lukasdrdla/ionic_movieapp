import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cinemio.app',
  appName: 'Cinemio',
  webDir: 'www',

  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#f44033",
      showSpinner: false,
      androidSpinnerStyle: "small",
      iosSpinnerStyle: "small",
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;
