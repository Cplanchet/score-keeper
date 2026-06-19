import { useTheme } from "@/hooks/use-theme"
import { StyleSheet, Text, TouchableHighlight, View } from "react-native"

export type NavTileProps = {
  label: string,
  variant?: "primary" | "secondary"
  url: string
}



export function NavTile({ label, variant, url }: NavTileProps) {
  const theme = useTheme()
  return (
    <TouchableHighlight style={{ borderRadius: 10 }} onPress={() => { }}>
      <View style={[{ backgroundColor: theme.primary }, styles.card]}>
        <Text style={[{ color: theme.onPrimary }, styles.label]}>
          {label}
        </Text>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  card: {
    boxShadow: [{
      offsetX: 4,
      offsetY: 4,
      blurRadius: 4,
      spreadDistance: 0,
      color: '#00000033',
      inset: false,
    }],
    padding: 16,
    borderRadius: 10
  },
  label: {
    fontSize: 24
  }
})
