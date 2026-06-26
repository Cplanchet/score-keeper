import MaterialIcons from "@react-native-vector-icons/material-icons";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import ReanimatedSwipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import BoxInput from "./box-input";
import { ThemedText } from "./themed-text";

export type YahtzeeRowProps = {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  boxSize?: number;
  width?: number;
  onSwipe?: () => void;
};

export default function YahtzeeRow({
  label,
  value,
  onChange,
  boxSize,
  width = 250,
  onSwipe,
}: YahtzeeRowProps) {
  const swipeAction = (
    prog: SharedValue<number>,
    drag: SharedValue<number>,
  ) => {
    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: drag.value - width }],
      };
    });
    return (
      <Reanimated.View
        style={[
          styleAnimation,
          {
            width: "100%",
            padding: 8,
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "flex-end",
          },
        ]}
      >
        <MaterialIcons name="delete" color="white" size={16} />
      </Reanimated.View>
    );
  };

  const swipeableRef = useRef<SwipeableMethods>(null);

  return (
    <ReanimatedSwipeable
      ref={swipeableRef}
      friction={2}
      leftThreshold={75}
      renderLeftActions={swipeAction}
      onSwipeableOpen={() => {
        onSwipe?.();
        swipeableRef.current?.close();
      }}
    >
      <View style={[styles.row, { width: width }]}>
        <ThemedText style={value === 0 ? styles.crossed : undefined}>
          {label}
        </ThemedText>
        <BoxInput
          size={boxSize}
          value={value?.toString() || ""}
          onChange={(value: string | null) =>
            onChange(value ? parseInt(value) || null : null)
          }
        />
      </View>
    </ReanimatedSwipeable>
  );
}

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 24,
    paddingLeft: 8,
  },
  crossed: {
    textDecorationLine: "line-through",
  },
  action: {
    color: "white",
  },
});
