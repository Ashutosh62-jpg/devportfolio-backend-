const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const authMiddleware = require('../middleware/auth');

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Create new contact message
    const contact = await Contact.create({
      name,
      email,
      message,
    });
    
    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      data: contact,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to send message. Please try again.',
      error: error.message,
    });
  }
});

// @route   GET /api/contact
// @desc    Get all contact messages (admin only)
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Get all messages, sorted by newest first
    const messages = await Contact.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not fetch messages',
      error: error.message,
    });
  }
});

// @route   PATCH /api/contact/:id/read
// @desc    Mark message as read (admin only)
// @access  Private
router.patch('/:id/read', authMiddleware, async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Message marked as read',
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update message',
      error: error.message,
    });
  }
});

// @route   DELETE /api/contact/:id
// @desc    Delete contact message (admin only)
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete message',
      error: error.message,
    });
  }
});

module.exports = router;
