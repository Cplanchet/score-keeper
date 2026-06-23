import BoxInput from "@/components/box-input";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Yahtzee() {
  const [getAceScore, setAceScore] = useState<number | null>(null);
  const [getTwoScore, setTwoScore] = useState<number | null>(null);
  const [getThreeScore, setThreeScore] = useState<number | null>(null);
  const [getFourScore, setFourScore] = useState<number | null>(null);
  const [getFiveScore, setFiveScore] = useState<number | null>(null);
  const [getSixScore, setSixScore] = useState<number | null>(null);

  const [getThreeOfKind, setThreeOfKind] = useState<number | null>(null);
  const [getFourOfKind, setFourOfKind] = useState<number | null>(null);
  const [getFullHouse, setFullHouse] = useState<number | null>(null);
  const [getSmallStraight, setSmallStraight] = useState<number | null>(null);
  const [getLargeStraight, setLargeStraight] = useState<number | null>(null);
  const [getYahtzee, setYahtzee] = useState<number | null>(null);
  const [getBonus, setBonus] = useState<number | null>(null);
  const [getChance, setChance] = useState<number | null>(null);
  return (
    <ThemedView style={styles.root}>
      <ThemedText type="heading" align="center">
        Top
      </ThemedText>
      <View style={styles.table}>
        <View style={styles.row}>
          <ThemedText>Ace</ThemedText>
          <BoxInput
            value={getAceScore?.toString() || ""}
            onChange={(value) => setAceScore(value ? parseInt(value) : null)}
          />
        </View>
        <View style={styles.row}>
          <ThemedText>Duece</ThemedText>
          <BoxInput
            value={getTwoScore?.toString() || ""}
            onChange={(value) => setTwoScore(value ? parseInt(value) : null)}
          />
        </View>
        <View style={styles.row}>
          <ThemedText>Three</ThemedText>
          <BoxInput
            value={getThreeScore?.toString() || ""}
            onChange={(value) => setThreeScore(value ? parseInt(value) : null)}
          />
        </View>
        <View style={styles.row}>
          <ThemedText>Four</ThemedText>
          <BoxInput
            value={getFourScore?.toString() || ""}
            onChange={(value) => setFourScore(value ? parseInt(value) : null)}
          />
        </View>
        <View style={styles.row}>
          <ThemedText>Five</ThemedText>
          <BoxInput
            value={getFiveScore?.toString() || ""}
            onChange={(value) => setFiveScore(value ? parseInt(value) : null)}
          />
        </View>
        <View style={styles.row}>
          <ThemedText>Six</ThemedText>
          <BoxInput
            value={getSixScore?.toString() || ""}
            onChange={(value) => setSixScore(value ? parseInt(value) : null)}
          />
        </View>
        <ThemedText type="heading" align="center">
          Bottom
        </ThemedText>
        <View style={styles.row}>
          <ThemedText>3 of a Kind</ThemedText>
          <BoxInput
            value={getThreeOfKind?.toString() || ""}
            onChange={(value) => setThreeOfKind(value ? parseInt(value) : null)}
          />
        </View>
        <View style={styles.row}>
          <ThemedText>4 of a Kind</ThemedText>
          <BoxInput
            value={getFourOfKind?.toString() || ""}
            onChange={(value) => setFourOfKind(value ? parseInt(value) : null)}
          />
        </View>
        <View style={styles.row}>
          <ThemedText>Full House</ThemedText>
          <BoxInput
            value={getFullHouse?.toString() || ""}
            onChange={(value) => setFullHouse(value ? parseInt(value) : null)}
          />
        </View>
        <View style={styles.row}>
          <ThemedText>Sm. Straight</ThemedText>
          <BoxInput
            value={getSmallStraight?.toString() || ""}
            onChange={(value) =>
              setSmallStraight(value ? parseInt(value) : null)
            }
          />
        </View>
        <View style={styles.row}>
          <ThemedText>Yahtzee</ThemedText>
          <BoxInput
            value={getYahtzee?.toString() || ""}
            onChange={(value) => setYahtzee(value ? parseInt(value) : null)}
          />
        </View>
        <View style={styles.row}>
          <ThemedText>Bonus</ThemedText>
          <BoxInput
            value={getBonus?.toString() || ""}
            onChange={(value) => setBonus(value ? parseInt(value) : null)}
          />
        </View>
        <View style={styles.row}>
          <ThemedText>Chance</ThemedText>
          <BoxInput
            value={getChance?.toString() || ""}
            onChange={(value) => setChance(value ? parseInt(value) : null)}
          />
        </View>
        <ThemedText align="center">Total Score: --</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
    padding: 24,
    display: "flex",
    alignItems: "center",
  },
  table: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 24,
  },
});
