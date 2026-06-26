import { GlobalColors, Typography } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ViewStyle,
} from "react-native";

export type ButtonParameters = {
  variant?: "primary" | "secondary" | "text";
  label: string;
  style?: ViewStyle;
  iconBefore?: "refresh";
  iconAfter?: "refresh";
  onPress: () => void;
};

export default function Button({
  variant = "primary",
  style,
  label,
  iconBefore,
  iconAfter,
  onPress,
}: ButtonParameters) {
  const theme = useTheme();
  return (
    <TouchableHighlight
      style={{ borderRadius: 10, flexGrow: 0 }}
      onPress={onPress}
      underlayColor={"#00000070"}
    >
      <View
        style={[
          styles[variant],
          styles.container,
          style,
          variant === "secondary" && { backgroundColor: theme.background },
        ]}
      >
        {iconBefore && (
          <MaterialIcons
            name={iconBefore}
            color={
              variant === "primary"
                ? GlobalColors.onPrimary
                : GlobalColors.primary
            }
            size={16}
          />
        )}
        <Text
          style={[
            {
              color:
                variant === "primary"
                  ? GlobalColors.onPrimary
                  : GlobalColors.primary,
            },
            variant === "text" ? Typography.link : Typography.button,
          ]}
        >
          {label}
        </Text>
        {iconAfter && (
          <MaterialIcons
            name={iconAfter}
            color={
              variant === "primary"
                ? GlobalColors.onPrimary
                : GlobalColors.primary
            }
            size={16}
          />
        )}
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    gap: 8,
    borderRadius: 10,
  },
  primary: {
    backgroundColor: GlobalColors.primary,
    boxShadow: [
      {
        offsetX: 4,
        offsetY: 4,
        blurRadius: 4,
        spreadDistance: 0,
        color: "#00000033",
        inset: false,
      },
    ],
  },
  secondary: {
    borderColor: GlobalColors.primary,
    borderWidth: 1,
    boxShadow: [
      {
        offsetX: 4,
        offsetY: 4,
        blurRadius: 4,
        spreadDistance: 0,
        color: "#00000033",
        inset: false,
      },
    ],
  },
  text: {},
});
