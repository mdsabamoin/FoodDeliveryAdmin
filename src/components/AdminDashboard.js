import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchCategories, fetchRecipes } from '../redux/adminSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const handleFetchCategories = () => {
    dispatch(fetchCategories());
  };

  const handleFetchRecipes = () => {
    dispatch(fetchRecipes());
  };

  return (
    <Container>
      <Button variant="primary" onClick={handleFetchCategories}>Fetch Categories</Button>
      <Button variant="secondary" onClick={handleFetchRecipes}>Fetch Recipes</Button>
      
      <h2>Navigation</h2>
      <nav>
        <Link to="/categories">Go to Category Management</Link>
        <br />
        <Link to="/recipes">Go to Recipe Management</Link>
        <br />
        <Link to="/orders">Go to Order Management</Link>
      </nav>
    </Container>
  );
};

export default AdminDashboard;
