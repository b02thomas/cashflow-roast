import { Pressable, Text } from "react-native";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "secondary";
}

export function Button({ title, onPress, variant = "primary" }: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded-lg";
  const variantStyles =
    variant === "primary"
      ? "bg-blue-600 active:bg-blue-700"
      : "bg-gray-200 active:bg-gray-300";
  const textStyles =
    variant === "primary" ? "text-white font-semibold" : "text-gray-900 font-semibold";

  return (
    <Pressable className={`${baseStyles} ${variantStyles}`} onPress={onPress}>
      <Text className={textStyles}>{title}</Text>
    </Pressable>
  );
}
