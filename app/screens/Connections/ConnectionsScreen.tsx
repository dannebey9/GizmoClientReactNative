import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { useHeader } from "../../utils/useHeader"
import { spacing } from "../../theme"
import { $container } from "../../theme/presetStyles"
import { useStores } from "../../models"
import { ConnectionItem } from "./components/ConnectionItem"

interface ConnectionsScreenProps extends AppStackScreenProps<"Connections"> {}

export const ConnectionsScreen: FC<ConnectionsScreenProps> = observer(function ConnectionsScreen({
  navigation,
}) {
  const { connectionsStore } = useStores()

  useHeader({
    titleTx: "connectionsScreen.title",
    rightIcon: "plus",
    // leftText: connectionsStore.connections.length.toString(),
    onRightPress: () => navigation.navigate("AddConnection"),
  })
  return (
    <Screen style={$root} preset="fixed" contentContainerStyle={[$container, $connectionContainer]}>
      <FlatList
        data={connectionsStore.connections}
        extraData={JSON.stringify(connectionsStore.connections)}
        renderItem={({ item, index }) => (
          <ConnectionItem
            onDelete={() => connectionsStore.deleteConnection(item.id)}
            onEdit={() => navigation.navigate("AddConnection", { connectionId: item.id })}
            onOpen={() => connectionsStore.selectConnection(item.id)}
            key={index}
            connection={{
              id: item.id,
              name: item.name,
              address: item.address,
              port: item.port,
              username: item.username,
              password: item.password,
              protocol: item.protocol,
            }}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={$emptyListContainer}>
            <Text tx={"connectionsScreen.listEmptyText"} preset={"default"} size={"md"} />
            <Button
              tx={"connectionsScreen.btnAddConnection"}
              onPress={() => navigation.navigate("AddConnection")}
            />
          </View>
        )}
      />
    </Screen>
  )
})

const $connectionContainer: ViewStyle = {
  paddingHorizontal: 0,
}

const $root: ViewStyle = {
  flex: 1,
}

const $emptyListContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  gap: spacing.md,
}
