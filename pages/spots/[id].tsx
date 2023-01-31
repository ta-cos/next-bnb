import React from "react"
import { GetServerSideProps } from "next"
import ReactMarkdown from "react-markdown"
import Layout from "../../components/Layout"
import { SpotProps } from "../../components/Spot"
// pages/p/[id].tsx
import prisma from '../../lib/prisma';


// pages/p/[id].tsx
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const spot = await prisma.spot.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      owner: {
        select: { id: true, firstName: true, lastName: true },
      },
      spotImages: {
        select: { id: true, url: true, preview: true }
      }
    },
  });
  const serilaizedSpot = JSON.parse(JSON.stringify(spot))

  return {
    props: serilaizedSpot,
  };
};


const Post: React.FC<SpotProps> = (props) => {
  let title = props.name

  return (
    <Layout>
      <div className="page">
        <h2>{title}</h2>
        <p>By {props?.owner?.firstName + ' ' + props?.owner?.lastName || "Unknown author"}</p>
        <ReactMarkdown children={props.discription} />
        <ol>
          <li>id: {props.id}</li>
          <li>ownerId: {props.ownerId}</li>
          <li>address: {props.address}</li>
          <li>city: {props.city}</li>
          <li>state: {props.state}</li>
          <li>country: {props.country}</li>
          <li>lat: {props.lat}</li>
          <li>lng: {props.lng}</li>
          <li>name: {props.name}</li>
          <li>description: {props.discription}</li>
          <li>price: {props.price}</li>
          <li>SpotImages:
            {props.spotImages.map(img =>
              <ol>
                <li>id: {img.id}</li>
                <li>{img.url}</li>
                <li>{img.preview}</li>
              </ol>
            )}

          </li>
          <li>Owner:
            <ol>
              <li>id: {props.owner.id}</li>
              <li>firstName: {props.owner.firstName}</li>
              <li>lastName: {props.owner.lastName}</li>
            </ol>
          </li>
        </ol>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Post
