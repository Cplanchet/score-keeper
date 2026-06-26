import Checkbox from "@/components/checkbox";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import YahtzeeRow from "@/components/yahtzee-row";
import YahtzeeScoreCard from "@/models/yahtzee-score";

import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Yahtzee() {
  const [getScoreCard, setScoreCard] = useState<YahtzeeScoreCard>(
    YahtzeeScoreCard.empty(),
  );

  const boxSize = 30;
  const rowWidth = 250;

  return (
    <ScrollView
      style={{ width: "100%", height: "100%" }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <ThemedView style={styles.root}>
        <ThemedText type="label" align="center">
          Top
        </ThemedText>
        <View style={styles.table}>
          <YahtzeeRow
            label="Ace"
            value={getScoreCard.score.ace}
            onChange={(value) =>
              setScoreCard(getScoreCard.copy({ ace: value }))
            }
            onSwipe={() => setScoreCard(getScoreCard.copy({ ace: 0 }))}
            boxSize={boxSize}
            width={rowWidth}
          />
          <YahtzeeRow
            label="Duece"
            value={getScoreCard.score.two}
            onChange={(value) =>
              setScoreCard(getScoreCard.copy({ two: value }))
            }
            onSwipe={() => setScoreCard(getScoreCard.copy({ two: 0 }))}
            boxSize={boxSize}
            width={rowWidth}
          />
          <YahtzeeRow
            label="Three"
            value={getScoreCard.score.three}
            onChange={(value) =>
              setScoreCard(getScoreCard.copy({ three: value }))
            }
            onSwipe={() => setScoreCard(getScoreCard.copy({ three: 0 }))}
            boxSize={boxSize}
            width={rowWidth}
          />
          <YahtzeeRow
            label="Four"
            value={getScoreCard.score.four}
            onChange={(value) =>
              setScoreCard(getScoreCard.copy({ four: value }))
            }
            onSwipe={() => setScoreCard(getScoreCard.copy({ four: 0 }))}
            boxSize={boxSize}
            width={rowWidth}
          />
          <YahtzeeRow
            label="Five"
            value={getScoreCard.score.five}
            onChange={(value) =>
              setScoreCard(getScoreCard.copy({ five: value }))
            }
            onSwipe={() => setScoreCard(getScoreCard.copy({ five: 0 }))}
            boxSize={boxSize}
            width={rowWidth}
          />
          <YahtzeeRow
            label="Six"
            value={getScoreCard.score.six}
            onChange={(value) =>
              setScoreCard(getScoreCard.copy({ six: value }))
            }
            onSwipe={() => setScoreCard(getScoreCard.copy({ six: 0 }))}
            boxSize={boxSize}
            width={rowWidth}
          />
          <ThemedText type="label" align="center">
            Bottom
          </ThemedText>
          <YahtzeeRow
            label="3 of a Kind"
            value={getScoreCard.score.threeOfKind}
            onChange={(value) =>
              setScoreCard(getScoreCard.copy({ threeOfKind: value }))
            }
            onSwipe={() => setScoreCard(getScoreCard.copy({ threeOfKind: 0 }))}
            boxSize={boxSize}
            width={rowWidth}
          />
          <YahtzeeRow
            label="4 of a Kind"
            value={getScoreCard.score.fourOfKind}
            onChange={(value) =>
              setScoreCard(getScoreCard.copy({ fourOfKind: value }))
            }
            onSwipe={() => setScoreCard(getScoreCard.copy({ fourOfKind: 0 }))}
            boxSize={boxSize}
            width={rowWidth}
          />
          <View style={styles.row}>
            <ThemedText
              style={
                getScoreCard.score.fullHouse === false
                  ? styles.crossed
                  : undefined
              }
            >
              Full House
            </ThemedText>
            <Checkbox
              size={boxSize}
              checked={getScoreCard.score.fullHouse || false}
              onChange={(checked) =>
                setScoreCard(getScoreCard.copy({ fullHouse: checked }))
              }
            />
          </View>
          <View style={styles.row}>
            <ThemedText
              style={
                getScoreCard.score.smallStraight === false
                  ? styles.crossed
                  : undefined
              }
            >
              Sm. Straight
            </ThemedText>
            <Checkbox
              size={boxSize}
              checked={getScoreCard.score.smallStraight || false}
              onChange={(checked) =>
                setScoreCard(getScoreCard.copy({ smallStraight: checked }))
              }
            />
          </View>
          <View style={styles.row}>
            <ThemedText
              style={
                getScoreCard.score.largeStraight === false
                  ? styles.crossed
                  : undefined
              }
            >
              Lg. Straight
            </ThemedText>
            <Checkbox
              size={boxSize}
              checked={getScoreCard.score.largeStraight || false}
              onChange={(checked) =>
                setScoreCard(getScoreCard.copy({ largeStraight: checked }))
              }
            />
          </View>
          <View style={styles.row}>
            <ThemedText
              style={
                getScoreCard.score.yahtzee === false
                  ? styles.crossed
                  : undefined
              }
            >
              Yahtzee
            </ThemedText>
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
            {/*TODO: implement logic to disable these when no yahtzee is scored*/}
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
          <YahtzeeRow
            label="Chance"
            value={getScoreCard.score.chance}
            onChange={(value) =>
              setScoreCard(getScoreCard.copy({ chance: value }))
            }
            onSwipe={() => setScoreCard(getScoreCard.copy({ chance: 0 }))}
            boxSize={boxSize}
            width={rowWidth}
          />
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
    paddingLeft: 8,
  },
  crossed: {
    textDecorationLine: "line-through",
  },
});
