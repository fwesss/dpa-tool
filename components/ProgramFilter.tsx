import { FC } from "react"
import {
  Box,
  Flex,
  Divider,
  Stack,
  Heading,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react"

const ProgramFilter: FC = () => (
  <Box w="72" bg="gray.900" color="white" fontSize="sm">
    <Flex h="full" direction="column" px="4" py="4">
      <Stack spacing="8" flex="1" overflow="auto" pt="8">
        <Heading as="h2" size="md">
          Program Filter
        </Heading>

        <Divider />

        <CheckboxGroup size="sm">
          <Checkbox>First time home buyer?</Checkbox>
          <Checkbox>Non-occupying co-borrower?</Checkbox>
        </CheckboxGroup>
      </Stack>
    </Flex>
  </Box>
)

export default ProgramFilter
