import React from 'react'
import { useEffect,useRef } from 'react';
import api from '../../api/axiosConfig';
import { Container,Row,Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ReviewForm from './ReviewForm';
const Reviews = ({getMovieData,movie,reviews,setReviews}) => {
    const revText= useRef();
    let params=useParams();
    const {movieId}= params.movieId;
    useEffect(() => {
        getMovieData(movieId)
      }, [getMovieData, movieId]);

      const addReview = async (e) => {
        e.preventDefault();
        const rev = revText.current;
        try {
            const response = await api.post("http://localhost:8081/api/v1/reviews", {
                reviewBody: rev.value,
                imdbId: movieId,
            });
            const updatedReview = [...reviews, { body: rev.value }];
            rev.value = "";
            setReviews(updatedReview);
        } catch (error) {
            console.error("Error adding review:", error);
            alert("Failed to add review. Please try again later.");
        }
    };
    

  return (
    <Container>
        <Row>
            <Col>
            <h3>Reviews</h3>
            </Col>
        </Row>
        <Row className='mt-2'>
            <Col>
            <img src={!movie?.poster}  alt={`${movie?.title || "Movie"} Poster`}/>
            </Col>
            <Col>
            {
                <>
                 <Row>
                    <Col>
                    <ReviewForm handleSubmit={addReview} revText={revText } labelText= "Write your Review on this Movie"></ReviewForm>
                    </Col>
                 </Row>
                 <Row>
                    <Col>
                    <hr></hr>
                    </Col>
                 </Row>
                </>
                
            }
            {
                reviews?.map((r)=>{
                    return(
                        <>
                        <Row>
                           <Col>
                           {r.body}
                           </Col>
                        </Row>
                        <Row>
                           <Col>
                           <hr></hr>
                           </Col>
                        </Row>

                        </>
                    )
                })
            }
            </Col>
        </Row>
    </Container>
  )
}

export default Reviews
