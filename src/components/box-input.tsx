import { useTheme } from "@/hooks/use-theme";
import { StyleSheet, TextInput } from "react-native";

export type BoxInputProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  size?: number;
};

export default function BoxInput({
  value,
  onChange,
  onBlur,
  onFocus,
  size = 30,
}: BoxInputProps) {
  const theme = useTheme();
  const styles = StyleSheet.create({
    box: {
      backgroundColor: theme.background,
      color: theme.text,
      borderColor: theme.text,
      borderWidth: 1,
      width: size,
      height: size,
      textAlign: "center",
      fontSize: 12,
      padding: 1,
    },
  });
  return (
    <TextInput
      style={styles.box}
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      keyboardType="numeric"
    />
  );
}
