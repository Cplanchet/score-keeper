import { ThemedText } from "@/components/common/themed-text";
import { ThemedView } from "@/components/common/themed-view";
import { ScrollView, StyleSheet } from "react-native";

export default function Canasta() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, height: "100%" }}>
      <ThemedView style={styles.container}>
        <ThemedText type="headline">Hello World</ThemedText>
      </ThemedView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%"
  }
})
