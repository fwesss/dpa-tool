import NextLink from "next/link"
import { LinkOverlay, LinkBox, Box, HStack } from "@chakra-ui/react"
import { FC, ReactElement } from "react"
import { useRouter } from "next/router"

interface NavItemProps {
  href: string
  label: string
  subtle?: boolean
  icon?: ReactElement
}

export const NavItem: FC<NavItemProps> = ({
  href,
  subtle,
  label,
  icon,
}): JSX.Element => {
  const { asPath } = useRouter()

  return (
    <LinkBox
      w="full"
      rounded="md"
      transition="all 0.2s"
      bg={asPath === href ? "gray.700" : undefined}
      _hover={{ bg: "gray.700" }}
      _active={{ bg: "gray.600" }}
      px="3"
      py="4"
    >
      <HStack>
        <Box
          fontSize="lg"
          color={asPath === href ? "currentcolor" : "gray.400"}
        >
          {icon}
        </Box>

        <NextLink href={href || "/"} passHref>
          <LinkOverlay
            flex="1"
            fontWeight="inherit"
            color={subtle ? "gray.400" : undefined}
          >
            {label}
          </LinkOverlay>
        </NextLink>
      </HStack>
    </LinkBox>
  )
}
