import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes, createRecipe, updateRecipe, deleteRecipe } from "../redux/adminSlice";
import { Button, Form, Card, Row, Col, Image, Spinner, ListGroup } from "react-bootstrap";

const RecipeManagement = () => {
  const dispatch = useDispatch();
  const { recipes, loading } = useSelector((state) => state.admin);

  const [recipeName, setRecipeName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editingId, setEditingId] = useState(null); // Track the recipe being edited

  const categories = ["Appetizers", "Main Courses", "Desserts"]; // Predefined categories

  // Fetch existing categories or recipes if necessary
  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  // Handle image upload and preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle recipe submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recipeName || !selectedCategory || !ingredients || !price || (!image && !preview)) {
      alert("Please provide all the fields.");
      return;
    }

    if (editingId) {
      // Update existing recipe
      dispatch(updateRecipe({ id: editingId, recipeName, selectedCategory, ingredients, price, preview }));
      setEditingId(null);
    } else {
      // Add new recipe
      dispatch(createRecipe({ recipeName, selectedCategory, ingredients, price, preview }));
    }

    // Reset form fields
    setRecipeName("");
    setSelectedCategory("");
    setIngredients("");
    setPrice("");
    setImage(null);
    setPreview(null);
  };

  // Populate fields for editing
  const handleEdit = (recipe) => {
    setRecipeName(recipe.recipeName);
    setSelectedCategory(recipe.selectedCategory);
    setIngredients(recipe.ingredients);
    setPrice(recipe.price);
    setPreview(recipe.preview);
    setEditingId(recipe.id); // Set the ID of the recipe being edited
  };

  // Delete a recipe
  const handleDelete = (id) => {
    
    dispatch(deleteRecipe({id}));
    
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Recipe Management</h2>

      <Card className="p-4 shadow-sm mb-4">
        <h5>{editingId ? "Edit Recipe" : "Add a New Recipe"}</h5>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="recipeName">
                <Form.Label>Recipe Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter recipe name"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="ingredients">
                <Form.Label>Ingredients</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter ingredients"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="recipeImage">
                <Form.Label>Recipe Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Form.Group>
              {preview && (
                <div className="mt-2">
                  <Image src={preview} alt="Preview" thumbnail width={100} height={100} />
                </div>
              )}
            </Col>
          </Row>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : editingId ? "Update Recipe" : "Add Recipe"}
          </Button>
        </Form>
      </Card>

      <Card className="p-4 shadow-sm">
        <h5>All Recipes</h5>
        {loading ? (
          <Spinner animation="border" />
        ) : recipes && recipes.length > 0 ? (
          <ListGroup>
            {recipes.map((recipe) => (
              <ListGroup.Item key={recipe.id} className="d-flex align-items-center">
                <Image
                  src={recipe.preview}
                  alt={recipe.name}
                  rounded
                  width={50}
                  height={50}
                  className="me-3"
                />
                <div className="flex-grow-1">
                  <strong>{recipe.recipeName}</strong>
                  <div>Category: {recipe.selectedCategory}</div>
                  <div>Price: {recipe.price}</div>
                  <div>Ingredients: {recipe.ingredients}</div>
                </div>
                <Button variant="secondary" className="me-2" onClick={() => handleEdit(recipe)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(recipe.id)}>
                  Delete
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>No recipes added yet.</p>
        )}
      </Card>
    </div>
  );
};

export default RecipeManagement;
