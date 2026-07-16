import { GlobalColors } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";

export type TabParameters = {
  active: string,
  tabs: string[],
  onActiveChange?: (tab: string) => void
}

export default function Tab({ active, tabs, onActiveChange = () => { } }: TabParameters) {
  const theme = useTheme();

  const borderStyles = StyleSheet.create({
    tabBorder: {
      borderEndWidth: 1,
      borderStartWidth: 1,
      borderColor: theme.text
    },
    containerBorder: {
      borderEndWidth: 1,
      borderStartWidth: 1,
      borderTopWidth: 2,
      borderBottomWidth: 2,
      borderColor: theme.text
    }
  })
  return (
    <View style={[styles.container, borderStyles.containerBorder]}>
      {tabs.map((value: string) => (
        <Pressable style={active === value ? [styles.tab, styles.active, borderStyles.tabBorder] : [styles.tab, borderStyles.tabBorder]} onPress={() => value !== active ? onActiveChange(value) : null} key={value}>
          <ThemedText style={active === value ? styles.activeText : null} type="label"> {value}</ThemedText>
        </Pressable>
      )
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-evenly'
  },
  tab: {
    padding: 8,
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  active: {
    backgroundColor: GlobalColors.primary
  },
  activeText: {
    color: GlobalColors.onPrimary
  }
})
