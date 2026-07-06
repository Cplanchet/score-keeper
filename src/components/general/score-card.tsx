import { GlobalColors } from "@/constants/theme";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../common/themed-text";
import ScoreButton from "./score-button";

export type ScoreCardProps = {
  playerName: string;
  score: number;
  onScoreChange?: (newScore: number) => void;
};

export default function ScoreCard({
  playerName,
  score,
  onScoreChange = () => {},
}: ScoreCardProps) {
  return (
    <View style={styles.container}>
      <ThemedText type="label" style={styles.text}>
        {playerName}
      </ThemedText>
      <View style={styles.scoreRow}>
        <ScoreButton label="-100" onPress={() => onScoreChange(score - 100)} />
        <ScoreButton label="-10" onPress={() => onScoreChange(score - 10)} />
        <ScoreButton label="-1" onPress={() => onScoreChange(score - 1)} />
        <ThemedText style={styles.text}>{score}</ThemedText>
        <ScoreButton label="+1" onPress={() => onScoreChange(score + 1)} />
        <ScoreButton label="+10" onPress={() => onScoreChange(score + 10)} />
        <ScoreButton label="+100" onPress={() => onScoreChange(score + 100)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: GlobalColors.primary,
    borderRadius: 10,
    padding: 16,
  },
  scoreRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 8,
    padding: 8,
  },
  text: {
    color: GlobalColors.onPrimary,
  },
});
