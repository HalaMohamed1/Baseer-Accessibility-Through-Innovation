const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

// Mock Database (Replace with actual DB logic, e.g., MongoDB or PostgreSQL)
const orders = [];

// Email Transporter (Replace with your email configuration)
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "your-email@gmail.com",
        pass: "your-password", // Use environment variables for security in production
    },
});

// Route to Handle Order Submission
router.post("/api/orders", async (req, res) => {
    const { name, email, address, paymentMethod, cart, payment } = req.body;

    // Validate request data
    if (!name || !email || !address || !paymentMethod || !cart || !cart.length) {
        return res.status(400).json({ message: "Invalid request. Missing required fields." });
    }

    // Log the received order for debugging
    console.log("Received Order:", req.body);

    try {
        // Save order to mock database
        const newOrder = {
            id: orders.length + 1, // Simulate an auto-incrementing ID
            name,
            email,
            address,
            paymentMethod,
            cart,
            payment: paymentMethod === "card" ? payment : null, // Add payment details for card
            createdAt: new Date(),
        };
        orders.push(newOrder);

        // Send confirmation email
        const emailContent = `
            Hi ${name},
            
            Thank you for your order!
            Payment Method: ${paymentMethod === "card" ? "Credit Card" : "Cash on Delivery"}
            Shipping Address: ${address}
            
            Order Summary:
            ${cart.map(item => `- ${item.name} x ${item.quantity} ($${item.price})`).join("\n")}
            
            Total Price: $${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
            
            Regards,
            Baseer Team
        `;

        await transporter.sendMail({
            from: "your-email@gmail.com",
            to: email,
            subject: "Order Confirmation - Baseer",
            text: emailContent,
        });

        console.log("Order placed successfully and email sent!");
        res.status(200).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error("Error processing order:", error);
        res.status(500).json({ message: "Failed to process order", error: error.message });
    }
});

module.exports = router;
