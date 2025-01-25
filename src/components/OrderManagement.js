import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrderStatus } from "../redux/adminSlice";
import { Card, Table, Button, Spinner, Badge, Modal } from "react-bootstrap";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.admin);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch all orders when the component mounts
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Update order status
  const handleStatusUpdate = (orderId, status,customerName,totalprice,items) => {
    dispatch(updateOrderStatus({ orderId, status,customerName,totalprice,items }));
  };

  // Open modal to view order details
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedOrder(null);
  };
  
  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Order Management</h2>

      {loading ? (
        <Spinner animation="border" className="d-block mx-auto" />
      ) : (
        <Card className="p-4 shadow-sm">
          <h5>All Orders</h5>
          {orders && orders.length > 0 ? (
            <Table striped bordered hover responsive className="mt-3">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>
                      <Badge bg={getBadgeVariant(order.status)}>{order.status}</Badge>
                    </td>
                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        className="me-2"
                        onClick={() => handleViewDetails(order)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="success"
                        size="sm"
                        className="me-2"
                        onClick={() => handleStatusUpdate(order.id,
                           "delivered",
                           order.customerName, 
                           order?.items?.reduce((acc,item)=>acc + (item.price*item.quantity),0),
                           order?.items
                          
                          )}
                        disabled={order.status === "delivered"}
                      >
                        Mark as Delivered
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleStatusUpdate(order.id,
                           "failed",
                            order.customerName,
                            order?.items?.reduce((acc,item)=>acc + (item.price*item.quantity),0),
                            order?.items
                          
                          )}
                        disabled={order.status === "failed"}
                      >
                        Mark as Failed
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No orders placed yet.</p>
          )}
        </Card>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <Modal show onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Customer Name:</strong> {selectedOrder.customerName}</p>
            <p><strong>Order ID:</strong> {selectedOrder.id}</p>
            <p><strong>Total Price:</strong> {selectedOrder?.items?.reduce((acc,item)=>acc + (item.price*item.quantity),0)}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <h5>Items:</h5>
            <ul>
              {selectedOrder?.items?.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.price} x {item.quantity} --- {item.price*item.quantity}
                </li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

// Helper function to determine badge color based on status
const getBadgeVariant = (status) => {
  switch (status) {
    case "pending":
      return "warning";
    case "preparing":
      return "info";
    case "delivered":
      return "success";
    case "failed":
      return "danger";
    default:
      return "secondary";
  }
};

export default OrderManagement;
