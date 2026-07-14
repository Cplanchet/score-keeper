import { Typography } from "@/constants/theme"
import { useTheme } from "@/hooks/use-theme"
import { StyleSheet, View } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { ThemedText } from "./themed-text"

export type TextInputParameters = {
  value: string
  label: string,
  onChange?: (value: string) => void,
  onBlur?: () => void
}
export default function InputBox({ value, label, onChange = () => { }, onBlur = () => { } }: TextInputParameters) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ThemedText type="inputLabel" style={styles.label}>{label}</ThemedText>
      <TextInput style={[styles.textBox, { borderColor: theme.text, color: theme.text }]} value={value} onChangeText={onChange}></TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    gap: 4
  },
  label: {},
  textBox: {
    borderWidth: 1,
    paddingStart: 8,
    paddingEnd: 4,
    paddingTop: 4,
    paddingBottom: 4,
    ...Typography.normal
  }
});
