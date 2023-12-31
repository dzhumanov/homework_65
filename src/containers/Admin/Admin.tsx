import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { pageProps } from "../../types";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../axiosApi";
import Preloader from "../../components/Preloader/Preloader";

const Admin: React.FC = () => {
  const [content, setContent] = useState<pageProps>({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectedPage, setSelectedPage] = useState<string>("");
  const [pages, setPages] = useState<string[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosApi.get("pages.json");
      const pageKeys = Object.keys(response.data);
      setPages(pageKeys);
    };

    fetchData();
  }, []);

  const sortedArray = pages.filter((page) => page !== "home");

  const onChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setContent((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const updatedContent = {
      title: content.title,
      content: content.content,
    };

    try {
      await axiosApi.put(`pages/${selectedPage}.json`, updatedContent);
      navigate(`/pages/${selectedPage}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchPage = async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get(`pages/${selectedPage}.json`);
      setContent(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedPage) {
      void fetchPage();
    }
  }, [selectedPage]);

  return (
    <>
      <div className="container w-75">
        {loading && <Preloader />}
        <h1 className="text-center mt-3">Edit pages</h1>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="select" className="mt-3 fs-3">
            <Form.Label>Select page:</Form.Label>
            <Form.Select
              name="pages"
              required
              onChange={(e) => setSelectedPage(e.target.value)}
              value={selectedPage}
            >
              <option>Select a page</option>
              {sortedArray.map((page, index) => (
                <option key={index} value={page}>{page}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="author" className="fs-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Type a new title"
              onChange={onChange}
              value={content.title}
            />
          </Form.Group>
          <Form.Group className="mt-4 fs-3" controlId="textArea">
            <Form.Label>Type new content</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="content"
              onChange={onChange}
              value={content.content}
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-3">
            Update
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Admin;
