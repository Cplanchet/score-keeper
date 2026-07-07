import { GlobalColors } from "@/constants/theme";
import { StyleSheet, TouchableHighlight } from "react-native";
import { ThemedText } from "../common/themed-text";

export type ScoreButtonProps = {
  onPress: () => void;
  label: string;
};

export default function ScoreButton({ onPress, label }: ScoreButtonProps) {
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={"#ffffff99"}
      style={styles.container}
    >
      <ThemedText type="button" style={styles.button}>
        {label}
      </ThemedText>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.onPrimary,
    borderRadius: 4,
    padding: 4,
    borderWidth: 1,
    borderColor: GlobalColors.primary,
    boxShadow: [
      {
        offsetX: 4,
        offsetY: 4,
        blurRadius: 4,
        spreadDistance: 0,
        color: "#00000033",
        inset: false,
      },
    ],
  },
  button: {
    color: GlobalColors.primary,
  },
});
