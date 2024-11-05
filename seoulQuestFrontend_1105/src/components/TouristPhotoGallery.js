import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TouristPhotoGallery = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                // 프록시 서버를 통해 API 요청을 보냅니다.
                const response = await axios.get('http://localhost:4000/api/photos');
                setPhotos(response.data.response.body.items.item);
                console.log("Photo data:", response.data.response.body.items.item);
            } catch (err) {
                console.error('Error fetching photo gallery data:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPhotos();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h2>Tourist Photo Gallery</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {photos.map((photo, index) => (
                    <div key={index} style={{ margin: '10px' }}>
                        <img src={photo.imgUrl} alt={photo.title} style={{ width: '200px', height: '150px' }} />
                        <p>{photo.title}</p>
                        <p>촬영장소: {photo.photographyLocation}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TouristPhotoGallery;
