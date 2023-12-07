import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axiosApi from "../../axiosApi";
import { newPage } from "../../types";
import { useNavigate } from "react-router-dom";

const NewPage: React.FC = () => {
  const [page, setPage] = useState<newPage>({
    id: "",
    title: "",
    content: "",
  });

  const navigate = useNavigate();

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const idValue =
      name === "id"
        ? value
            .toLowerCase()
            .replace(/[^a-z0-9_-\s]/g, "")
            .replace(/\s+/g, "-")
        : value;

    setPage((prevPage) => ({
      ...prevPage,
      [name]: idValue,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await axiosApi.put<newPage>(`pages/${page.id}.json`, page);
      navigate(`/pages/${page.id}`);
    } catch (error) {
      console.error("Error!", error);
    }
  };

  return (
    <div className="container w-75">
      <h1 className="fs-1 text-center mt-3">New page</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="pageId" className="fs-3">
          <Form.Label>Enter page's Id</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter page ID"
            name="id"
            value={page.id}
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="title" className="fs-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            value={page.title}
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="content" className="fs-3 mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Enter content"
            name="content"
            value={page.content}
            onChange={onChange}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Create Page
        </Button>
      </Form>
    </div>
  );
};

export default NewPage;
