import SideBySideView from "@/components/canasta/side-by-side-view";
import CanastaPageViewModel from "@/models/canasta-page-view-model";
import React from "react";
import { ScrollView } from "react-native";

export default function Canasta() {
  const [viewModel, setViewModel] = React.useState(new CanastaPageViewModel())
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, height: "100%" }}>
      <SideBySideView state={viewModel.state} />
    </ScrollView>
  );
}
