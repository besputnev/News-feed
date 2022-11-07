import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";

export default function ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>{data.newsSite}</title>
      </Head>
      <h1>{data.newsSite}</h1>
      <div className="one-news-block">
        <h2>{data.title}</h2>
        <p>{data.summary}</p>
        <img src={data.imageUrl} />
        <div className="navigation">
          <Link href={`/`}>
            <a className="back-link">Home</a>
          </Link>
          <Link href={data.url}>
            <a className="source-link" target="_blank">
              To source
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }: any) {
  const response = await fetch(
    `https://api.spaceflightnewsapi.net/v3/articles/${params.id}`
  );
  const data = await response.json();
  return {
    props: { data },
  };
}
