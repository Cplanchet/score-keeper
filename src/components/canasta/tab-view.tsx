import {
  CanastaPageMode,
  CanastaPageState,
} from "@/models/canasta-page-view-model";
import { StyleSheet, View } from "react-native";
import Button from "../common/button";
import { ThemedText } from "../common/themed-text";
import { ThemedView } from "../common/themed-view";
import CanastaTeamSection from "./canasta-team-section";

export type TabViewProps = {
  activeTab: string;
  state: CanastaPageState;
  onMixedCanastaChange: (value: string) => void;
  onNaturalCanastaChange: (value: string) => void;
  onRedThreeChange: (value: string) => void;
  onMeldScoreChange: (value: string) => void;
  onPointsInHandChange: (value: string) => void;
  onWentOutChange: (value: boolean) => void;
  onNextHandPress: () => void;
  onSaveScore: () => void;
  onNewGamePress: () => void;
};

export default function TabView({
  activeTab,
  state,
  onMixedCanastaChange: onChangeMixedCanasta,
  onNaturalCanastaChange: onChangeNaturalCanasta,
  onRedThreeChange,
  onMeldScoreChange,
  onPointsInHandChange,
  onWentOutChange,
  onNextHandPress,
  onNewGamePress,
  onSaveScore,
}: TabViewProps) {
  const team = {
    Us: "us",
    Them: "them",
  };
  return (
    <ThemedView style={styles.root}>
      {state.pageMode === CanastaPageMode.WIN ? (
        <View style={{ flexGrow: 0, padding: 24 }}>
          <ThemedText type="headline">{`${state.winner === "us" ? "We" : "They"} Are the winners!`}</ThemedText>
        </View>
      ) : undefined}
      <View style={styles.container}>
        <CanastaTeamSection
          teamName={activeTab}
          pageMode={state.pageMode}
          formState={state.formState[getTeamFromActiveTab(activeTab)]}
          scoreState={state.scores[getTeamFromActiveTab(activeTab)]}
          onMixedCanastaChange={onChangeMixedCanasta}
          onNaturalCanastaChange={onChangeNaturalCanasta}
          onRedThreeChange={onRedThreeChange}
          onMeldScoreChange={onMeldScoreChange}
          onPointsInHandChange={onPointsInHandChange}
          onWentOutChange={onWentOutChange}
        />
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
        <View style={{ flexGrow: 0, padding: 24 }}>
          <Button label="New Game" onPress={onNewGamePress} />
        </View>
      ) : undefined}
    </ThemedView>
  );
}

function getTeamFromActiveTab(tab: string): "us" | "them" {
  return tab.toLowerCase() === "them" ? "them" : "us";
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
