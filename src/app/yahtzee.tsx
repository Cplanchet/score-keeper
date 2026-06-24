import BoxInput from "@/components/box-input";
import Checkbox from "@/components/checkbox";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import YahtzeeScoreCard from "@/models/yahtzee-score";

import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Yahtzee() {
  const [getScoreCard, setScoreCard] = useState<YahtzeeScoreCard>(
    YahtzeeScoreCard.empty(),
  );

  const boxSize = 30;

  return (
    <ScrollView>
      <ThemedView style={styles.root}>
        <ThemedText type="label" align="center">
          Top
        </ThemedText>
        <View style={styles.table}>
          <View style={styles.row}>
            <ThemedText>Ace</ThemedText>
            <BoxInput
              size={boxSize}
              value={getScoreCard.score.ace?.toString() || ""}
              onChange={(value) =>
                setScoreCard(
                  getScoreCard.copy({
                    ace: value ? parseInt(value) : null,
                  }),
                )
              }
            />
          </View>
          <View style={styles.row}>
            <ThemedText>Duece</ThemedText>
            <BoxInput
              size={boxSize}
              value={getScoreCard.score.two?.toString() || ""}
              onChange={(value) =>
                setScoreCard(
                  getScoreCard.copy({
                    two: value ? parseInt(value) : null,
                  }),
                )
              }
            />
          </View>
          <View style={styles.row}>
            <ThemedText>Three</ThemedText>
            <BoxInput
              size={boxSize}
              value={getScoreCard.score.three?.toString() || ""}
              onChange={(value) =>
                setScoreCard(
                  getScoreCard.copy({
                    three: value ? parseInt(value) : null,
                  }),
                )
              }
            />
          </View>
          <View style={styles.row}>
            <ThemedText>Four</ThemedText>
            <BoxInput
              size={boxSize}
              value={getScoreCard.score.four?.toString() || ""}
              onChange={(value) =>
                setScoreCard(
                  getScoreCard.copy({
                    four: value ? parseInt(value) : null,
                  }),
                )
              }
            />
          </View>
          <View style={styles.row}>
            <ThemedText>Five</ThemedText>
            <BoxInput
              size={boxSize}
              value={getScoreCard.score.five?.toString() || ""}
              onChange={(value) =>
                setScoreCard(
                  getScoreCard.copy({
                    five: value ? parseInt(value) : null,
                  }),
                )
              }
            />
          </View>
          <View style={styles.row}>
            <ThemedText>Six</ThemedText>
            <BoxInput
              size={boxSize}
              value={getScoreCard.score.six?.toString() || ""}
              onChange={(value) =>
                setScoreCard(
                  getScoreCard.copy({
                    six: value ? parseInt(value) : null,
                  }),
                )
              }
            />
          </View>
          <ThemedText type="label" align="center">
            Bottom
          </ThemedText>
          <View style={styles.row}>
            <ThemedText>3 of a Kind</ThemedText>
            <BoxInput
              size={boxSize}
              value={getScoreCard.score.threeOfKind?.toString() || ""}
              onChange={(value) =>
                setScoreCard(
                  getScoreCard.copy({
                    threeOfKind: value ? parseInt(value) : null,
                  }),
                )
              }
            />
          </View>
          <View style={styles.row}>
            <ThemedText>4 of a Kind</ThemedText>
            <BoxInput
              size={boxSize}
              value={getScoreCard.score.fourOfKind?.toString() || ""}
              onChange={(value) =>
                setScoreCard(
                  getScoreCard.copy({
                    fourOfKind: value ? parseInt(value) : null,
                  }),
                )
              }
            />
          </View>
          <View style={styles.row}>
            <ThemedText>Full House</ThemedText>
            <Checkbox
              size={boxSize}
              checked={getScoreCard.score.fullHouse || false}
              onChange={(checked) =>
                setScoreCard(getScoreCard.copy({ fullHouse: checked }))
              }
            />
          </View>
          <View style={styles.row}>
            <ThemedText>Sm. Straight</ThemedText>
            <Checkbox
              size={boxSize}
              checked={getScoreCard.score.smallStraight || false}
              onChange={(checked) =>
                setScoreCard(getScoreCard.copy({ smallStraight: checked }))
              }
            />
          </View>
          <View style={styles.row}>
            <ThemedText>Lg. Straight</ThemedText>
            <Checkbox
              size={boxSize}
              checked={getScoreCard.score.largeStraight || false}
              onChange={(checked) =>
                setScoreCard(getScoreCard.copy({ largeStraight: checked }))
              }
            />
          </View>
          <View style={styles.row}>
            <ThemedText>Yahtzee</ThemedText>
            <Checkbox
              size={boxSize}
              checked={getScoreCard.score.yahtzee || false}
              onChange={(checked) =>
                setScoreCard(getScoreCard.copy({ yahtzee: checked }))
              }
            />
          </View>
          <View style={styles.row}>
            <ThemedText>Bonus</ThemedText>
            <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
              <Checkbox
                size={boxSize}
                checked={
                  getScoreCard.score.bonus != null &&
                  getScoreCard.score.bonus > 0
                }
                onChange={(checked) =>
                  setScoreCard(
                    getScoreCard.copy({
                      bonus:
                        (getScoreCard.score.bonus || 0) + (checked ? 1 : -1),
                    }),
                  )
                }
              />
              <Checkbox
                size={boxSize}
                checked={
                  getScoreCard.score.bonus != null &&
                  getScoreCard.score.bonus > 1
                }
                onChange={(checked) =>
                  setScoreCard(
                    getScoreCard.copy({
                      bonus:
                        (getScoreCard.score.bonus || 0) + (checked ? 1 : -1),
                    }),
                  )
                }
              />
              <Checkbox
                size={boxSize}
                checked={
                  getScoreCard.score.bonus != null &&
                  getScoreCard.score.bonus > 2
                }
                onChange={(checked) =>
                  setScoreCard(
                    getScoreCard.copy({
                      bonus:
                        (getScoreCard.score.bonus || 0) + (checked ? 1 : -1),
                    }),
                  )
                }
              />
            </View>
          </View>
          <View style={styles.row}>
            <ThemedText>Chance</ThemedText>
            <BoxInput
              value={getScoreCard.score.chance?.toString() || ""}
              onChange={(value) =>
                setScoreCard(
                  getScoreCard.copy({
                    chance: value ? parseInt(value) : null,
                  }),
                )
              }
              size={boxSize}
            />
          </View>
          <ThemedText align="center">{`Total Score: ${getScoreCard.calculateTotalScore() > 0 ? getScoreCard.calculateTotalScore() : "--"}`}</ThemedText>
        </View>
      </ThemedView>
    </ScrollView>
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
