import ScoreCard from "@/components/general/score-card";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ThemedView } from "../../example/src/components/themed-view";

export default function General() {
  const [score, setScore] = React.useState(0);

  return (
    <ScrollView
      style={{ width: "100%", height: "100%" }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <ThemedView style={styles.container}>
        <ScoreCard
          playerName="Player 1"
          score={score}
          onScoreChange={setScore}
        />
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
