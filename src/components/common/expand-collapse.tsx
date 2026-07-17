import { PropsWithChildren } from "react";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export type ExpandCollapseProps = {
  title: string,
  expanded: boolean,
  onExpandChanged?: (value: boolean) => void,
}
export default function ExpandCollapse({ title, expanded, onExpandChanged = () => { }, children }: PropsWithChildren<ExpandCollapseProps>) {
  return (
    <ThemedView>
      <ThemedText>{title}</ThemedText>
      {children}
    </ThemedView>
  )
}
