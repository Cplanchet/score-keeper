import { Modal, StyleSheet, View } from "react-native";
import Button from "./button";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
export type ConfirmModalProps = {
  title: string;
  message: string;
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  title,
  message,
  isVisible,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <View style={styles.background}>
        <ThemedView style={styles.container}>
          <ThemedView style={styles.header}>
            <ThemedText type="title">{title}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.body}>
            <ThemedText>{message}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.actions}>
            <Button variant="secondary" onPress={onCancel} label="Cancel" />
            <Button variant="primary" onPress={onConfirm} label="Confirm" />
          </ThemedView>
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    flexGrow: 0,
    padding: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 8,
    width: undefined,
    borderRadius: 8,
    boxShadow: [
      {
        offsetX: 8,
        offsetY: 8,
        blurRadius: 10,
        spreadDistance: 2,
        color: "#00000033",
        inset: false,
      },
    ],
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  body: {
    padding: 16,
  },
  actions: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
});
