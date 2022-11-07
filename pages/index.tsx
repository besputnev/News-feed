import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";

type Data = {
  title: string;
  id: number;
  url: string;
  imageUrl: string;
  newsSite: string;
  summary: string;
};

const Home = ({ datas }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Spaceflight News</title>
      </Head>
      <h1>Spaceflight News</h1>
      <div>
        {datas.map((data) => (
          <div key={data.id} className="news-block">
            <Link href={`/${data.id}`}>
              <a>
                <div>
                  <h2>{data.newsSite}</h2>
                  <h3>{data.title}</h3>
                  <p>click on me to see more...</p>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export async function getStaticProps() {
  const response = await fetch(
    `https://api.spaceflightnewsapi.net/v3/articles`
  );
  const datas: Data[] = await response.json();
  return {
    props: { datas },
  };
}

export default Home;
