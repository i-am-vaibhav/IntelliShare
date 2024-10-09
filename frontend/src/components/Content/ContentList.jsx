import React, {useEffect, useState} from "react";
import { getRecommendations } from "../../api";
import { getToken, getUserId } from "../../authService";

const ContentList = () => {
  
  const [contentList, setContentList] = useState([]);
  const token = getToken();
  const userId = getUserId();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try{
        const response = await getRecommendations(userId, token);
        setContentList(response.data);
      }catch(error){
        alert('Failed to fetch content recommendations');
      }
    };

    fetchRecommendations();
  }, []);

  

  return (
    <div>
      <h2>Recommended Content</h2>
      {contentList.length > 0 ? (
          <ul>
            {contentList.map((content) => (
             <li key={content.id}>
              <h3>{content.title}</h3>
              <p>{content.description}</p>
              <a href={content.contentURL} target="_blank" rel="noopener noreferrer">
                View Content
              </a>
             </li> 
            ))}
          </ul>
        ) : (
        <p>No recommendations available</p>
        )}
    </div>
  );
};

export default ContentList;