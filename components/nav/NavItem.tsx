import { Text, Tag, LinkOverlay, LinkBox, Box, HStack } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { FC, ReactElement } from "react"

import { useAppSelector } from "../../app/hooks"
import data, { Program } from "../../program-data"

interface NavItemProps {
  href: string
  label: string
  subtle?: boolean
  icon?: ReactElement
  type?: Program["type"]
  slug?: string
}

export const NavItem: FC<NavItemProps> = ({
  href,
  subtle,
  label,
  icon,
  type,

  slug,
}) => {
  const { asPath } = useRouter()
  const { filters } = useAppSelector(state => state.filters)

  return (
    <LinkBox
      _active={{ bg: "gray.600" }}
      _hover={{ bg: "gray.700" }}
      bg={asPath === href && "gray.700"}
      borderColor={
        // eslint-disable-next-line no-nested-ternary
        type
          ? data[slug].filters.every(r =>
              Object.keys(filters)
                .filter(filter => filters[filter] === true)
                .includes(r)
            )
            ? "green.400"
            : "red.400"
          : "transparent"
      }
      borderWidth="2px"
      px="3"
      py="4"
      rounded="md"
      transition="all 0.2s"
      w="full"
    >
      <HStack>
        {icon && (
          <Box
            color={asPath === href ? "currentcolor" : "gray.400"}
            fontSize="lg"
          >
            {icon}
          </Box>
        )}

        <NextLink href={href || "/"} passHref>
          <LinkOverlay
            color={subtle && "gray.400"}
            flex="1"
            fontWeight="inherit"
          >
            <Text fontSize="lg">{label}</Text>
          </LinkOverlay>
        </NextLink>
      </HStack>
      <HStack>
        {type &&
          type.map((t, i) => (
            <Tag key={i} size="sm">
              {t}
            </Tag>
          ))}
      </HStack>
    </LinkBox>
  )
}
