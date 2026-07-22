import {
  CanastaHandScore,
  CanastaPageMode,
  CanastaPageState,
  CanastaTeam,
} from "@/models/canasta-page-view-model";
import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "../common/button";
import ExpandCollapse from "../common/expand-collapse";
import InputBox from "../common/input-box";
import ThemedSwitch from "../common/themed-switch";
import { ThemedText } from "../common/themed-text";
import { ThemedView } from "../common/themed-view";

export type SideBySideViewProps = {
  state: CanastaPageState;
  onMixedCanastaChange: (team: CanastaTeam, value: string) => void;
  onNaturalCanastaChange: (team: CanastaTeam, value: string) => void;
  onRedThreeChange: (team: CanastaTeam, value: string) => void;
  onMeldScoreChange: (team: CanastaTeam, value: string) => void;
  onPointsInHandChange: (team: CanastaTeam, value: string) => void;
  onWentOutChange: (team: CanastaTeam, value: boolean) => void;
  onNextHandPress: () => void;
  onSaveScore: () => void;
};

export default function SideBySideView({
  state,
  onMixedCanastaChange,
  onNaturalCanastaChange,
  onRedThreeChange,
  onMeldScoreChange,
  onPointsInHandChange,
  onWentOutChange,
  onNextHandPress,
  onSaveScore,
}: SideBySideViewProps) {
  const teams = ["us", "them"] as const;
  const teamNames: Record<(typeof teams)[number], string> = {
    us: "Us",
    them: "Them",
  };
  const expanded = {
    us: React.useState<number | null>(null),
    them: React.useState<number | null>(null),
  } as const;

  return (
    <ThemedView style={styles.root}>
      <View style={styles.container}>
        {teams.map((team) => (
          <View key={team} style={styles.teamContainer}>
            <View style={styles.nameSection}>
              <ThemedText type="title">{teamNames[team]}</ThemedText>
              <ThemedText type="label">{state.scores[team].score}</ThemedText>
              <ThemedText type="subtext">{`${state.scores[team].firstMeldMinimum} points needed for first meld`}</ThemedText>
            </View>
            {state.scores[team].hands.map(
              (hand: CanastaHandScore, index: number) => {
                const [expandedIndex, setExpandedIndex] = expanded[team];
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
            {state.pageMode === CanastaPageMode.SCORE ? (
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
                        state.formState[team].mixedCanastas?.toString() ?? ""
                      }
                      onChange={(value: string) =>
                        onMixedCanastaChange(team, value)
                      }
                      error={state.formState[team].mixedCanastaError}
                    />
                    <InputBox
                      label="Natural"
                      value={
                        state.formState[team].naturalCanastas?.toString() ?? ""
                      }
                      onChange={(value: string) =>
                        onNaturalCanastaChange(team, value)
                      }
                      error={state.formState[team].naturalCanastaError}
                    />
                  </View>
                </View>
                <InputBox
                  label="Red Threes"
                  value={state.formState[team].redThrees?.toString() ?? ""}
                  onChange={(value: string) => onRedThreeChange(team, value)}
                  error={state.formState[team].redThreesError}

                />
                <InputBox
                  label="Meld Score"
                  value={state.formState[team].meld?.toString() ?? ""}
                  onChange={(value: string) => onMeldScoreChange(team, value)}
                  error={state.formState[team].meldError}
                />
                <InputBox
                  label="Points In Hand"
                  value={state.formState[team].pointsInHand?.toString() ?? ""}
                  onChange={(value: string) =>
                    onPointsInHandChange(team, value)
                  }
                  error={state.formState[team].pointsInHandError}
                />
                <ThemedSwitch
                  checked={state.formState[team].wentOut}
                  label="Went out?"
                  onCheckedChanged={(value: boolean) => {
                    onWentOutChange(team, value);
                  }}
                />
              </>
            ) : undefined}
          </View>
        ))}
      </View>
      {state.pageMode === CanastaPageMode.VIEW ? (
        <View style={{ flexGrow: 0 }}>
          <Button label="Next Hand" onPress={onNextHandPress} />
        </View>
      ) : state.formState.us.isValid && state.formState.them.isValid ? (
        <>
          <Button label="Save Score" onPress={onSaveScore} />
        </>
      ) : undefined}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  teamContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
    gap: 32,
    flexGrow: 1,
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
    alignItems: "flex-start",
    gap: 16,
  },
});
