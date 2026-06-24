import { useTheme } from "@/hooks/use-theme";
import { MaterialIcons } from "@react-native-vector-icons/material-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
export type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: number;
};
export default function Checkbox({
  checked,
  onChange,
  size = 16,
}: CheckboxProps) {
  const theme = useTheme();
  const styles = StyleSheet.create({
    unchecked: {
      backgroundColor: theme.background,
      color: theme.text,
      borderColor: theme.text,
    },
    checked: {
      backgroundColor: theme.primary,
      color: theme.onPrimary,
      borderColor: theme.primary,
    },
    shared: {
      borderWidth: 1,
      width: size,
      height: size,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return (
    <TouchableOpacity
      style={[checked ? styles.checked : styles.unchecked, styles.shared]}
      onPress={() => onChange(!checked)}
    >
      {checked && (
        <MaterialIcons name="check" color={theme.onPrimary} size={size * 0.9} />
      )}
    </TouchableOpacity>
  );
}
