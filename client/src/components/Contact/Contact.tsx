import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const { firstName, email, message, phone } = formData;
    console.log(firstName, email, message);

    fetch("http://localhost/react-blog/server/mail.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        email,
        message,
        phone,
      }),
    })
      .then((response) => response.text())
      .then((text) => {
        console.log(text);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  return (
    <section className="mt-20 mb-20">
      <div className="flex items-center justify-between max-w-[1400px] mx-auto p-6">
        <div>
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40 24C40 32.8366 32.8366 40 24 40C15.1634 40 8 32.8366 8 24C8 15.1634 15.1634 8 24 8C32.8366 8 40 15.1634 40 24Z"
              fill="#404040"
            />
            <path
              d="M72 24C72 32.8366 64.8366 40 56 40C47.1634 40 40 32.8366 40 24C40 15.1634 47.1634 8 56 8C64.8366 8 72 15.1634 72 24Z"
              fill="#FFD11A"
            />
            <path
              d="M72 56C72 64.8366 64.8366 72 56 72C47.1634 72 40 64.8366 40 56C40 47.1634 47.1634 40 56 40C64.8366 40 72 47.1634 72 56Z"
              fill="#404040"
            />
            <path
              d="M40 56C40 64.8366 32.8366 72 24 72C15.1634 72 8 64.8366 8 56C8 47.1634 15.1634 40 24 40C32.8366 40 40 47.1634 40 56Z"
              fill="#FFD11A"
            />
          </svg>
          <p className="text-5xl mt-3">Send us message about something</p>
        </div>
        <div>
          <form id="contact" onSubmit={handleSubmit}>
            <div className="flex gap-10">
              <div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm" htmlFor="name">
                    First name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter First Name"
                    className="rounded-md border border-solid border-gray-800 bg-[#1A1A1A] outline-none p-3"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2 mt-9">
                  <label className="text-sm" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className="rounded-md border border-solid border-gray-800 bg-[#1A1A1A] outline-none p-3"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm" htmlFor="lastName">
                    Last name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="rounded-md border border-solid border-gray-800 bg-[#1A1A1A] outline-none p-3"
                  />
                </div>
                <div className="flex flex-col gap-2 mt-9">
                  <label className="text-sm" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Phone Number"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="rounded-md border border-solid border-gray-800 bg-[#1A1A1A] outline-none p-3"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-9">
              <label className="text-sm" htmlFor="message">
                Message
              </label>
              <textarea
                className="rounded-md border border-solid border-gray-800 bg-[#1A1A1A] outline-none p-3  w-full resize-none"
                placeholder="Type something here..."
                value={formData.message}
                name="message"
                id="message"
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              ></textarea>
            </div>
            <div className="flex justify-between mt-9">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="h-5 w-5 border border-gray-800 bg-gray-700 text-yellow-600"
                />
                <p className="text-sm">
                  I agree with Terms of Use and Privacy Policy
                </p>
              </div>
              <div>
                <button
                  className="bg-[#FFD11A] text-[#141414] rounded-lg p-14 md:p-14 lg:p-3 font-bold-sm font-medium"
                  name="send"
                  type="submit"
                  id="contact-submit"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
