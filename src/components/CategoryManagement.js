import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, createCategory, updateCategory, deleteCategory } from "../redux/adminSlice";
import { Button, Form, Card, Row, Col, ListGroup, Image, Spinner } from "react-bootstrap";

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.admin);

  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  // const [preview, setPreview] = useState(null);
  const [customImageUrl, setCustomImageUrl] = useState(""); // Added state for custom image URL
  const [editingId, setEditingId] = useState(null); // Track the category being edited

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Handle image upload and preview

  // Handle custom URL input
  const handleCustomUrlChange = (e) => {
    setCustomImageUrl(e.target.value); // Use custom URL as the preview
    setImage(null); // Reset file upload if custom URL is provided
  };

  // Handle category submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName || (!image && !customImageUrl)) {
      alert("Please provide a category name and an image.");
      return;
    }

    if (editingId) {
      // Update existing category
      dispatch(updateCategory({ id: editingId, categoryName, customImageUrl }));
      setEditingId(null);
    } else {
      // Add new category
      dispatch(createCategory({ categoryName, customImageUrl }));
    }

    // Reset form fields
    setCategoryName("");
    setImage(null);
    setCustomImageUrl(""); // Reset custom URL
  };

  // Populate fields for editing
  const handleEdit = (category) => {
    setCategoryName(category.categoryName);
    setCustomImageUrl(category.customImageUrl); // Clear custom URL input when editing
    setEditingId(category.id); // Set the ID of the category being edited
  };

  // Handle category deletion
  const handleDelete = async (categoryId) => {
    try {
      await dispatch(deleteCategory(categoryId));
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Category Management</h2>

      <Card className="p-4 shadow-sm mb-4">
        <h5>{editingId ? "Edit Category" : "Add a New Category"}</h5>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="categoryName">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="customImageUrl" className="mt-2">
                <Form.Label> Enter Image URL</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Enter image URL"
                  value={customImageUrl}
                  onChange={handleCustomUrlChange}
                />
              </Form.Group>
              {customImageUrl && (
                <div className="mt-2">
                  <Image src={customImageUrl} alt="Preview" thumbnail width={100} height={100} />
                </div>
              )}
            </Col>
          </Row>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : editingId ? (
              "Update Category"
            ) : (
              "Add Category"
            )}
          </Button>
        </Form>
      </Card>

      <Card className="p-4 shadow-sm">
        <h5>Categories</h5>
        {loading ? (
          <Spinner animation="border" />
        ) : categories.length === 0 ? (
          <p>No categories added yet.</p>
        ) : (
          <ListGroup>
            {categories.map((category) => (
              <ListGroup.Item key={category.id} className="d-flex align-items-center">
                <Image
                  src={category.customImageUrl}
                  alt={category.categoryName}
                  rounded
                  width={50}
                  height={50}
                  className="me-3"
                />
                <div className="flex-grow-1">
                  <strong>{category.categoryName}</strong>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(category)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(category.id)}
                >
                  Delete
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card>
    </div>
  );
};

export default CategoryManagement;
