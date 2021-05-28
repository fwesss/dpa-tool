import {
  Heading,
  Alert,
  AlertIcon,
  Box,
  AlertTitle,
  AlertDescription,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react"
import Head from "next/head"
import { FC } from "react"

import { useAppSelector } from "../../app/hooks"
import data, { Program, filters as programFilters } from "../../program-data"

interface ProgramProps {
  slug: string
  program: Program
}

const ProgramPage: FC<ProgramProps> = ({ program: { name }, slug }) => {
  const { filters } = useAppSelector(state => state.filters)

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>

      <>
        {!data[slug].filters.every(r =>
          Object.keys(filters)
            .filter(filter => filters[filter] === true)
            .includes(r)
        ) && (
          <Alert status="error">
            <AlertIcon />
            <Box flex="1">
              <AlertTitle>Dis-qualifiers</AlertTitle>
              <AlertDescription display="block">
                <UnorderedList>
                  {data[slug].filters
                    .filter(filter =>
                      Object.entries(filters)
                        .filter(x => x[1] === false)
                        .map(([x]) => x)
                        .includes(filter)
                    )
                    .map(x => (
                      <ListItem key={x}>{programFilters[x].message}</ListItem>
                    ))}
                </UnorderedList>
              </AlertDescription>
            </Box>
          </Alert>
        )}
      </>
      <Heading as="h1">{name}</Heading>
    </>
  )
}

export const getStaticPaths = (): {
  paths: { params: { slug: string } }[]
  fallback: boolean
} => ({
  paths: Object.keys(data).map(slug => ({ params: { slug } })),
  fallback: false,
})

type GetStaticProps = (paths: { params: { slug: string } }) => {
  props: { program: Program; slug: string }
}
export const getStaticProps: GetStaticProps = ({ params: { slug } }) => ({
  props: { program: data[slug], slug },
})

export default ProgramPage
