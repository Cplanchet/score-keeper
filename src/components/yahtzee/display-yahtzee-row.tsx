import { View } from "react-native";
import { ThemedText } from "../common/themed-text";
import { yahtzeeRowStyles } from "./yahtzee-row";

export interface DisplayYahtzeeRowProps {
  width?: number;
  label: string;
  value: number;
}

export default function DisplayYahtzeeRow({
  width = 250,
  label,
  value,
}: DisplayYahtzeeRowProps) {
  return (
    <View style={[yahtzeeRowStyles.row, { width: width }]}>
      <ThemedText>{label}</ThemedText>
      <ThemedText>{value}</ThemedText>
    </View>
  );
}
