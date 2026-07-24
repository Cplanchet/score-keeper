import SideBySideView from "@/components/canasta/side-by-side-view";
import TabView from "@/components/canasta/tab-view";
import Tab from "@/components/common/tab";
import CanastaPageViewModel, {
  CanastaTeam,
} from "@/models/canasta-page-view-model";
import React from "react";
import { ScrollView, useWindowDimensions } from "react-native";

export default function Canasta() {
  const [viewModel, setViewModel] = React.useState(new CanastaPageViewModel());
  const [activeTab, setActiveTab] = React.useState<string>("Us");

  const getTeamFromActiveTab = (): CanastaTeam => {
    return activeTab === "Them" ? "them" : "us";
  };

  const updateMixedCanasta = (value: string, team?: CanastaTeam) => {
    setViewModel(
      viewModel.onMixedChange(team ?? getTeamFromActiveTab(), value),
    );
  };

  const updateNaturalCanasta = (value: string, team?: CanastaTeam) => {
    setViewModel(
      viewModel.onNaturalChange(team ?? getTeamFromActiveTab(), value),
    );
  };

  const updateRedThree = (value: string, team?: CanastaTeam) => {
    setViewModel(
      viewModel.onRedThreesChange(team ?? getTeamFromActiveTab(), value),
    );
  };

  const updateMeldScore = (value: string, team?: CanastaTeam) => {
    setViewModel(viewModel.onMeldChange(team ?? getTeamFromActiveTab(), value));
  };

  const updatePointsInHand = (value: string, team?: CanastaTeam) => {
    setViewModel(
      viewModel.onPointsInHandChange(team ?? getTeamFromActiveTab(), value),
    );
  };

  const updateWentOut = (value: boolean, team?: CanastaTeam) => {
    setViewModel(
      viewModel.onWentOutChange(team ?? getTeamFromActiveTab(), value),
    );
  };

  const newGame = () => {
    setViewModel(new CanastaPageViewModel());
  };

  const saveScore = () => {
    setViewModel(viewModel.onSaveScore());
  };

  const nextHand = () => {
    setViewModel(viewModel.onNextHand());
  };

  const { width } = useWindowDimensions();
  return width > 500 ? (
    <ScrollView contentContainerStyle={{ flexGrow: 1, height: "100%" }}>
      <SideBySideView
        state={viewModel.state}
        onMixedCanastaChange={updateMixedCanasta}
        onNaturalCanastaChange={updateNaturalCanasta}
        onRedThreeChange={updateRedThree}
        onMeldScoreChange={updateMeldScore}
        onPointsInHandChange={updatePointsInHand}
        onWentOutChange={updateWentOut}
        onNextHandPress={nextHand}
        onSaveScore={saveScore}
        onNewGame={newGame}
      />
    </ScrollView>
  ) : (
    <>
      <Tab
        active={activeTab}
        tabs={["Us", "Them"]}
        onActiveChange={setActiveTab}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1, height: "100%" }}>
        <TabView
          activeTab={activeTab}
          state={viewModel.state}
          onMixedCanastaChange={(value: string) =>
            setViewModel(viewModel.onMixedChange(getTeamFromActiveTab(), value))
          }
          onNaturalCanastaChange={updateNaturalCanasta}
          onRedThreeChange={updateRedThree}
          onMeldScoreChange={updateMeldScore}
          onPointsInHandChange={updatePointsInHand}
          onWentOutChange={updateWentOut}
          onNewGamePress={newGame}
          onNextHandPress={nextHand}
          onSaveScore={saveScore}
        />
      </ScrollView>
    </>
  );
}
