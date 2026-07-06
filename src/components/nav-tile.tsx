import { GlobalColors } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

export type NavTileProps = {
  label: string;
  variant?: "primary" | "secondary";
  url: "/yahtzee" | "/typography" | "/general" | "/";
};

export function NavTile({ label, variant, url }: NavTileProps) {
  const theme = useTheme();
  const router = useRouter();
  return (
    <TouchableHighlight
      style={{ borderRadius: 10 }}
      onPress={() => {
        router.navigate(url);
      }}
    >
      <View style={styles.card}>
        <Text style={[{ color: theme.onPrimary }, styles.label]}>{label}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  card: {
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
    padding: 16,
    borderRadius: 10,
    backgroundColor: GlobalColors.primary,
  },
  label: {
    fontSize: 24,
  },
});
