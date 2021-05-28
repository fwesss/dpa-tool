/* eslint-disable @typescript-eslint/require-await */

import { Box, ChakraProvider, Flex } from "@chakra-ui/react"
import { init } from "@sentry/nextjs"
import { AppProps } from "next/app"
import { FC } from "react"
import { Provider } from "react-redux"

import { store } from "../app/store"
import NavSidebar from "../components/nav/NavSidebar"
import ProgramFilter from "../components/programFilter/ProgramFilter"
import data, { Program, Programs } from "../program-data"
import theme from "../theme/index"

init({
  dsn: "https://a7cf5bef4a6f4bd396e719be490aff3b@o481108.ingest.sentry.io/5774364",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

interface MyAppProps extends AppProps {
  agencies: Program["agency"][]
  programs: Programs
}

interface MyFC<T> extends FC<T> {
  getInitialProps: () => Promise<{
    programs: Programs
    agencies: Program["agency"][]
  }>
}

const MyApp: MyFC<MyAppProps> = ({
  Component,
  pageProps,
  agencies,
  programs,
}) => (
  <Provider store={store}>
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
  </Provider>
)

MyApp.getInitialProps = async (): Promise<{
  programs: Programs
  agencies: Program["agency"][]
}> => ({
  programs: data,
  agencies: Array.from(
    new Set(Object.values(data).map(({ agency }) => agency))
  ),
})

export default MyApp
