import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { pageProps } from "../../types";
import axiosApi from "../../axiosApi";

const Page = () => {
  const [content, setContent] = useState<pageProps | null>(null);
  const [loading, setLoading] = useState(false);

  const { pageName } = useParams<{ pageName: string }>();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get("pages/" + pageName + ".json");
      setContent(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, [pageName]);

  return (
    <>
      <div>
        {content && (
          <>
            <h1>{content.title}</h1>
            <p>{content.content}</p>
          </>
        )}
      </div>
    </>
  );
};

export default Page;
