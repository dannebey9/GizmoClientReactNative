import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, TextField } from "app/components"
import { useHeader } from "../../utils/useHeader"
import { $container } from "../../theme/presetStyles"
import { colors, spacing } from "../../theme"
import { ConnectionType, useStores } from "../../models"
import { useForm, Controller, Control } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AddConnectionValidationSchema } from "./AddConnectionValidationSchema"
import { TxKeyPath } from "../../i18n"

interface AddConnectionScreenProps extends AppStackScreenProps<"AddConnection"> {}

interface ControlledTextFieldProps {
  control: Control<any>
  name: string
  placeholderTx: TxKeyPath
  handleOnChangeText: (value: string, onChange: (...event: string[]) => void) => void
}

const ControlledTextField: FC<ControlledTextFieldProps> = ({
  control,
  name,
  placeholderTx,
  handleOnChangeText,
}) => {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <TextField
          placeholderTx={placeholderTx}
          onBlur={onBlur}
          onChangeText={(text) => handleOnChangeText(text, onChange)}
          value={value}
          helper={error?.message}
          HelperTextProps={{ style: { color: colors.error } }}
        />
      )}
      name={name}
    />
  )
}

export const AddConnectionScreen: FC<AddConnectionScreenProps> = observer(
  function AddConnectionScreen({ navigation }) {
    const { connectionsStore } = useStores()
    const {
      formState: { errors, isValid },
      handleSubmit,
      control,
      trigger,
    } = useForm<Omit<ConnectionType, "$nonEmptyObject">>({
      resolver: zodResolver(AddConnectionValidationSchema),
    })

    useHeader({
      titleTx: "addConnectionScreen.title",
      leftIcon: "back",
      onLeftPress: () => navigation.goBack(),
    })

    const onSubmit = (data: ConnectionType) => {
      connectionsStore.addConnection(data)
      navigation.goBack()
    }

    const handleOnChangeText = (value: string, onChange: (...event: string[]) => void) => {
      onChange(value)
      trigger()
    }

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
          <ControlledTextField
            control={control}
            name="name"
            placeholderTx="addConnectionScreen.namePlaceholder"
            handleOnChangeText={handleOnChangeText}
          />
          <ControlledTextField
            control={control}
            name="address"
            placeholderTx="addConnectionScreen.addressPlaceholder"
            handleOnChangeText={handleOnChangeText}
          />
          <ControlledTextField
            control={control}
            name="port"
            placeholderTx="addConnectionScreen.portPlaceholder"
            handleOnChangeText={handleOnChangeText}
          />
          <ControlledTextField
            control={control}
            name="username"
            placeholderTx="addConnectionScreen.usernamePlaceholder"
            handleOnChangeText={handleOnChangeText}
          />
          <ControlledTextField
            control={control}
            name="password"
            placeholderTx="addConnectionScreen.passwordPlaceholder"
            handleOnChangeText={handleOnChangeText}
          />
        </View>
        <Button
          disabled={!isValid}
          tx={"addConnectionScreen.btnSave"}
          onPress={handleSubmit(onSubmit)}
        />
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
  padding: spacing.md,
}
