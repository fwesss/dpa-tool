import { FC } from "react"
import { Heading } from "@chakra-ui/react"
import Head from "next/head"
import data from "../../program-data.json"

interface ProgramProps {
  name: string
}

const Program: FC<ProgramProps> = ({ name }) => {
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>

      <Heading as="h1">{name}</Heading>
    </>
  )
}

export const getStaticPaths = (): {
  paths: { params: { slug: string } }[]
  fallback: boolean
} => ({
  paths: data.programs.map(({ slug }) => ({ params: { slug } })),
  fallback: false,
})

export const getStaticProps = ({
  params: { slug },
}: {
  params: { slug: string }
}) => ({ props: data.programs.filter(program => program.slug === slug)[0] })

export default Program
