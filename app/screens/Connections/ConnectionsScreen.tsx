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
    onRightPress: () => navigation.navigate("AddConnection"),
  })
  return (
    <Screen style={$root} preset="fixed" contentContainerStyle={[$container, $connectionContainer]}>
      {/* <Text>{connectionsStore.connections.length}</Text> */}
      <FlatList
        data={connectionsStore.connections}
        // keyExtractor={(item) => item.address}
        extraData={connectionsStore.connections.length}
        renderItem={({ item, index }) => (
          <ConnectionItem
            onDelete={() => connectionsStore.deleteConnection(item.name)}
            onEdit={() => console.log("edit")}
            key={index}
            connection={{
              id: item.id,
              name: item.name,
              address: item.address,
              port: item.port,
              username: item.username,
              password: item.password,
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
