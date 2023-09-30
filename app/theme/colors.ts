// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F4F2F1",
  neutral300: "#D7CEC9",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral800: "#191015",
  neutral900: "#000000",

  primary100: "#AFCCE6",
  primary200: "#7FB2DC",
  primary300: "#4F98D2",
  primary400: "#357DC8",
  primary500: "#2A80D1",
  primary600: "#2068A4",

  secondary100: "#D1A82A",
  secondary200: "#C88E20",
  secondary300: "#BF7417",
  secondary400: "#B65A0E",
  secondary500: "#AD4005",
  secondary600: "#8C3204",

  accent100: "#A8F2A1",
  accent200: "#78E86C",
  accent300: "#58E048",
  accent400: "#38D82E",
  accent500: "#2DE639",
  accent600: "#33B92D",

  angry100: "#FFC1C1",
  angry200: "#FF8E8E",
  angry300: "#FF5A5A",
  angry400: "#FF2626",
  angry500: "#FF0000",
  angry600: "#B90000",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral800,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral200,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.angry100,
}
