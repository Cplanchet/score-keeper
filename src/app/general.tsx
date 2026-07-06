import { ThemedText } from "@/components/themed-text";
import { ScrollView, StyleSheet } from "react-native";
import { ThemedView } from "../../example/src/components/themed-view";

export default function General() {
  return (
    <ScrollView
      style={{ width: "100%", height: "100%" }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <ThemedView style={styles.container}>
        <ThemedText type="headline">Hello World</ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: 24,
  },
});
