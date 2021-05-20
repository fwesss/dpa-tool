import { Box, Stack, Text } from "@chakra-ui/react"
import { ReactNode, FC } from "react"

interface NavGroupProps {
  label: string
  children: ReactNode
}

export const NavGroup: FC<NavGroupProps> = ({
  label,
  children,
}): JSX.Element => {
  return (
    <Box>
      <Text
        px="3"
        fontSize="xs"
        fontWeight="semibold"
        textTransform="uppercase"
        letterSpacing="widest"
        color="gray.500"
        mb="3"
      >
        {label}
      </Text>
      <Stack spacing="1">{children}</Stack>
    </Box>
  )
}
