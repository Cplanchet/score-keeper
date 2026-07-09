import { GlobalColors, Typography } from "@/constants/theme";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { ThemedText } from "../common/themed-text";

export type PlayerNameplateParams = {
  name: string;
  onNameChange?: (name: string) => void;
};

export default function PlayerNameplate({
  name,
  onNameChange = () => {},
}: PlayerNameplateParams) {
  const [isEdit, setIsEdit] = React.useState(false);
  const [tempName, setTempName] = React.useState(name);
  const inputRef = React.useRef<TextInput>(null);

  return (
    <Pressable
      onPress={() => {
        setTempName(name);
        setIsEdit(true);
        setTimeout(() => {
          inputRef?.current?.focus();
        }, 100);
      }}
      style={styles.container}
    >
      {isEdit ? (
        <TextInput
          style={[styles.input, Typography.label]}
          onBlur={() => {
            onNameChange(tempName);
            setIsEdit(false);
          }}
          onChangeText={(value) => setTempName(value)}
          value={tempName}
          ref={inputRef}
        />
      ) : (
        <ThemedText type="label" style={styles.text}>
          {name}
        </ThemedText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    color: GlobalColors.onPrimary,
    textAlign: "center",
  },
  input: {
    borderWidth: 0,
    backgroundColor: "none",
    color: GlobalColors.onPrimary,
    textAlign: "center",
  },
});
