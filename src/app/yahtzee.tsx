import BonusYahtzeeRow from "@/components/bonus-yahtzee-row";
import BooleanYahtzeeRow from "@/components/boolean-yahtzee-row";
import InputYahtzeeRow from "@/components/input-yahtzee-row";
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
            label="Duece"
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
          <ThemedText type="label" align="center">
            Bottom
          </ThemedText>
          <InputYahtzeeRow
            label="3 of a Kind"
            value={getScoreCard.score.threeOfKind}
            onChange={(value) =>
              setScoreCard(getScoreCard.copy({ threeOfKind: value }))
            }
            onSwipe={() => setScoreCard(getScoreCard.copy({ threeOfKind: 0 }))}
            boxSize={boxSize}
            width={rowWidth}
          />
          <InputYahtzeeRow
            label="4 of a Kind"
            value={getScoreCard.score.fourOfKind}
            onChange={(value) =>
              setScoreCard(getScoreCard.copy({ fourOfKind: value }))
            }
            onSwipe={() => setScoreCard(getScoreCard.copy({ fourOfKind: 0 }))}
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
            onSwipe={() => setScoreCard(getScoreCard.copy({ yahtzee: false }))}
            boxSize={boxSize}
            width={rowWidth}
          />
          <BonusYahtzeeRow
            width={rowWidth}
            boxSize={boxSize}
            value={getScoreCard.score.bonus}
            onChange={(value: boolean) => {
              let currentValue = getScoreCard.score.bonus || 0;
              setScoreCard(
                getScoreCard.copy({ bonus: currentValue + (value ? 1 : -1) }),
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
});
