import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './About.css';
import InventoryHeader from './Inventory/inventoryHeader';

const About = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log("Attempting to fetch reviews from Firestore...");
        
        // Access the 'reviews' collection
        const reviewsCollection = collection(db, 'reviews');
        const snapshot = await getDocs(reviewsCollection);

        console.log("Snapshot size:", snapshot.size); // Log the number of documents

        if (snapshot.empty) {
          console.log("No documents found in the 'reviews' collection.");
        } else {
          const reviewsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          console.log("Fetched reviews data:", reviewsData); // Log the retrieved data
          setReviews(reviewsData);
        }

        setLoading(false); // Set loading to false after data fetch
      } catch (error) {
        console.error("Error fetching reviews: ", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "star filled" : "star empty"}>★</span>
    ));
  };

  return (
    <div>

      <InventoryHeader />
      <p className='paragraph' style={{ textDecoration: 'none' }}>Don't take our words, take it from our customers!</p>
      {loading ? (
        <p>Loading reviews...</p> // Display loading message while data is being fetched
      ) : (
        <div className="reviews-container">
          {reviews.length === 0 ? (
            <p>No reviews available.</p>
          ) : (
            reviews.map((review) => (
              <div className="review-card" key={review.id} style={{ textDecoration: 'none' }}>
                <p className="review-name" style={{ textDecoration: 'none' }}>{review.name}</p>
                <p className="review-date" style={{ textDecoration: 'none' }}>{review.date}</p>
                <div className="review-rating" style={{ textDecoration: 'none' }}>{renderStars(review.rating)}</div>
                <p className="review-text" style={{ textDecoration: 'none' }}>{review.text}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default About;