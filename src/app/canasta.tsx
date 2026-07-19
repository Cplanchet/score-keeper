import SideBySideView from "@/components/canasta/side-by-side-view";
import { ScrollView } from "react-native";

export default function Canasta() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, height: "100%" }}>
      <SideBySideView />
    </ScrollView>
  );
}
