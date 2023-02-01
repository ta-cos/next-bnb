import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Spot, { SpotProps } from "../components/Spot"
// pages/p/[id].tsx
import prisma from '../lib/prisma';


// index.tsx
export const getStaticProps: GetStaticProps = async () => {
  const spots = await prisma.spot.findMany({
    include: {
      owner: {
        select: { firstName: true, lastName: true },
      },
      spotImages: {
        select: { url: true, preview: true }
      },
      reviews: {
        select: { text: true, stars: true }
      }
    },
  });
  //need to add properties avgRating
  const serilaizedSpots = spots.map(record => JSON.parse(JSON.stringify(record)))

  return {
    props: { serilaizedSpots },
    revalidate: 10,
  };
};


type Props = {
  serilaizedSpots: SpotProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Welcome to Next-BNB</h1>
        <main>
          {props.serilaizedSpots
            .map((spot) => (
              <div key={spot.id} className="spot">
                <Spot spot={spot} />
              </div>
            ))}
        </main>
      </div>
      <style jsx>{`
        .spot {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .spot:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .spot + .spot {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}


export default Blog
