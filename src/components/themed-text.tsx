import { Text, type TextProps } from "react-native";

import { useTheme } from "@/hooks/use-theme";

export type ThemedTextProps = TextProps & {
  type?: "default";
};

export function ThemedText({
  style,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const theme = useTheme();

  return <Text style={[{ color: theme["text"] }]} {...rest} />;
}
