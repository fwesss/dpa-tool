import "../styles/globals.css"
import { AppProps } from "next/app"
import { FC } from "react"
import { init } from "@sentry/nextjs"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "../theme/index"

init({
	dsn: "https://a7cf5bef4a6f4bd396e719be490aff3b@o481108.ingest.sentry.io/5774364",

	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 1.0,
})

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}

export default MyApp
