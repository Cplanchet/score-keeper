import Button from "@/components/common/button";
import Checkbox from "@/components/common/checkbox";
import ConfirmModal from "@/components/common/confirm-modal";
import ExpandCollapse from "@/components/common/expand-collapse";
import InputBox from "@/components/common/input-box";
import Tab from "@/components/common/tab";
import ThemedSwitch from "@/components/common/themed-switch";
import { ThemedText } from "@/components/common/themed-text";
import { useTheme } from "@/hooks/use-theme";
import CanastaPageViewModel from "@/models/canasta-page-view-model";
import React, { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import ReanimatedSwipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 300 }],
    };
  });

  return (
    <Reanimated.View
      style={[
        styleAnimation,
        {
          width: "100%",
          padding: 16,
          backgroundColor: "red",
          justifyContent: "center",
          alignItems: "flex-start",
        },
      ]}
    >
      <Text style={styles.action}>Text</Text>
    </Reanimated.View>
  );
}

export default function TypographyPage() {
  const [getChecked, setChecked] = React.useState(false);
  const [tab, setTab] = React.useState("Typography");
  const [text, setText] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [viewModel, setViewModelState] = React.useState(
    new CanastaPageViewModel(),
  );

  const swipeableRef = useRef<SwipeableMethods>(null);
  const theme = useTheme();
  return (
    <View
      style={{
        alignItems: "flex-start",
        padding: 24,

        height: "auto",
      }}
    >
      <Tab
        active={tab}
        tabs={["Typography", "Misc", "Expand", "Test"]}
        onActiveChange={(tab: string) => {
          console.log(tab);
          setTab(tab);
        }}
      />
      {
        {
          Typography: (
            <>
              <ThemedText type="headline">Headline</ThemedText>
              <ThemedText type="title">Title</ThemedText>
              <ThemedText type="heading">Heading</ThemedText>
              <ThemedText type="label">Label</ThemedText>
              <ThemedText type="link">Link</ThemedText>
              <ThemedText type="normal">Normal</ThemedText>
              <ThemedText type="button">Button</ThemedText>
              <ThemedText type="subtext">Subtext</ThemedText>
            </>
          ),
          Misc: (
            <>
              <View style={{ width: 300 }}>
                <ReanimatedSwipeable
                  friction={2}
                  renderRightActions={RightAction}
                  containerStyle={[
                    styles.swipe,
                    { backgroundColor: theme.background },
                  ]}
                  ref={swipeableRef}
                  onSwipeableOpen={() => {
                    console.log("open");
                    swipeableRef.current?.close();
                  }}
                >
                  <Text style={{ color: "white" }}>Swipe</Text>
                </ReanimatedSwipeable>
              </View>
              <Checkbox
                checked={false}
                onChange={() => {}}
                disabled={true}
              ></Checkbox>
              <Button
                label="Primary"
                variant="primary"
                onPress={() => {
                  setModal(true);
                }}
                iconBefore="refresh"
                iconAfter="refresh"
              />
              <Button
                label="Secondary"
                variant="secondary"
                onPress={() => {}}
                iconBefore="refresh"
                iconAfter="refresh"
              />
              <Button
                label="Text"
                variant="text"
                onPress={() => {}}
                iconBefore="refresh"
                iconAfter="refresh"
              />
              <ConfirmModal
                title="Confirm Action"
                message="Are you sure you want to perform this action?"
                isVisible={modal}
                onConfirm={() => {
                  setModal(false);
                }}
                onCancel={() => {
                  setModal(false);
                }}
              />
              <InputBox label="text" value={text} onChange={setText} />
              <ThemedSwitch
                label="Switch"
                checked={getChecked}
                onCheckedChanged={setChecked}
              />
            </>
          ),
          Expand: (
            <ExpandCollapse
              title="Expand Collapse"
              expanded={expanded}
              onExpandChanged={setExpanded}
            >
              <ThemedText>Content for expandable section</ThemedText>
            </ExpandCollapse>
          ),
          Test: (
            <>
              <ThemedText>
                {viewModel.state.formState.us.mixedCanastas}
              </ThemedText>
              <Button
                onPress={() =>
                  setViewModelState(
                    viewModel.onMixedChange(
                      "us",
                      viewModel.state.formState.us.mixedCanastas + 1,
                    ),
                  )
                }
                label={"Test"}
              ></Button>
            </>
          ),
        }[tab]
      }
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    padding: 24,
  },
  swipe: {
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  action: {
    color: "white",
  },
});
