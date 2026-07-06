import { StyleSheet } from "react-native";
import Checkbox from "../common/checkbox";
import { ThemedText } from "../common/themed-text";
import YahtzeeRow, { YahtzeeRowProps } from "./yahtzee-row";

export interface BooleanYahtzeeRowProps extends YahtzeeRowProps {
  label: string;
  value: boolean | null;
  onCheck: (value: boolean) => void;
  boxSize?: number;
}

export default function BooleanYahtzeeRow({
  label,
  value,
  width,
  onSwipe,
  onCheck,
  boxSize,
}: BooleanYahtzeeRowProps) {
  return (
    <YahtzeeRow width={width} onSwipe={onSwipe}>
      <ThemedText style={value === false ? styles.crossed : undefined}>
        {label}
      </ThemedText>
      <Checkbox size={boxSize} checked={value || false} onChange={onCheck} />
    </YahtzeeRow>
  );
}

const styles = StyleSheet.create({
  crossed: {
    textDecorationLine: "line-through",
  },
});
