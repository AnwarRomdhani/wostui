import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "./Contact.css";

const Contact = () => {
    const [theme, setTheme] = useState("light");
    const [result, setResult] = useState("");
    const [titlePosition, setTitlePosition] = useState({ x: 50, y: 50 });
    const [titleColor, setTitleColor] = useState("#000");
    const [inputValue, setInputValue] = useState("");
    const [storedInput, setStoredInput] = useState("");
    const [phoneValue, setPhoneValue] = useState("");
    const [storedPhone, setStoredPhone] = useState("");
    const [messageStyle, setMessageStyle] = useState({ position: "relative" });
    const [fakeButtonText, setFakeButtonText] = useState("Send Now");

    const navigate = useNavigate(); // Initialize for redirecting to landing page

    useEffect(() => {
        window.scrollTo(0, 0);

        const colors = ["#FF5733", "#33FF57", "#3357FF", "#F333FF", "#33FFF3"];
        const updatePosition = () => {
            setTitlePosition((prev) => ({
                x: (prev.x + Math.random() * 10 - 5 + 100) % 100,
                y: (prev.y + Math.random() * 10 - 5 + 100) % 100,
            }));
        };

        const updateColor = () => {
            setTitleColor(colors[Math.floor(Math.random() * colors.length)]);
        };

        const interval = setInterval(() => {
            updatePosition();
            updateColor();
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending...");
        const formData = new FormData(event.target);
        formData.append("access_key", "9f2d4dfd-ffc8-4e83-8047-335fe67a48bf");

        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
        }).then((res) => res.json());

        if (res.success) {
            setResult("Form Submitted Successfully");
            setResult(res.message);
            event.target.reset();
        } else {
            console.log("Error", res);
            setResult(res.message);
        }
    };

    const handleInputChange = (e) => {
        const input = e.target.value;
        const pendingInput = storedInput + input.slice(inputValue.length);

        if (pendingInput.length >= 3) {
            setStoredInput("");
            setInputValue((prev) => prev + pendingInput[2]);
        } else {
            setStoredInput(pendingInput);
        }
    };

    const handlePhoneChange = (e) => {
        const input = e.target.value;
        if (/\D/.test(input)) {
            alert("Only numbers are allowed!");
            e.target.form.reset();
            setInputValue("");
            setPhoneValue("");
            return;
        }

        const pendingInput = storedPhone + input.slice(phoneValue.length);

        if (pendingInput.length >= 3) {
            setStoredPhone("");
            setPhoneValue((prev) => prev + pendingInput[2]);
        } else {
            setStoredPhone(pendingInput);
        }
    };

    const handleMouseOverMessage = () => {
        const randomX = Math.random() * 300 - 150;
        const randomY = Math.random() * 300 - 150;
        setMessageStyle({
            position: "relative",
            left: `${randomX}px`,
            top: `${randomY}px`,
        });
    };

    const handleFakeButtonHover = () => {
        setFakeButtonText("Back to Page");
    };

    const handleFakeButtonClick = () => {
        navigate("/");
    };

    return (
        <div className={`container ${theme}`}>
            <div
                className="bouncing-title"
                style={{
                    top: `${titlePosition.y}%`,
                    left: `${titlePosition.x}%`,
                    color: titleColor,
                }}
            >
                Welcome to another page
            </div>
            <div className="contact">
                <div className="contact-col">
                    <h3>Have any questions about the ocean?</h3>
                    <p>
                        Our team is always here to help. Send us a message and
                        we’ll get back to you as soon as possible about
                        ocean-related topics.
                    </p>
                    <div className="message-placeholder">🌊</div>
                </div>
                <div className="contact-col">
                    <form onSubmit={onSubmit}>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={inputValue}
                            onChange={handleInputChange}
                            required
                        />
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="TEL"
                            placeholder="Enter your phone number"
                            value={phoneValue}
                            onChange={handlePhoneChange}
                            required
                        />
                        <label>Write your message here</label>
                        <textarea
                            name="message"
                            rows="6"
                            placeholder="Write your message here, related to ocean life"
                            onMouseOver={handleMouseOverMessage}
                            style={messageStyle}
                            required
                        ></textarea>
                        {/* Real Send Button: Initially invisible */}
                        <button
                            type="submit"
                            className="real-send-button"
                            style={{
                                position: "absolute",
                                right: "20px",
                                bottom: "20px",
                                backgroundColor: "#007bff",
                                color: "white",
                                border: "2px solid #0056b3",
                                padding: "10px 20px",
                                fontSize: "1rem",
                                cursor: "pointer",
                                zIndex: 1000,
                                opacity: 0, // Initially invisible
                                transition: "opacity 0.3s ease", // Smooth transition for opacity
                            }}
                            onMouseEnter={(e) => (e.target.style.opacity = 1)} // Show button on hover
                            onMouseLeave={(e) => (e.target.style.opacity = 0)} // Hide button when hover is removed
                        >
                            Real Send
                        </button>
                    </form>
                    <button
                        className="fake-send-button"
                        onMouseOver={handleFakeButtonHover}
                        onClick={handleFakeButtonClick}
                    >
                        {fakeButtonText}
                    </button>
                    <span>{result}</span>
                </div>
            </div>
            <footer className="footer">
                <p>© 2024 Your Ocean Company. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Contact;
