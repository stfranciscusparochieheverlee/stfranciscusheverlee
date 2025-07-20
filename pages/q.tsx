import { Container } from "../components/util/container";
import { Section } from "../components/util/section";
import { Layout } from "../components/layout";
import { useSearchParams } from 'next/navigation';
import Head from "next/head";

export default function HomePage(
) {
    const searchParams = useSearchParams()
    const id = searchParams.get('k') ?? "";
    return (
    <>
        <Head>
            <title>Zoeken @ Sint-Franciscusparochie</title>
        </Head>
        <Layout>
            <Section className="flex-1">
                <Container size="large">
                    <div><h1>Zoekresultaten voor "{id}":</h1></div>
                </Container>
            </Section>
        </Layout>
    </>
  );
}
