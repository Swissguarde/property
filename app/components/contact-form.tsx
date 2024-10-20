import React from "react";
import { FaPaperPlane } from "react-icons/fa";

export default function ContactForm({ property }: { property: IProperty }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-6 text-xl font-bold">Contact Property Manager</h3>
      <form
        action="mailto:support@traversymedia.com"
        method="post"
        encType="text/plain"
      >
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="message"
          >
            Message:
          </label>
          <textarea
            className="focus:shadow-outline h-44 w-full appearance-none rounded border px-3 py-2 text-gray-700 shadow focus:outline-none"
            id="message"
            placeholder="Enter your message"
          ></textarea>
        </div>
        <div>
          <button
            className="focus:shadow-outline flex w-full items-center justify-center rounded-full bg-teal-500 px-4 py-2 font-bold text-white hover:bg-teal-600 focus:outline-none"
            type="submit"
          >
            <FaPaperPlane className="mr-2" /> Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
