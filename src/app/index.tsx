import { NavTile } from "@/components/nav-tile";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <ThemedView style={styles.container}>
      <NavTile label="Yahtzee" url="/yahtzee"></NavTile>
      <NavTile label="General" url="/general"></NavTile>
      <NavTile label="Game 2" url="/typography"></NavTile>
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
    paddingTop: Spacing.five,
  },
});
