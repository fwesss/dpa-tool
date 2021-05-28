import { Box, Stack, Text } from "@chakra-ui/react"
import { FC, ReactNode } from "react"

interface NavGroupProps {
  label: string
  children: ReactNode
}

export const NavGroup: FC<NavGroupProps> = ({ label, children }) => (
  <Box>
    <Text
      color="gray.500"
      fontSize="xl"
      fontWeight="semibold"
      letterSpacing="widest"
      px="3"
      textTransform="uppercase"
    >
      {label}
    </Text>
    <Stack spacing="1">{children}</Stack>
  </Box>
)
