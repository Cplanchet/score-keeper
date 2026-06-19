import { NavTile } from "@/components/nav-tile";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { StyleSheet } from "react-native";

export default function Index() {
  return (
    <ThemedView style={styles.container}>
      <NavTile label="Game 1" url="test"></NavTile>
      <NavTile label="Game 2" url="test"></NavTile>
      <NavTile label="Game 3" url="test"></NavTile>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.four,
    flexWrap: "wrap",
    paddingTop: Spacing.five
  },
});
