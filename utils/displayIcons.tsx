import { brandColors } from "@/constants/Colors";
import {
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

type MCIIcons = "liquid-spot" | "dots-horizontal";
type FontistoIcons = "injection-syringe";
type Ionicons = "medical";

export const displayIcons = (
  iconPackage?: string | undefined,
  icon?: string | undefined,
  icnSize?: number,
  icnColor?: string | undefined
) => {
  const iconSize = icnSize;
  const iconColor = icnColor;
  switch (iconPackage) {
    case "FontAwesome6":
      return <FontAwesome6 name={icon} size={iconSize} color={iconColor} />;
    case "MaterialCommunityIcons":
      return (
        <MaterialCommunityIcons
          name={icon as MCIIcons}
          size={iconSize}
          color={iconColor}
        />
      );
    case "Fontisto":
      return (
        <Fontisto
          name={icon as FontistoIcons}
          size={iconSize}
          color={iconColor}
        />
      );
    // return <Fontisto name={icon} size={iconSize} color={iconColor}/>;
    case "FontAwesome5":
      return <FontAwesome5 name={icon} size={iconSize} color={iconColor} />;
    case "Ionicons":
      return (
        <Ionicons name={icon as Ionicons} size={iconSize} color={iconColor} />
      );
    default:
      return <Ionicons name="medical" size={iconSize} color={iconColor} />;
  }
};
