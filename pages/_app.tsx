/* eslint-disable @typescript-eslint/require-await */

import { FC } from "react"
import { AppProps } from "next/app"
import { init } from "@sentry/nextjs"
import { Box, ChakraProvider, Flex } from "@chakra-ui/react"
import theme from "../theme/index"
import ProgramFilter from "../components/ProgramFilter"
import NavSidebar from "../components/nav/NavSidebar"
import data from "../program-data.json"

init({
  dsn: "https://a7cf5bef4a6f4bd396e719be490aff3b@o481108.ingest.sentry.io/5774364",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

interface MyAppProps extends AppProps {
  agencies: string[]
  programs: {
    name: string
    slug: string
    agency: string
  }[]
}

interface MyFC<T> extends FC<T> {
  getInitialProps: () => Promise<{
    programs: { name: string; slug: string; agency: string }[]
    agencies: string[]
  }>
}

const MyApp: MyFC<MyAppProps> = ({
  Component,
  pageProps,
  agencies,
  programs,
}) => (
  <ChakraProvider theme={theme}>
    <Box height="100vh" overflow="hidden" position="relative">
      <Flex h="full" id="app-container">
        <NavSidebar agencies={agencies} programs={programs} />

        <Box bg="white" flex="1" p="6">
          <Component {...pageProps} />
        </Box>

        <ProgramFilter />
      </Flex>
    </Box>
  </ChakraProvider>
)

MyApp.getInitialProps = async (): Promise<{
  programs: { name: string; slug: string; agency: string }[]
  agencies: string[]
}> => ({
  programs: data.programs,
  agencies: Array.from(
    new Set(data.programs.map(({ agency }: { agency: string }) => agency))
  ),
})

export default MyApp
