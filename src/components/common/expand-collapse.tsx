import { useTheme } from "@/hooks/use-theme";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import React, { PropsWithChildren } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { ThemedText } from "./themed-text";

export type ExpandCollapseProps = {
  title: string;
  expanded: boolean;
  onExpandChanged?: (value: boolean) => void;
};
export default function ExpandCollapse({
  title,
  expanded,
  onExpandChanged = () => {},
  children,
}: PropsWithChildren<ExpandCollapseProps>) {
  const theme = useTheme();
  const containerRef = React.useRef<Animated.View>(null);
  return (
    <Animated.View
      ref={containerRef}
      style={[
        styles.container,
        { backgroundColor: theme.background },
        {
          transitionProperty: "maxHeight",
          transitionDuration: "500ms",
          maxHeight: expanded ? containerRef.current?.scrollHeight : 68,
        },
      ]}
    >
      <Pressable
        style={styles.header}
        onPress={() => onExpandChanged(!expanded)}
      >
        <MaterialIcons
          name={expanded ? "keyboard-arrow-down" : "keyboard-arrow-right"}
          color={theme.text}
          size={30}
        />
        <ThemedText style={styles.title} type="heading">
          {title}
        </ThemedText>
      </Pressable>
      <View style={styles.bodyContainer}>{children}</View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 16,
    width: "100%",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    gap: 8,
  },
  title: {},
  bodyContainer: {
    marginTop: 16,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
});
