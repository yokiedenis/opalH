import React, { useEffect } from "react";
import "./ChatBot.css";

const ChatBot = () => {
  useEffect(() => {
    // Initialize Tawk.to API
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_API.onLoad = function () {
      console.log("✅ [ChatBot] Tawk.to loaded successfully");

      // Hide widget by default
      if (typeof window.Tawk_API.hideWidget === "function") {
        window.Tawk_API.hideWidget();
      }

      // Set visitor information from localStorage
      const visitorName = localStorage.getItem("guestName") || "Guest";
      const visitorEmail = localStorage.getItem("guestEmail") || "";

      if (typeof window.Tawk_API.setAttributes === "function") {
        if (visitorEmail) {
          window.Tawk_API.setAttributes(
            {
              name: visitorName,
              email: visitorEmail,
            },
            function (error) {
              if (!error) {
                console.log("✅ Visitor attributes set successfully");
              }
            },
          );
        }
      }

      // Set custom styling
      if (window.Tawk_API.customStyle) {
        window.Tawk_API.customStyle = {
          zIndex: 9998,
        };
      }
    };

    // Handle chat status changes
    window.Tawk_API.onStatusChange = function (status) {
      console.log("💬 [ChatBot] Status changed to:", status);
    };

    // Handle chat maximized
    window.Tawk_API.onChatMaximized = function () {
      console.log("📖 [ChatBot] Chat window maximized");
    };

    // Handle chat minimized
    window.Tawk_API.onChatMinimized = function () {
      console.log("📦 [ChatBot] Chat window minimized");
    };

    // Handle chat started
    window.Tawk_API.onChatStarted = function () {
      console.log("💬 [ChatBot] Chat started");
    };

    // Handle chat ended
    window.Tawk_API.onChatEnded = function () {
      console.log("👋 [ChatBot] Chat ended");
    };

    // Load Tawk.to widget script
    const propertyId = import.meta.env.VITE_TAWK_PROPERTY_ID;

    if (propertyId && propertyId !== "YOUR_PROPERTY_ID/YOUR_WIDGET_ID") {
      const s1 = document.createElement("script");
      const s0 = document.getElementsByTagName("script")[0];

      s1.async = true;
      s1.src = `https://embed.tawk.to/${propertyId}`;
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");

      s0.parentNode.insertBefore(s1, s0);

      console.log("🔗 Tawk.to script loaded");
    } else {
      console.warn(
        "⚠️ [ChatBot] VITE_TAWK_PROPERTY_ID is not configured in .env",
      );
      console.warn(
        "Please add your Tawk.to Property ID to the .env file in the format: PROPERTY_ID/WIDGET_ID",
      );
    }

    // Expose functions globally for Header integration
    window.openChatWidget = function () {
      if (window.Tawk_API && typeof window.Tawk_API.toggle === "function") {
        window.Tawk_API.toggle();
      } else {
        console.warn("⚠️ Tawk.to widget not loaded yet");
      }
    };

    window.closeChat = function () {
      if (window.Tawk_API && typeof window.Tawk_API.minimize === "function") {
        window.Tawk_API.minimize();
      }
    };

    window.toggleChat = function () {
      if (window.Tawk_API && typeof window.Tawk_API.toggle === "function") {
        window.Tawk_API.toggle();
      }
    };

    return () => {
      // Cleanup
      delete window.openChatWidget;
      delete window.closeChat;
      delete window.toggleChat;
    };
  }, []);

  return null; // Tawk.to widget is injected globally via script tag
};

export default ChatBot;
