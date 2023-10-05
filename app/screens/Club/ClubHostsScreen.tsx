import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import { useStores } from "../../models"
import { colors, spacing } from "../../theme"
import { useHeader } from "../../utils/useHeader"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ClubHostsScreenProps extends AppStackScreenProps<"ClubHosts"> {}

export const ClubHostsScreen: FC<ClubHostsScreenProps> = observer(function ClubHostsScreen() {
  const { clubHostsStore, connectionsStore } = useStores()
  useHeader({
    titleTx: "clubHostsScreen.title",
    leftIcon: "back",
    onLeftPress: () => connectionsStore.deselectConnection(),
  })
  return (
    <Screen
      style={$root}
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={{
        paddingHorizontal: spacing.md,
        gap: spacing.lg,
      }}
    >
      {clubHostsStore.groupHostsFromSelectedConnection.map((group) => (
        <View
          key={group.id}
          style={{
            flex: 1,
            gap: spacing.xs,
            backgroundColor: colors.palette.neutral300,
            borderRadius: 8,
            padding: spacing.xxs,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: spacing.sm,
            }}
          >
            <Text text={group.name} />
            <Text>{group.hosts.length}</Text>
          </View>
          {group.hosts.map((host) => (
            <View
              key={host.id}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: colors.palette.neutral200,
                borderRadius: 8,
                padding: spacing.sm,
              }}
            >
              <Text key={host.id} text={host.name} />
            </View>
          ))}
        </View>
      ))}
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
