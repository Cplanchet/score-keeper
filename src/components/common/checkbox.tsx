import { useTheme } from "@/hooks/use-theme";
import { MaterialIcons } from "@react-native-vector-icons/material-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
export type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: number;
  disabled?: boolean;
};
export default function Checkbox({
  checked,
  onChange,
  size = 16,
  disabled = false,
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
    disabledChecked: {
      borderColor: theme.disabled,
      backgroundColor: theme.disabled,
      color: theme.onPrimary,
    },
    disabledUnchecked: {
      borderColor: theme.disabled,
      backgroundColor: theme.background,
      color: theme.disabled,
    },
    shared: {
      borderWidth: 1,
      width: size,
      height: size,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  if (disabled) {
    return (
      <View
        style={[
          checked ? styles.disabledChecked : styles.disabledUnchecked,
          styles.shared,
        ]}
      >
        {checked && (
          <MaterialIcons
            name="check"
            size={size * 0.9}
            color={theme.background}
          />
        )}
      </View>
    );
  }
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
