import { Text, type TextProps } from "react-native";

import { Typography } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export type ThemedTextProps = TextProps & {
  type?: keyof typeof Typography
  align?: "left" | "center" | "right";
  color?: "text" | "primary" | "disabled";
};

export function ThemedText({
  style,
  align,
  type = "normal",
  color = "text",
  ...rest
}: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[color] },
        Typography[type],
        align && { textAlign: align },
        style,
      ]}
      {...rest}
    />
  );
}
