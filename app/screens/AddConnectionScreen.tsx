import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, TextField } from "app/components"
import { useHeader } from "../utils/useHeader"
import { $container } from "../theme/presetStyles"
import { spacing } from "../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface AddConnectionScreenProps extends AppStackScreenProps<"AddConnection"> {}

export const AddConnectionScreen: FC<AddConnectionScreenProps> = observer(
  function AddConnectionScreen({ navigation }) {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    useHeader({
      titleTx: "addConnectionScreen.title",
      leftIcon: "back",
      onLeftPress: () => navigation.goBack(),
    })
    return (
      <Screen
        style={$root}
        preset="scroll"
        safeAreaEdges={["bottom"]}
        contentContainerStyle={[$container, $formContainer]}
        KeyboardAvoidingViewProps={{
          behavior: "padding",
          keyboardVerticalOffset: 110,
        }}
      >
        <View style={$fieldsContainer}>
          <TextField placeholderTx={"addConnectionScreen.namePlaceholder"} />
          <TextField placeholderTx={"addConnectionScreen.addressPlaceholder"} />
          <TextField placeholderTx={"addConnectionScreen.portPlaceholder"} />
          <TextField placeholderTx={"addConnectionScreen.usernamePlaceholder"} />
          <TextField placeholderTx={"addConnectionScreen.passwordPlaceholder"} />
        </View>
        <Button tx={"addConnectionScreen.btnSave"} onPress={() => navigation.goBack()} />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $fieldsContainer: ViewStyle = {
  gap: spacing.sm,
}

const $formContainer: ViewStyle = {
  flex: 1,
  justifyContent: "space-between",
  // alignItems: "center",
}
