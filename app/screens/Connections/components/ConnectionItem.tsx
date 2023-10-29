import { observer } from "mobx-react-lite"
import { View, ViewStyle, Animated, TextStyle, TouchableOpacity } from "react-native"
import { colors } from "../../../theme"
import { Text } from "../../../components"
import { ConnectionType } from "../../../models"
import React, { FC } from "react"
import Swipeable from "react-native-gesture-handler/Swipeable"
import { Ionicons } from "@expo/vector-icons"
import { GestureHandlerRootView } from "react-native-gesture-handler"

const widthBtn = 75

interface ConnectionItemProps {
  connection: ConnectionType
  onDelete: () => void
  onEdit: () => void
  onOpen: () => void
}
export const ConnectionItem: FC<ConnectionItemProps> = observer(function ConnectionItem({
  connection,
  onDelete,
  onEdit,
  onOpen,
}) {
  const onPressDelete = () => {
    swipeableRef.current?.close()
    onDelete()
  }

  const onPressEdit = () => {
    swipeableRef.current?.close()
    onEdit()
  }

  const swipeableRef = React.useRef<Swipeable>(null)
  const renderLeftActions = (progress, dragX) => {
    const opacityDelete = dragX.interpolate({
      inputRange: [0, widthBtn],
      outputRange: [0, 1],
    })
    return (
      <>
        <TouchableOpacity onPress={onPressDelete}>
          <Animated.View
            style={[
              $leftAction,
              { opacity: opacityDelete, backgroundColor: colors.palette.angry100 },
            ]}
          >
            <Ionicons name="trash-outline" size={30} color={colors.palette.angry600} />
          </Animated.View>
        </TouchableOpacity>
      </>
    )
  }

  const renderRightActions = (progress, dragX) => {
    const opacityEdit = dragX.interpolate({
      inputRange: [-widthBtn, 0],
      outputRange: [1, 0],
    })
    return (
      <>
        <TouchableOpacity onPress={onPressEdit}>
          <Animated.View
            style={[
              $rightAction,
              { opacity: opacityEdit, backgroundColor: colors.palette.primary100 },
            ]}
          >
            <Ionicons name="cog-outline" size={30} color={colors.palette.primary600} />
          </Animated.View>
        </TouchableOpacity>
      </>
    )
  }
  return (
    <GestureHandlerRootView>
      <Swipeable
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
        friction={2}
        ref={swipeableRef}
        leftThreshold={2}
        useNativeAnimations
      >
        <TouchableOpacity onPress={onOpen}>
          <Animated.View style={$itemContainer}>
            <View style={$firstRowContainer}>
              <Text preset={"subheading"}>{connection.name}</Text>
              <Text preset={"formHelper"}>
                {connection.address}:{connection.port}
              </Text>
            </View>
            <Text preset={"formHelper"}>{connection.username}</Text>
          </Animated.View>
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  )
})

const $itemContainer: ViewStyle = {
  height: 100,
  marginHorizontal: 10,
  backgroundColor: colors.palette.neutral100,
  borderRadius: 10,
  padding: 10,
  marginVertical: 10,
  justifyContent: "space-between",
}

const $itemAction: ViewStyle = {
  width: 75,
  justifyContent: "center",
  borderRadius: 10,
  alignItems: "center",
  paddingHorizontal: 10,
  marginVertical: 10,
  flex: 1,
}

const $leftAction: ViewStyle = {
  ...$itemAction,
  marginLeft: 10,
}

const $rightAction: ViewStyle = {
  ...$itemAction,
  marginRight: 10,
}

const $firstRowContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
}
