import { Box, Flex, Stack } from "@chakra-ui/react"
import { FC } from "react"
import { BiBuoy } from "react-icons/bi"

import { Programs, Program } from "../../program-data"

import { NavGroup } from "./NavGroup"
import { NavItem } from "./NavItem"

interface NavSidebarProps {
  programs: Programs
  agencies: Program["agency"][]
}

const NavSidebar: FC<NavSidebarProps> = ({ programs, agencies }) => {
  return (
    <Box bg="gray.900" color="white" fontSize="sm" w="72">
      <Flex direction="column" h="full" px="4" py="4">
        <Stack flex="1" overflow="auto" pt="8" spacing="8">
          <Stack spacing="1">
            <NavItem href="/" label="Help Me Choose" />
          </Stack>

          {agencies.map(agency => (
            <NavGroup key={agency} label={agency}>
              {Object.entries(programs)
                .filter(program => program[1].agency === agency)
                .map(([slug, { name, type }]) => (
                  <NavItem
                    key={slug}
                    href={`/programs/${slug}`}
                    label={name}
                    slug={slug}
                    type={type}
                  />
                ))}
            </NavGroup>
          ))}
        </Stack>
        <Box>
          <Stack spacing="1">
            <NavItem
              href="/email"
              icon={<BiBuoy />}
              label="Help &amp; Support"
              subtle
            />
          </Stack>
        </Box>
      </Flex>
    </Box>
  )
}

export default NavSidebar
