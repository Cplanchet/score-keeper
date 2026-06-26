import { View } from "react-native";
import Checkbox from "./checkbox";
import { ThemedText } from "./themed-text";
import { yahtzeeRowStyles } from "./yahtzee-row";

export type BonusYahtzeeRowProps = {
  width?: number;
  boxSize: number;
  value: number | null;
  onChange: (checked: boolean) => void;
};

export default function BonusYahtzeeRow({
  width,
  boxSize,
  value,
  onChange,
}: BonusYahtzeeRowProps) {
  return (
    <View style={[yahtzeeRowStyles.row, { width }]}>
      <ThemedText>Bonus</ThemedText>
      {/*TODO: implement logic to disable these when no yahtzee is scored*/}
      <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
        <Checkbox
          size={boxSize}
          checked={value != null && value > 0}
          onChange={onChange}
        />
        <Checkbox
          size={boxSize}
          checked={value != null && value > 1}
          onChange={onChange}
        />
        <Checkbox
          size={boxSize}
          checked={value != null && value > 2}
          onChange={onChange}
        />
      </View>
    </View>
  );
}
