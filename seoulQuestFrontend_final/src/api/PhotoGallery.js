import React, { useEffect, useState } from "react";
import axios from "axios";

const PhotoGallery = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiKey = process.env.REACT_APP_API_KEY; // 환경 변수에서 API 키 가져오기

    const fetchPhotoGallery = async () => {
        try {
            const response = await axios.get(`https://apis.data.go.kr/B551011/PhotoGalleryService1/galleryList1`, {
                params: {
                    serviceKey: apiKey,
                    MobileApp: 'AppTest',
                    MobileOS: 'ETC',
                    pageNo: 1,
                    numOfRows: 10,
                    arrange: 'A'
                },
                responseType: 'text' // XML 응답을 텍스트로 가져오기
            });

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response.data, "application/xml");
            const items = xmlDoc.getElementsByTagName("item");
            const parsedItems = Array.from(items).map(item => ({
                galTitle: item.getElementsByTagName("galTitle")[0].textContent,
                galWebImageUrl: item.getElementsByTagName("galWebImageUrl")[0].textContent,
                galPhotographyLocation: item.getElementsByTagName("galPhotographyLocation")[0].textContent,
                galPhotographer: item.getElementsByTagName("galPhotographer")[0].textContent
            }));

            setPhotos(parsedItems);
        } catch (err) {
            console.error('Error fetching photo gallery data:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhotoGallery();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Photo Gallery</h1>
            <div className="gallery-container">
                {photos.map((photo, index) => (
                    <div key={index} className="photo-card">
                        <img src={photo.galWebImageUrl} alt={photo.galTitle} />
                        <h3>{photo.galTitle}</h3>
                        <p>{photo.galPhotographyLocation}</p>
                        <p>Photographer: {photo.galPhotographer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotoGallery;
