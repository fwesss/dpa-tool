import {
  Box,
  Checkbox,
  CheckboxGroup,
  Divider,
  Flex,
  Heading,
  Stack,
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  NumberInputField,
  Text,
  HStack,
} from "@chakra-ui/react"
import { FC, useEffect, useState } from "react"

import { useAppDispatch } from "../../app/hooks"

import {
  changeFilters,
  changeFicoFilters,
  changeDtiFilters,
} from "./filterSlice"

const ProgramFilter: FC = () => {
  const dispatch = useAppDispatch()

  const [score, setScore] = useState({
    value: 680,
    color: "green.500",
  })
  const [dti, setDti] = useState({
    value: 35,
    color: "green.500",
  })

  function setFicoColor(value: number) {
    if (value < 620) {
      return "red.500"
    }

    if (value < 680) {
      return "yellow.500"
    }

    return "green.500"
  }

  function setDtiColor(value: number) {
    if (value > 55) {
      return "red.500"
    }

    if (value > 45) {
      return "yellow.500"
    }

    return "green.500"
  }

  function handleFicoChange(value: number) {
    setScore({ value, color: setFicoColor(value) })
  }

  function handleDtiChange(value: number) {
    setDti({ value, color: setDtiColor(value) })
  }

  useEffect(() => {
    if (score.value < 620) {
      dispatch(changeFicoFilters(620))
    } else if (score.value < 640) {
      dispatch(changeFicoFilters(640))
    } else if (score.value < 660) {
      dispatch(changeFicoFilters(660))
    } else if (score.value < 680) {
      dispatch(changeFicoFilters(680))
    } else {
      dispatch(changeFicoFilters(700))
    }
  }, [dispatch, score.value])

  useEffect(() => {
    if (dti.value > 55) {
      dispatch(changeDtiFilters(55))
    } else if (dti.value > 50) {
      dispatch(changeDtiFilters(50))
    } else if (dti.value > 45) {
      dispatch(changeDtiFilters(45))
    } else {
      dispatch(changeDtiFilters(35))
    }
  }, [dispatch, dti.value])

  return (
    <Box bg="gray.900" color="white" fontSize="sm" w="72">
      <Flex direction="column" h="full" px="4" py="4">
        <Stack flex="1" overflow="auto" pt="8" spacing="8">
          <Heading as="h2" size="md">
            Program Filter
          </Heading>

          <Divider />

          <CheckboxGroup size="sm">
            <Checkbox
              defaultIsChecked
              onChange={e =>
                dispatch(
                  changeFilters({
                    active: e.target.checked,
                    filter: "firstTimeBuyer",
                  })
                )
              }
            >
              First time home buyer?
            </Checkbox>
            <Checkbox
              onChange={e =>
                dispatch(
                  changeFilters({
                    active: !e.target.checked,
                    filter: "allOccupying",
                  })
                )
              }
            >
              Non-occupying co-signor?
            </Checkbox>
          </CheckboxGroup>

          <HStack>
            <Text>FICO</Text>

            <NumberInput
              aria-label="FICO Score"
              focusBorderColor={score.color}
              inputMode="numeric"
              isInvalid={score.value < 620}
              max={850}
              maxW={24}
              min={300}
              value={score.value}
              allowMouseWheel
              isRequired
              onChange={(_, v) => handleFicoChange(v)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </HStack>

          <HStack>
            <Text>Back-end DTI</Text>

            <NumberInput
              aria-label="Back-end DTI"
              focusBorderColor={dti.color}
              inputMode="numeric"
              isInvalid={dti.value > 55}
              max={99}
              maxW={24}
              min={0}
              value={dti.value}
              allowMouseWheel
              onChange={(_, v) => handleDtiChange(v)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </HStack>
        </Stack>
      </Flex>
    </Box>
  )
}

export default ProgramFilter
