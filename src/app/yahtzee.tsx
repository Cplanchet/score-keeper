import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet, View } from "react-native";

export default function Yahtzee() {
  return (
    <ThemedView style={styles.root}>
      <ThemedText type="heading" align="center">
        Top
      </ThemedText>
      <View style={styles.table}>
        <View style={styles.row}>
          <ThemedText>Ace</ThemedText>
          <ThemedText>100</ThemedText>
        </View>
        <View style={styles.row}>
          <ThemedText>Duece</ThemedText>
          <ThemedText>100</ThemedText>
        </View>
        <View style={styles.row}>
          <ThemedText>Three</ThemedText>
          <ThemedText>100</ThemedText>
        </View>
        <View style={styles.row}>
          <ThemedText>Four</ThemedText>
          <ThemedText>100</ThemedText>
        </View>
        <View style={styles.row}>
          <ThemedText>Five</ThemedText>
          <ThemedText>100</ThemedText>
        </View>
        <View style={styles.row}>
          <ThemedText>Six</ThemedText>
          <ThemedText>100</ThemedText>
        </View>
        <ThemedText type="heading" align="center">
          Bottom
        </ThemedText>
        <View style={styles.row}>
          <ThemedText>3 of a Kind</ThemedText>
          <ThemedText>100</ThemedText>
        </View>
        <View style={styles.row}>
          <ThemedText>4 of a Kind</ThemedText>
          <ThemedText>100</ThemedText>
        </View>
        <View style={styles.row}>
          <ThemedText>Full House</ThemedText>
          <ThemedText>100</ThemedText>
        </View>
        <View style={styles.row}>
          <ThemedText>Sm. Straight</ThemedText>
          <ThemedText>100</ThemedText>
        </View>
        <View style={styles.row}>
          <ThemedText>Yahtzee</ThemedText>
          <ThemedText>100</ThemedText>
        </View>
        <View style={styles.row}>
          <ThemedText>Bonus</ThemedText>
          <ThemedText>100</ThemedText>
        </View>
        <View style={styles.row}>
          <ThemedText>Chance</ThemedText>
          <ThemedText>100</ThemedText>
        </View>
        <ThemedText align="center">Total Score: --</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
    padding: 24,
    display: "flex",
    alignItems: "center",
  },
  table: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 24,
  },
});
