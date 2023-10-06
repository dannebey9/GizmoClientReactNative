import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { useStores } from "../../models"
import { useHeader } from "../../utils/useHeader"
import { colors, spacing } from "../../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ClubConnectionScreenProps extends AppStackScreenProps<"ClubConnection"> {}

export const ClubConnectionScreen: FC<ClubConnectionScreenProps> = observer(
  function ClubConnectionScreen({ navigation }) {
    const { connectionsStore, clubHostsStore } = useStores()
    useHeader({
      titleTx: "clubConnectionScreen.title",
    })

    useEffect(() => {
      clubHostsStore.fetchAll()
    }, [])
    useEffect(() => {
      if (clubHostsStore.status === "done") {
        navigation.replace("ClubHosts")
      }
    }, [clubHostsStore.status])
    return (
      <Screen
        safeAreaEdges={["top"]}
        style={$root}
        preset="fixed"
        contentContainerStyle={{
          flex: 1,
          // justifyContent: "space-between",
          alignItems: "center",
          gap: spacing.xs,
          paddingHorizontal: spacing.lg,
          marginBottom: spacing.lg,
        }}
      >
        <View style={{ flex: 1, justifyContent: "center", gap: spacing.xl, alignItems: "center" }}>
          {clubHostsStore.status === "pending" || clubHostsStore.status === "done" ? (
            <>
              <ActivityIndicator size="large" color={colors.palette.primary600} />
              <Text
                style={{ color: colors.palette.primary300 }}
                tx={"clubConnectionScreen.loadingText"}
              />
            </>
          ) : (
            <>
              <Text
                preset={"subheading"}
                style={{
                  color: colors.palette.angry300,
                }}
                tx={"clubConnectionScreen.errorText"}
              />
              <Text
                style={{
                  color: colors.palette.angry300,
                }}
                preset={"formLabel"}
                tx={"clubConnectionScreen.errorDescription"}
              />
            </>
          )}
        </View>
        <Button
          style={{ marginTop: spacing.xl, width: "100%" }}
          tx={"clubConnectionScreen.btnCancel"}
          preset={"primaryFilled"}
          onPress={connectionsStore.deselectConnection}
        />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
