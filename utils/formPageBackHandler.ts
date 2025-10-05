import { router, usePathname } from "expo-router";
import { useEffect } from "react";
import { Alert, BackHandler } from "react-native";

export const useFormPageBackHook = (): void => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/medications/add") return;
    const backAction = () => {
      Alert.alert(
        "Go Back?",
        "Going back will reset all medication data filled on the form.",
        [
          {
            text: "Yes, Go Back",
            onPress: () => router.back(),
          },
          {
            text: "Cancel",
            onPress: () => {},
          },
        ]
      );
      return true;
    };

    const exitPage = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => exitPage.remove();
  }, []);
};

export const formPageBackAction = (pathname: string): void => {
  if (pathname === "/medications/add") {
    Alert.alert(
      "Go Back?",
      "Going back will reset all medication data filled on the form.",
      [
        {
          text: "Yes, Go Back",
          onPress: () => router.back(),
        },
        {
          text: "Cancel",
          onPress: () => {},
        },
      ]
    );
  } else {
    router.back();
  }
};
