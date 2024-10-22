"use client";

import { useGlobalContext } from "@/context/global-context";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Message({ message }: { message: IMessage }) {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const { setUnreadCount } = useGlobalContext();

  const handleReadClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });
      if (res.status === 200) {
        const { read } = await res.json();
        setIsRead(read);
        setUnreadCount((prev) => (read ? prev - 1 : prev + 1));
        if (read) {
          toast.success("Marked as read!");
        } else toast.success("Marked as new");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleDeleteClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        setIsDeleted(true);
        setUnreadCount((prev) => prev - 1);
        toast.success("Message Deleted!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Message could not be deleted");
    }
  };

  if (isDeleted) return null;

  return (
    <div className="relative rounded-md border border-gray-200 bg-white p-4 shadow-md">
      {!isRead && (
        <div className="absolute right-2 top-2 rounded-md bg-yellow-500 px-2 py-1 text-white">
          New
        </div>
      )}
      <h2 className="mb-4 text-xl">
        <span className="font-bold">Property Inquiry:</span>{" "}
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.sender.username}
        </li>

        <li>
          <strong>Reply Email:</strong>{" "}
          <a href={`mailto:${message.email}`} className="text-teal-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{" "}
          <a href={`tel:${message.phone}`} className="text-teal-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{" "}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className={`mr-3 mt-4 ${
          isRead ? "bg-gray-300" : "bg-teal-500 text-white"
        } rounded-md px-3 py-1`}
      >
        {isRead ? "Mark As New" : "Mark As Read"}
      </button>
      <button
        onClick={handleDeleteClick}
        className="mt-4 rounded-md bg-red-500 px-3 py-1 text-white"
      >
        Delete
      </button>
    </div>
  );
}
