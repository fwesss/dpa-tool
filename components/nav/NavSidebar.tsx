import { FC } from "react"
import { Box, Flex, Stack } from "@chakra-ui/react"
import { BiBuoy } from "react-icons/bi"
import { NavGroup } from "./NavGroup"
import { NavItem } from "./NavItem"

interface NavSidebarProps {
  programs: {
    name: string
    slug: string
    agency: string
  }[]
  agencies: string[]
}

const NavSidebar: FC<NavSidebarProps> = ({ programs, agencies }) => {
  return (
    <Box w="72" bg="gray.900" color="white" fontSize="sm">
      <Flex h="full" direction="column" px="4" py="4">
        <Stack spacing="8" flex="1" overflow="auto" pt="8">
          <Stack spacing="1">
            <NavItem href="/" label="Get Started" />
          </Stack>

          {agencies.map(agency => (
            <NavGroup key={agency} label={agency}>
              {programs
                .filter(program => program.agency === agency)
                .map(({ name, slug }) => (
                  <NavItem href={`/programs/${slug}`} label={name} key={slug} />
                ))}
            </NavGroup>
          ))}
        </Stack>
        <Box>
          <Stack spacing="1">
            <NavItem
              subtle
              href="/email"
              icon={<BiBuoy />}
              label="Help & Support"
            />
          </Stack>
        </Box>
      </Flex>
    </Box>
  )
}

export default NavSidebar
