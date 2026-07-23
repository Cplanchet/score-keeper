import { CanastaFormState, CanastaHandScore, CanastaPageMode, CanastaScore } from "@/models/canasta-page-view-model";
import React from "react";
import { StyleSheet, View } from "react-native";
import ExpandCollapse from "../common/expand-collapse";
import InputBox from "../common/input-box";
import ThemedSwitch from "../common/themed-switch";
import { ThemedText } from "../common/themed-text";

export type CanastaTeamSectionProps = {
  teamName: string
  scoreState: CanastaScore,
  formState: CanastaFormState,
  pageMode: CanastaPageMode,
  onMixedCanastaChange: (value: string) => void,
  onNaturalCanastaChange: (value: string) => void,
  onRedThreeChange: (value: string) => void,
  onMeldScoreChange: (value: string) => void,
  onPointsInHandChange: (value: string) => void,
  onWentOutChange: (value: boolean) => void,
}

export default function CanastaTeamSection({ teamName, scoreState, formState, pageMode, onMixedCanastaChange,
  onNaturalCanastaChange, onRedThreeChange, onMeldScoreChange, onPointsInHandChange, onWentOutChange }: CanastaTeamSectionProps) {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null)
  return (
    <View style={styles.teamContainer}>
      <View style={styles.nameSection}>
        <ThemedText type="title">{teamName}</ThemedText>
        <ThemedText type="label">{scoreState.score}</ThemedText>
        <ThemedText type="subtext">{`${scoreState.firstMeldMinimum} points needed for first meld`}</ThemedText>
      </View>
      {scoreState.hands.map(
        (hand: CanastaHandScore, index: number) => {
          return (
            <ExpandCollapse
              key={index}
              title={`Hand ${index + 1}`}
              expanded={expandedIndex === index}
              onExpandChanged={(value) =>
                value ? setExpandedIndex(index) : setExpandedIndex(null)
              }
            >
              <View style={styles.handTableContainer}>
                <View
                  style={[styles.handTableColumn, styles.labelColumn]}
                >
                  <ThemedText>Canasta Bonus:</ThemedText>
                  <ThemedText>Red Threes Score:</ThemedText>
                  <ThemedText>Meld Score:</ThemedText>
                  <ThemedText>Going Out Bonus:</ThemedText>
                  <ThemedText>Points In Hand:</ThemedText>
                  <ThemedText type="label">Total:</ThemedText>
                </View>
                <View style={styles.handTableColumn}>
                  <ThemedText>{hand.canastaBonus}</ThemedText>
                  <ThemedText>{hand.redThreeScore}</ThemedText>
                  <ThemedText>{hand.meldScore}</ThemedText>
                  <ThemedText>{hand.goingOutBonus}</ThemedText>
                  <ThemedText>{`-${hand.pointsInHand}`}</ThemedText>
                  <ThemedText type="label">{hand.totalScore}</ThemedText>
                </View>
              </View>
            </ExpandCollapse>
          );
        },
      )}
      {pageMode === CanastaPageMode.SCORE ? (
        <>
          <View style={styles.scoreSection}>
            <ThemedText type="label">Canasta Bonus</ThemedText>
            <ThemedText type="subtext">
              Enter the number of canastas scored
            </ThemedText>
            <View style={styles.inputRow}>
              <InputBox
                label="Mixed"
                value={
                  formState.mixedCanastas?.toString() ?? ""
                }
                onChange={(value: string) =>
                  onMixedCanastaChange(value)
                }
                error={formState.mixedCanastaError}
              />
              <InputBox
                label="Natural"
                value={
                  formState.naturalCanastas?.toString() ?? ""
                }
                onChange={(value: string) =>
                  onNaturalCanastaChange(value)
                }
                error={formState.naturalCanastaError}
              />
            </View>
          </View>
          <InputBox
            label="Red Threes"
            value={formState.redThrees?.toString() ?? ""}
            onChange={(value: string) => onRedThreeChange(value)}
            error={formState.redThreesError}
          />
          <InputBox
            label="Meld Score"
            value={formState.meld?.toString() ?? ""}
            onChange={(value: string) => onMeldScoreChange(value)}
            error={formState.meldError}
          />
          <InputBox
            label="Points In Hand"
            value={formState.pointsInHand?.toString() ?? ""}
            onChange={(value: string) =>
              onPointsInHandChange(value)
            }
            error={formState.pointsInHandError}
          />
          <ThemedSwitch
            checked={formState.wentOut}
            label="Went out?"
            onCheckedChanged={(value: boolean) => {
              onWentOutChange(value);
            }}
          />
        </>
      ) : undefined}
    </View>
  )
}
const styles = StyleSheet.create({
  teamContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
    gap: 32,
    flexGrow: 1,
    flexShrink: 1
  },
  nameSection: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  handTableContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  handTableColumn: {
    display: "flex",
    flexDirection: "column",
  },
  labelColumn: {
    alignItems: "flex-end",
  },
  scoreSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
  },
  inputRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    gap: 16,
    flexWrap: 'wrap'
  },
});
