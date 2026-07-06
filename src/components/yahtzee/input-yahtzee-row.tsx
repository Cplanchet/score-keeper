import { GlobalColors } from "@/constants/theme";
import { ValidationRule } from "@/models/validation-tules";
import React from "react";
import { StyleSheet, View } from "react-native";
import BoxInput from "../common/box-input";
import { ThemedText } from "../common/themed-text";
import YahtzeeRow, { YahtzeeRowProps } from "./yahtzee-row";

export interface InputYahtzeeRowProps extends YahtzeeRowProps {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  boxSize?: number;
  validationRules?: ValidationRule[];
}

export default function InputYahtzeeRow({
  label,
  value,
  width,
  onSwipe = () => {},
  onChange,
  onBlur = () => {},
  onFocus,
  boxSize,
  validationRules = [],
}: InputYahtzeeRowProps) {
  const [getErrorMessage, setErrorMessage] = React.useState<string | null>(
    null,
  );
  return (
    <View style={styles.container}>
      <YahtzeeRow
        width={width}
        onSwipe={() => {
          setErrorMessage(null);
          onSwipe();
        }}
      >
        <ThemedText
          style={[
            value === 0 ? styles.crossed : undefined,
            getErrorMessage ? styles.errorText : undefined,
          ]}
        >
          {label}
        </ThemedText>
        <BoxInput
          size={boxSize}
          value={value?.toString() || ""}
          onChange={(value: string | null) => {
            if (value === "0") {
              onChange(0);
              return;
            }
            onChange(value !== null ? parseInt(value) || null : null);
          }}
          onBlur={() => {
            setErrorMessage(null);
            for (let rule of validationRules) {
              if (!rule.validate(value)) {
                onChange(null);
                setErrorMessage(rule.message);
                break;
              }
            }
            onBlur();
          }}
          onFocus={onFocus}
          error={getErrorMessage !== null}
        />
      </YahtzeeRow>
      {getErrorMessage !== null ? (
        <ThemedText type="subtext" style={styles.errorText}>
          {getErrorMessage}
        </ThemedText>
      ) : undefined}
    </View>
  );
}

const styles = StyleSheet.create({
  crossed: {
    textDecorationLine: "line-through",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
  },
  errorText: {
    color: GlobalColors.error,
  },
});
