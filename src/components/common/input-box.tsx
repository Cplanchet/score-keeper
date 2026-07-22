import { GlobalColors, Typography } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { ThemedText } from "./themed-text";

export type TextInputParameters = {
  value: string | null;
  label: string;
  error?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
};
export default function InputBox({
  value,
  label,
  error,
  onChange = () => { },
  onBlur = () => { },
}: TextInputParameters) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ThemedText type="inputLabel" style={styles.label}>
        {label}
      </ThemedText>
      <TextInput
        style={[styles.textBox, error ? { borderColor: GlobalColors.error, color: GlobalColors.error } : { borderColor: theme.text, color: theme.text }]}
        value={value ?? ""}
        onChangeText={onChange}
      ></TextInput>
      {error ? (
        <>
          <ThemedText type="subtext" style={styles.error}>
            {error}
          </ThemedText>
        </>
      ) : undefined}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    gap: 4,
  },
  label: {},
  textBox: {
    borderWidth: 1,
    paddingStart: 8,
    paddingEnd: 4,
    paddingTop: 4,
    paddingBottom: 4,
    ...Typography.normal,
  },
  error: {
    color: GlobalColors.error
  }
});
