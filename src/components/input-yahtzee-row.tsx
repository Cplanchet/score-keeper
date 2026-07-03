import { StyleSheet } from "react-native";
import BoxInput from "./box-input";
import { ThemedText } from "./themed-text";
import YahtzeeRow, { YahtzeeRowProps } from "./yahtzee-row";

export interface InputYahtzeeRowProps extends YahtzeeRowProps {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  boxSize?: number;
}

export default function InputYahtzeeRow({
  label,
  value,
  width,
  onSwipe,
  onChange,
  onBlur,
  onFocus,
  boxSize,
}: InputYahtzeeRowProps) {
  return (
    <YahtzeeRow width={width} onSwipe={onSwipe}>
      <ThemedText style={value === 0 ? styles.crossed : undefined}>
        {label}
      </ThemedText>
      <BoxInput
        size={boxSize}
        value={value?.toString() || ""}
        onChange={(value: string | null) =>
          onChange(value ? parseInt(value) || null : null)
        }
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </YahtzeeRow>
  );
}

const styles = StyleSheet.create({
  crossed: {
    textDecorationLine: "line-through",
  },
});
