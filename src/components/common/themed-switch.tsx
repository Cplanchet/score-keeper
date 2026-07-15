import { GlobalColors } from "@/constants/theme"
import { useTheme } from "@/hooks/use-theme"
import { StyleSheet, Switch, View } from "react-native"
import { ThemedText } from "./themed-text"

export type ThemedSwitchParameters = {
  label: string,
  checked: boolean,
  onCheckedChanged?: (value: boolean) => void
}

export default function ThemedSwitch({ label, checked, onCheckedChanged = () => { } }: ThemedSwitchParameters) {
  const theme = useTheme();
  const globalColors = GlobalColors;

  return (
    <View style={styles.container}>
      <ThemedText type="inputLabel">{label}</ThemedText>
      <Switch value={checked} onValueChange={onCheckedChanged} trackColor={{ true: theme.primary, false: globalColors.neutral }} thumbColor="#ffffff" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  }
})
