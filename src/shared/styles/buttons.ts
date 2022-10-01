import { TextStyle, ViewStyle, PressableStateCallbackType } from "react-native"

import * as Colors from "./colors"
import * as Outlines from "./outlines"
import * as Sizing from "./sizing"
import * as Typography from "./typography"

type Bar = "primary" | "secondary"
export const bar: Record<Bar, ViewStyle> = {
  primary: {
    alignItems: "center",
    justifyContent: "center",
    padding: Sizing.layout.x30,
    borderRadius: Outlines.borderRadius.base,
    backgroundColor: Colors.primary.brand,
  },
  secondary: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: Sizing.layout.x10,
    borderRadius: Outlines.borderRadius.base,
  },
}

type BarText = "primary" | "secondary"
export const barText: Record<BarText, TextStyle> = {
  primary: {
    ...Typography.fontSize.x40,
    ...Typography.fontWeight.semibold,
    color: Colors.neutral.white,
  },
  secondary: {
    ...Typography.fontSize.x10,
    ...Typography.fontWeight.regular,
    color: Colors.neutral.s500,
  },
}

type Circular = "login" | "primary"
export const circular: Record<Circular, ViewStyle> = {
  login: {
    height: Sizing.layout.x70,
    width: Sizing.layout.x150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Outlines.borderRadius.base,
  },
  primary: {
  },
}

const opacity = (state: PressableStateCallbackType): ViewStyle => {
  const opacity = state.pressed ? 0.65 : 1
  return { opacity }
}

export const applyOpacity = (style: ViewStyle) => {
  return (state: PressableStateCallbackType): ViewStyle => {
    return {
      ...style,
      ...opacity(state),
    }
  }
}
