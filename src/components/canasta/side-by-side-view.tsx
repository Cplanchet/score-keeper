import { StyleSheet, View } from "react-native";
import { ThemedText } from "../common/themed-text";
import { ThemedView } from "../common/themed-view";

export default function SideBySideView() {
  const teams = ["us", "them"] as const;
  const teamNames: Record<(typeof teams)[number], string> = {
    us: "Us",
    them: "Them",
  };

  return (
    <ThemedView style={styles.container}>
      {teams.map((team) => (
        <View key={team} style={styles.teamContainer}>
          <ThemedText type="title">{teamNames[team]}</ThemedText>
        </View>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
  },
  teamContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
    gap: 16,
    flexGrow: 1,
  },
});
