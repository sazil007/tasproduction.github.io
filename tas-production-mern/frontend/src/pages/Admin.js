import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchMessages();
  }, [user, navigate]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/contact`);
      setMessages(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/api/contact/${id}`, { status });
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="admin-page">
      <div className="container">
        <h2 className="section-title">Admin Dashboard</h2>
        <p className="section-subtitle">Manage Contact Messages</p>
        
        <div className="messages-list">
          {messages.length === 0 ? (
            <p className="no-messages">No messages yet</p>
          ) : (
            messages.map(message => (
              <div key={message._id} className="message-card">
                <div className="message-header">
                  <h3>{message.subject}</h3>
                  <span className={`status-badge status-${message.status}`}>
                    {message.status}
                  </span>
                </div>
                <div className="message-details">
                  <p><strong>From:</strong> {message.name} ({message.email})</p>
                  <p><strong>Date:</strong> {new Date(message.createdAt).toLocaleDateString()}</p>
                  <p><strong>Message:</strong> {message.message}</p>
                </div>
                <div className="message-actions">
                  {message.status === 'pending' && (
                    <button onClick={() => updateStatus(message._id, 'read')} className="btn-small">
                      Mark as Read
                    </button>
                  )}
                  {message.status === 'read' && (
                    <button onClick={() => updateStatus(message._id, 'replied')} className="btn-small">
                      Mark as Replied
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;