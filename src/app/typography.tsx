import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet } from "react-native";

export default function TypographyPage() {
  return (
    <ThemedView style={styles.background}>
      <ThemedText type="headline">Headline</ThemedText>
      <ThemedText type="title">Title</ThemedText>
      <ThemedText type="heading">Heading</ThemedText>
      <ThemedText type="label">Label</ThemedText>
      <ThemedText type="link">Link</ThemedText>
      <ThemedText type="normal">Normal</ThemedText>
      <ThemedText type="button">Button</ThemedText>
      <ThemedText type="subtext">Subtext</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    padding: 24,
  },
});
