import { CanastaHandScore, CanastaPageState } from "@/models/canasta-page-view-model";
import React from "react";
import { StyleSheet, View } from "react-native";
import ExpandCollapse from "../common/expand-collapse";
import InputBox from "../common/input-box";
import ThemedSwitch from "../common/themed-switch";
import { ThemedText } from "../common/themed-text";
import { ThemedView } from "../common/themed-view";

export type SideBySideViewProps = {
  state: CanastaPageState
}

export default function SideBySideView({ state }: SideBySideViewProps) {

  const teams = ["us", "them"] as const;
  const teamNames: Record<(typeof teams)[number], string> = {
    us: "Us",
    them: "Them",
  };
  const expanded = {
    us: React.useState<number | null>(null),
    them: React.useState<number | null>(null)
  } as const

  return (
    <ThemedView style={styles.container}>
      {teams.map((team) => (
        <View key={team} style={styles.teamContainer}>
          <View style={styles.nameSection}>
            <ThemedText type="title">{teamNames[team]}</ThemedText>
            <ThemedText type="label">{state.scores[team].score}</ThemedText>
            <ThemedText type="subtext">{`${state.scores[team].firstMeldMinimum} points needed for first meld`}</ThemedText>
          </View>
          {state.scores[team].hands.map((hand: CanastaHandScore, index: number) => {
            const [expandedIndex, setExpandedIndex] = expanded[team]
            return (
              <ExpandCollapse key={index} title={`Hand ${index + 1}`}
                expanded={expandedIndex === index}
                onExpandChanged={(value) => value ? setExpandedIndex(index) : setExpandedIndex(null)}>
                <View style={styles.handTableContainer}>
                  <View style={[styles.handTableColumn, styles.labelColumn]}>
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
            )
          })}
          <View style={styles.scoreSection}>
            <ThemedText type="label">Canasta Bonus</ThemedText>
            <ThemedText type="subtext">Enter the number of canastas scored</ThemedText>
            <View style={styles.inputRow}>
              <InputBox label="Mixed" value={state.formState[team].mixedCanastas.toString()} />
              <InputBox label="Natural" value={state.formState[team].naturalCanastas.toString()} />
            </View>
          </View>
          <InputBox label="Red Threes" value={state.formState[team].redThrees.toString()} />
          <InputBox label="Meld Score" value={state.formState[team].meld.toString()} />
          <InputBox label="Points In Hand" value={state.formState[team].meld.toString()} />
          <ThemedSwitch checked={state.formState[team].wentOut} label="Went out?" />
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
    gap: 32,
    flexGrow: 1,
  },
  nameSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  handTableContainer: {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12
  },
  handTableColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  labelColumn: {
    alignItems: 'flex-end'
  },
  scoreSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8
  },
  inputRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  }
});
