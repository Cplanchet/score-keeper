import SideBySideView from "@/components/canasta/side-by-side-view";
import CanastaPageViewModel from "@/models/canasta-page-view-model";
import React from "react";
import { ScrollView } from "react-native";

export default function Canasta() {
  const [viewModel, setViewModel] = React.useState(new CanastaPageViewModel());
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, height: "100%" }}>
      <SideBySideView
        state={viewModel.state}
        onMixedCanastaChange={(team, value) =>
          setViewModel(viewModel.onMixedChange(team, value))
        }
        onNaturalCanastaChange={(team, value) => {
          setViewModel(viewModel.onNaturalChange(team, value));
        }}
        onRedThreeChange={(team, value) => {
          setViewModel(viewModel.onRedThreesChange(team, value));
        }}
        onMeldScoreChange={(team, value) => {
          setViewModel(viewModel.onMeldChange(team, value));
        }}
        onPointsInHandChange={(team, value) => {
          setViewModel(viewModel.onPointsInHandChange(team, value));
        }}
        onWentOutChange={(team, value) => {
          setViewModel(viewModel.onWentOutChange(team, value));
        }}
        onNextHandPress={() => setViewModel(viewModel.onNextHand())}
        onSaveScore={() => setViewModel(viewModel.onSaveScore())}
        onNewGame={() => setViewModel(new CanastaPageViewModel())}
      />
    </ScrollView>
  );
}
