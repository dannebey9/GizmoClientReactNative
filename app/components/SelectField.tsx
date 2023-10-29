import React, { useState, forwardRef } from "react"
import {
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableWithoutFeedback,
} from "react-native"
import { colors, spacing, typography } from "../theme"
import Animated from "react-native-reanimated"

export interface SelectOption {
  label: string
  value: string | number
}

export interface SelectProps {
  options: SelectOption[]
  selectedValue?: string | number
  onValueChange?: (value: string | number) => void
  containerStyle?: StyleProp<ViewStyle>
}

const SelectField = forwardRef(function SelectField(props: SelectProps) {
  const { options, selectedValue, onValueChange, containerStyle } = props

  const [modalVisible, setModalVisible] = useState(false)

  const handleOptionPress = (value: string | number) => {
    if (onValueChange) onValueChange(value)
    setModalVisible(false)
  }

  return (
    <View style={containerStyle}>
      {/* Выпадающий список */}
      <TouchableOpacity style={$inputWrapperStyle} onPress={() => setModalVisible(true)}>
        <Text style={$inputStyle}>
          {options.find((option) => option.value === selectedValue)?.label || ""}
        </Text>
      </TouchableOpacity>

      {/* Модальное окно для списка */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 1,
            }}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            backgroundColor: colors.palette.neutral300,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: spacing.sm,
            zIndex: 2,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        >
          {/* <Ionicons name={"close"} size={32} onPress={() => setModalVisible(false)} /> */}
          <View
            style={{
              width: 32,
              height: 4,
              backgroundColor: colors.palette.neutral400,
              alignSelf: "center",
              marginVertical: spacing.sm,
              borderRadius: 2,
            }}
          />
          <FlatList
            data={options}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleOptionPress(item.value)}>
                <Text style={$itemStyle}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </Animated.View>
      </Modal>
    </View>
  )
})

const $inputWrapperStyle: ViewStyle = {
  borderWidth: 1,
  borderColor: colors.palette.neutral400,
  borderRadius: 4,
  padding: spacing.sm,
  backgroundColor: colors.palette.neutral200,
}

const $inputStyle: TextStyle = {
  fontFamily: typography.primary.normal,
  color: colors.text,
  fontSize: 16,
}

const $itemStyle: TextStyle = {
  padding: spacing.sm,
  borderBottomWidth: 1,
  borderColor: colors.palette.neutral400,
}

export default SelectField
