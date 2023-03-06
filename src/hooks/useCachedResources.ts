import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useEffect, useState } from "react";

import {
  PoppinsBold,
  PoppinsLight,
  PoppinsMedium,
  PoppinsRegular,
  PoppinsSemiBold,
} from "../../assets/fonts";

const useCachedResources = () => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  // change default to true only in dev
  const [isUserSignedIn, setUserSignedIn] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
      try {
        // Keep the splash screen visible while we fetch resources
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          "Poppins-Bold": PoppinsBold,
          Poppins: PoppinsRegular,
          "Poppins-Semi-Bold": PoppinsSemiBold,
          "Poppins-Medium": PoppinsMedium,
          "Poppins-Light": PoppinsLight,
        });

        // do any api call here
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    };

    loadResourcesAndDataAsync();
  }, []);

  return { isLoadingComplete };
};

export default useCachedResources;
