import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, TextField, Text } from "app/components"
import { useHeader } from "../../utils/useHeader"
import { $container } from "../../theme/presetStyles"
import { colors, spacing } from "../../theme"
import { ConnectionType, Protocol, useStores } from "../../models"
import { Control, Controller, useForm } from "react-hook-form"
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
  function AddConnectionScreen({ navigation, route }) {
    const { connectionsStore } = useStores()
    const {
      formState: { isValid },
      handleSubmit,
      control,
      trigger,
      setValue,
    } = useForm<Omit<ConnectionType, "$nonEmptyObject">>({
      resolver: zodResolver(AddConnectionValidationSchema),
      defaultValues: {
        // protocol: Protocol.HTTPS,
      },
    })

    useEffect(() => {
      if (route.params?.connectionId) {
        const connection = connectionsStore.connectionFromId(route.params.connectionId)
        if (connection) {
          setValue("name", connection.name)
          setValue("address", connection.address)
          setValue("port", connection.port)
          setValue("username", connection.username)
          setValue("password", connection.password)
          setValue("protocol", connection.protocol)
        }
      }
    }, [route.params?.connectionId])

    useHeader({
      titleTx: "addConnectionScreen.title",
      leftIcon: "back",

      onLeftPress: () => navigation.goBack(),
    })

    const onSubmit = (data: ConnectionType) => {
      if (route.params?.connectionId) {
        connectionsStore.updateConnection(route.params.connectionId, data)
        navigation.goBack()
        return
      }
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
          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <View
                style={{
                  flexDirection: "row",
                  height: 40,
                  padding: spacing.xxxs,
                  borderWidth: 1,
                  borderRadius: spacing.sm,
                  gap: spacing.xs,
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor:
                      value !== Protocol.HTTP
                        ? colors.palette.neutral200
                        : colors.palette.primary600,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: spacing.sm,
                  }}
                  onPress={() => handleOnChangeText(Protocol.HTTP, onChange)}
                >
                  <Text
                    style={{
                      color:
                        value !== Protocol.HTTP
                          ? colors.palette.primary600
                          : colors.palette.neutral100,
                    }}
                  >
                    HTTP
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor:
                      value !== Protocol.HTTPS
                        ? colors.palette.neutral200
                        : colors.palette.primary600,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: spacing.sm,
                  }}
                  onPress={() => handleOnChangeText(Protocol.HTTPS, onChange)}
                >
                  <Text
                    style={{
                      color:
                        value !== Protocol.HTTPS
                          ? colors.palette.primary600
                          : colors.palette.neutral100,
                    }}
                  >
                    HTTPS
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            name={"protocol"}
          />
        </View>
        <Button
          disabled={!isValid}
          tx={
            route.params?.connectionId
              ? "addConnectionScreen.btnUpdate"
              : "addConnectionScreen.btnSave"
          }
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
