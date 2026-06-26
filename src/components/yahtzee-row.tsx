import MaterialIcons from "@react-native-vector-icons/material-icons";
import { PropsWithChildren, useRef } from "react";
import { StyleSheet, View } from "react-native";
import ReanimatedSwipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

export interface YahtzeeRowProps {
  width?: number;
  onSwipe?: () => void;
}

function swipeAction(
  prog: SharedValue<number>,
  drag: SharedValue<number>,
  width: number,
) {
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
}

export default function YahtzeeRow({
  width = 250,
  onSwipe,
  children,
}: PropsWithChildren<YahtzeeRowProps>) {
  const swipeableRef = useRef<SwipeableMethods>(null);

  return (
    <ReanimatedSwipeable
      ref={swipeableRef}
      friction={2}
      leftThreshold={75}
      renderLeftActions={(prog, drag, _) => {
        return swipeAction(prog, drag, width);
      }}
      onSwipeableOpen={() => {
        onSwipe?.();
        swipeableRef.current?.close();
      }}
    >
      <View style={[yahtzeeRowStyles.row, { width: width }]}>{children}</View>
    </ReanimatedSwipeable>
  );
}

export const yahtzeeRowStyles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 24,
    paddingLeft: 8,
  },

  action: {
    color: "white",
  },
});
