import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

// need to include spotImages to get
// the preview Img, or just lazy load
// it for now

export type SpotProps = {
  id: string;
  owner: {
    id: string,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
  }
  spotImages: [{
    url: string,
    preview: boolean
  }]
  reviews: [{
    stars: number,
    text: string
  }]
  ownerId: string;
  address: string;
  city: string;
  state: string;
  country: string;
  lat: string;
  lng: string;
  name: string;
  discription: string;
  price: string;
};


const Spot: React.FC<{ spot: SpotProps }> = ({ spot }) => {

  const getAvg = (reviews) => {
    let total: number = 0
    let count: number = 0
    if (reviews.length) {
      reviews.forEach(rating => {
        total += rating.stars
        count++
      })
      console.log(total / count)
      return total / count
    } else {
      return 0
    }
  }

  const ownerName = spot.owner.firstName + ' ' + spot.owner.lastName;
  const avgRating: number = getAvg(spot.reviews)

  return (
    <div onClick={() => Router.push("/spots/[id]", `/spots/${spot.id}`)}>
      <h2>{spot.name} </h2>
      <h4> Avg Rating: {avgRating || "No Reviews Yet"}</h4>
      <small>Hosted By {ownerName}</small>
      <ReactMarkdown children={spot.discription} />
      <h4>Gallery:</h4>
      {
        spot.spotImages.length > 0 ?
          spot.spotImages.map(img => img.preview === true ?
            <p>{img.url}</p> : null) :
          "no images yet"
      }
      <h4>Reviews:</h4>
      {
        spot.reviews.length > 0 ?
          spot.reviews.map(review =>
            <>
              <p>{review.stars} {review.text}</p>
            </>
          )
          : <button>Be the first to review</button>
      }
      {
        spot.reviews.length && <button>Leave your review</button>
      }
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div >
  );
};

export default Spot;
