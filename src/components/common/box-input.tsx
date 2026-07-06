import { GlobalColors } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet, TextInput } from "react-native";

export type BoxInputProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  size?: number;
  error?: boolean
};

export default function BoxInput({
  value,
  onChange,
  onBlur,
  onFocus,
  size = 30,
  error = false
}: BoxInputProps) {
  const theme = useTheme();
  const styles = StyleSheet.create({
    box: {
      backgroundColor: theme.background,

      borderWidth: 1,
      width: size,
      height: size,
      textAlign: "center",
      fontSize: 12,
      padding: 1,
    },
    normal: {
      color: theme.text,
      borderColor: theme.text,
    },
    error: {
      color: GlobalColors.error,
      borderColor: GlobalColors.error,
    }
  });
  return (
    <TextInput
      style={[styles.box, error ? styles.error : styles.normal]}
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      keyboardType="numeric"
    />
  );
}
