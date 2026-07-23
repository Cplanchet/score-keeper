import { StyleSheet } from "react-native";
import { ThemedText } from "../common/themed-text";
import { ThemedView } from "../common/themed-view";

export type TabViewProps = {
  activeTab: string
}

export default function TabView({ activeTab }: TabViewProps) {
  return (
    <ThemedView style={styles.root}>
      <ThemedText>Test</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
