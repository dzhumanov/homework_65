import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { pageProps } from "../../types";
import axiosApi from "../../axiosApi";
import Preloader from "../../components/Preloader/Preloader";

const Page = () => {
  const [content, setContent] = useState<pageProps | null>(null);
  const [loading, setLoading] = useState(false);

  const { pageName } = useParams<{ pageName: string }>();
  const homePage = "pages/home.json";

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get(
        pageName ? `pages/${pageName}.json` : homePage
      );
      setContent(response.data);
    } catch (error) {
      console.error("Error!", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, [pageName]);

  return (
    <>
      <div className="container w-75">
        {loading && <Preloader />}
        {content && (
          <>
            <h1 className="fw-bold text-center mt-3">{content.title}</h1>
            <p className="fs-3 text-center ">{content.content}</p>
          </>
        )}
      </div>
    </>
  );
};

export default Page;
