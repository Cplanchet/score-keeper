import {
  CanastaPageMode,
  CanastaPageState,
  CanastaTeam,
} from "@/models/canasta-page-view-model";
import { StyleSheet, View } from "react-native";
import Button from "../common/button";
import { ThemedText } from "../common/themed-text";
import { ThemedView } from "../common/themed-view";
import CanastaTeamSection from "./canasta-team-section";

export type SideBySideViewProps = {
  state: CanastaPageState;
  onMixedCanastaChange: (value: string, team: CanastaTeam) => void;
  onNaturalCanastaChange: (value: string, team: CanastaTeam) => void;
  onRedThreeChange: (value: string, team: CanastaTeam) => void;
  onMeldScoreChange: (value: string, team: CanastaTeam) => void;
  onPointsInHandChange: (value: string, team: CanastaTeam) => void;
  onWentOutChange: (value: boolean, team: CanastaTeam) => void;
  onNextHandPress: () => void;
  onSaveScore: () => void;
  onNewGame: () => void;
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
  onNewGame,
}: SideBySideViewProps) {
  const teams = ["us", "them"] as const;
  const teamNames: Record<(typeof teams)[number], string> = {
    us: "Us",
    them: "Them",
  };

  return (
    <ThemedView style={styles.root}>
      {state.pageMode === CanastaPageMode.WIN ? (
        <View style={{ flexGrow: 0 }}>
          <ThemedText type="headline">{`${state.winner === "us" ? "We" : "They"} Are the winners!`}</ThemedText>
        </View>
      ) : undefined}
      <View style={styles.container}>
        {teams.map((team) => (
          <CanastaTeamSection
            key={team}
            scoreState={state.scores[team]}
            formState={state.formState[team]}
            pageMode={state.pageMode}
            teamName={teamNames[team]}
            onMixedCanastaChange={(value: string) =>
              onMixedCanastaChange(value, team)
            }
            onNaturalCanastaChange={(value: string) =>
              onNaturalCanastaChange(value, team)
            }
            onRedThreeChange={(value: string) => onRedThreeChange(value, team)}
            onMeldScoreChange={(value: string) =>
              onMeldScoreChange(value, team)
            }
            onPointsInHandChange={(value: string) =>
              onPointsInHandChange(value, team)
            }
            onWentOutChange={(value: boolean) => onWentOutChange(value, team)}
          />
        ))}
      </View>
      {state.pageMode === CanastaPageMode.VIEW ? (
        <View style={{ flexGrow: 0 }}>
          <Button label="Next Hand" onPress={onNextHandPress} />
        </View>
      ) : state.pageMode === CanastaPageMode.SCORE &&
        state.formState.us.isValid &&
        state.formState.them.isValid ? (
        <>
          <Button label="Save Score" onPress={onSaveScore} />
        </>
      ) : undefined}
      {state.pageMode === CanastaPageMode.WIN ? (
        <View style={{ flexGrow: 0 }}>
          <Button label="New Game" onPress={onNewGame} />
        </View>
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
});
