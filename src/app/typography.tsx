import Checkbox from "@/components/checkbox";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import React from "react";
import { StyleSheet } from "react-native";

export default function TypographyPage() {
  const [getChecked, setChecked] = React.useState(false);
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
      <Checkbox checked={getChecked} onChange={setChecked} size={36} />
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
