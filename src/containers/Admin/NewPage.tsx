import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axiosApi from "../../axiosApi";
import { newPage } from "../../types";

const NewPage: React.FC = () => {
  const [page, setPage] = useState<newPage>({
    id: "",
    title: "",
    content: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const slugValue =
      name === "id" ? value.toLowerCase().replace(/[^a-z0-9-_]/g, "") : value;
    setPage((prevPage) => ({
      ...prevPage,
      [name]: slugValue,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await axiosApi.put<newPage>(`pages/${page.id}.json`, page);
    } catch (error) {
      console.error("Error!", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="pageId">
        <Form.Label>Enter page's Id</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter page ID"
          name="id"
          value={page.id}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          name="title"
          value={page.title}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="content">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Enter content"
          name="content"
          value={page.content}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button type="submit" variant="primary">
        Create Page
      </Button>
    </Form>
  );
};

export default NewPage;
