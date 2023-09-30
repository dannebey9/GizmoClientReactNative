import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { useHeader } from "../utils/useHeader"
import { spacing } from "../theme"
import { $container } from "../theme/presetStyles"

interface ConnectionsScreenProps extends AppStackScreenProps<"Connections"> {}

export const ConnectionsScreen: FC<ConnectionsScreenProps> = observer(function ConnectionsScreen({
  navigation,
}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  useHeader({ titleTx: "connectionsScreen.title" })
  return (
    <Screen style={$root} preset="scroll" contentContainerStyle={$container}>
      <View style={$emptyListContainer}>
        <Text tx={"connectionsScreen.listEmptyText"} preset={"default"} size={"md"} />
        <Button
          tx={"connectionsScreen.btnAddConnection"}
          onPress={() => navigation.navigate("AddConnection")}
        />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $emptyListContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  gap: spacing.md,
}
