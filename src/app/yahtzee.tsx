import BonusYahtzeeRow from "@/components/bonus-yahtzee-row";
import BooleanYahtzeeRow from "@/components/boolean-yahtzee-row";
import Button from "@/components/button";
import DisplayYahtzeeRow from "@/components/display-yahtzee-row";
import InputYahtzeeRow from "@/components/input-yahtzee-row";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import YahtzeeScoreCard from "@/models/yahtzee-score";

import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Yahtzee() {
  const [getScoreCard, setScoreCard] = useState<YahtzeeScoreCard>(
    YahtzeeScoreCard.empty(),
  );
  const [getEditMode, setEditMode] = useState(false);

  const theme = useTheme();
  const boxSize = 30;
  const rowWidth = 250;

  const resetPage = () => {
    setScoreCard(YahtzeeScoreCard.empty);
    setEditMode(false);
  };

  return (
    <ScrollView
      style={{ width: "100%", height: "100%" }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <ThemedView style={styles.root}>
        {getScoreCard.isFilled() && !getEditMode ? (
          <View style={styles.table}>
            <ThemedText type="label" align="center">
              Top
            </ThemedText>
            <DisplayYahtzeeRow label="Ace" value={getScoreCard.score.ace!} />
            <DisplayYahtzeeRow label="Deuce" value={getScoreCard.score.two!} />
            <DisplayYahtzeeRow
              label="Three"
              value={getScoreCard.score.three!}
            />
            <DisplayYahtzeeRow label="Four" value={getScoreCard.score.four!} />
            <DisplayYahtzeeRow label="Five" value={getScoreCard.score.five!} />
            <DisplayYahtzeeRow label="Six" value={getScoreCard.score.six!} />
            <DisplayYahtzeeRow
              label="Bonus"
              value={getScoreCard.calculateTopScore() >= 63 ? 35 : 0}
            />
            <ThemedText type="label" align="center">
              Bottom
            </ThemedText>
            <DisplayYahtzeeRow
              label="3 of a Kind"
              value={getScoreCard.score.threeOfKind!}
            />
            <DisplayYahtzeeRow
              label="4 of a Kind"
              value={getScoreCard.score.fourOfKind!}
            />
            <DisplayYahtzeeRow
              label="Full House"
              value={getScoreCard.score.fullHouse ? 25 : 0}
            />
            <DisplayYahtzeeRow
              label="Sm. Straight"
              value={getScoreCard.score.smallStraight ? 30 : 0!}
            />
            <DisplayYahtzeeRow
              label="Lg. Straight"
              value={getScoreCard.score.largeStraight ? 40 : 0!}
            />
            <DisplayYahtzeeRow
              label="Yahtzee"
              value={getScoreCard.score.yahtzee ? 50 : 0!}
            />
            <DisplayYahtzeeRow
              label="Bonus"
              value={
                getScoreCard.score.yahtzee && getScoreCard.score.bonus
                  ? getScoreCard.score.bonus * 100
                  : 0
              }
            />
            <DisplayYahtzeeRow
              label="Chance"
              value={getScoreCard.score.chance!}
            />
            <ThemedText align="center">{`Total Score: ${getScoreCard.calculateTotalScore() > 0 ? getScoreCard.calculateTotalScore() : "0"}`}</ThemedText>
            <View style={styles.buttonRow}>
              <Button
                label="New Game"
                variant="primary"
                onPress={() => resetPage()}
              />
              <Button
                label="Edit Score"
                variant="secondary"
                onPress={() => setEditMode(true)}
              />
            </View>
          </View>
        ) : (
          <>
            <View style={styles.table}>
              <ThemedText type="label" align="center">
                Top
              </ThemedText>
              <InputYahtzeeRow
                label="Ace"
                value={getScoreCard.score.ace}
                onChange={(value) =>
                  setScoreCard(getScoreCard.copy({ ace: value }))
                }
                onSwipe={() => setScoreCard(getScoreCard.copy({ ace: 0 }))}
                boxSize={boxSize}
                width={rowWidth}
              />
              <InputYahtzeeRow
                label="Deuce"
                value={getScoreCard.score.two}
                onChange={(value) =>
                  setScoreCard(getScoreCard.copy({ two: value }))
                }
                onSwipe={() => setScoreCard(getScoreCard.copy({ two: 0 }))}
                boxSize={boxSize}
                width={rowWidth}
              />
              <InputYahtzeeRow
                label="Three"
                value={getScoreCard.score.three}
                onChange={(value) =>
                  setScoreCard(getScoreCard.copy({ three: value }))
                }
                onSwipe={() => setScoreCard(getScoreCard.copy({ three: 0 }))}
                boxSize={boxSize}
                width={rowWidth}
              />
              <InputYahtzeeRow
                label="Four"
                value={getScoreCard.score.four}
                onChange={(value) =>
                  setScoreCard(getScoreCard.copy({ four: value }))
                }
                onSwipe={() => setScoreCard(getScoreCard.copy({ four: 0 }))}
                boxSize={boxSize}
                width={rowWidth}
              />
              <InputYahtzeeRow
                label="Five"
                value={getScoreCard.score.five}
                onChange={(value) =>
                  setScoreCard(getScoreCard.copy({ five: value }))
                }
                onSwipe={() => setScoreCard(getScoreCard.copy({ five: 0 }))}
                boxSize={boxSize}
                width={rowWidth}
              />
              <InputYahtzeeRow
                label="Six"
                value={getScoreCard.score.six}
                onChange={(value) =>
                  setScoreCard(getScoreCard.copy({ six: value }))
                }
                onSwipe={() => setScoreCard(getScoreCard.copy({ six: 0 }))}
                boxSize={boxSize}
                width={rowWidth}
              />
              <ThemedText align="center">
                {getScoreCard.isTopFilled()
                  ? getScoreCard.calculateTopScore() >= 63
                    ? "Bonus Scored!"
                    : "Bonus Missed!"
                  : getScoreCard.calculateTopScore() < 63
                    ? `Points Needed for Bonus: ${63 - getScoreCard.calculateTopScore()}`
                    : "Bonus Scored!"}
              </ThemedText>
              <ThemedText type="label" align="center">
                Bottom
              </ThemedText>
              <InputYahtzeeRow
                label="3 of a Kind"
                value={getScoreCard.score.threeOfKind}
                onChange={(value) =>
                  setScoreCard(getScoreCard.copy({ threeOfKind: value }))
                }
                onSwipe={() =>
                  setScoreCard(getScoreCard.copy({ threeOfKind: 0 }))
                }
                boxSize={boxSize}
                width={rowWidth}
              />
              <InputYahtzeeRow
                label="4 of a Kind"
                value={getScoreCard.score.fourOfKind}
                onChange={(value) =>
                  setScoreCard(getScoreCard.copy({ fourOfKind: value }))
                }
                onSwipe={() =>
                  setScoreCard(getScoreCard.copy({ fourOfKind: 0 }))
                }
                boxSize={boxSize}
                width={rowWidth}
              />
              <BooleanYahtzeeRow
                label="Full House"
                value={getScoreCard.score.fullHouse}
                onCheck={(value) =>
                  setScoreCard(getScoreCard.copy({ fullHouse: value }))
                }
                onSwipe={() =>
                  setScoreCard(getScoreCard.copy({ fullHouse: false }))
                }
                boxSize={boxSize}
                width={rowWidth}
              />
              <BooleanYahtzeeRow
                label="Sm. Straight"
                value={getScoreCard.score.smallStraight}
                onCheck={(value) =>
                  setScoreCard(getScoreCard.copy({ smallStraight: value }))
                }
                onSwipe={() =>
                  setScoreCard(getScoreCard.copy({ smallStraight: false }))
                }
                boxSize={boxSize}
                width={rowWidth}
              />
              <BooleanYahtzeeRow
                label="Lg. Straight"
                value={getScoreCard.score.largeStraight}
                onCheck={(value) =>
                  setScoreCard(getScoreCard.copy({ largeStraight: value }))
                }
                onSwipe={() =>
                  setScoreCard(getScoreCard.copy({ largeStraight: false }))
                }
                boxSize={boxSize}
                width={rowWidth}
              />
              <BooleanYahtzeeRow
                label="Yahtzee"
                value={getScoreCard.score.yahtzee}
                onCheck={(value) =>
                  setScoreCard(getScoreCard.copy({ yahtzee: value }))
                }
                onSwipe={() =>
                  setScoreCard(getScoreCard.copy({ yahtzee: false }))
                }
                boxSize={boxSize}
                width={rowWidth}
              />
              <BonusYahtzeeRow
                width={rowWidth}
                boxSize={boxSize}
                value={getScoreCard.score.bonus}
                disabled={getScoreCard.score.yahtzee !== true}
                onChange={(value: boolean) => {
                  let currentValue = getScoreCard.score.bonus || 0;
                  setScoreCard(
                    getScoreCard.copy({
                      bonus: currentValue + (value ? 1 : -1),
                    }),
                  );
                }}
              />
              <InputYahtzeeRow
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
            <View style={styles.buttonRow}>
              <Button
                label={getEditMode ? "New Game" : "Reset"}
                iconBefore={getEditMode ? undefined : "refresh"}
                variant={getEditMode ? "primary" : "secondary"}
                onPress={() => resetPage()}
              />
            </View>
          </>
        )}
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
  buttonRow: {
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
