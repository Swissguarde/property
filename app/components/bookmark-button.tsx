"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

export default function BookmarkButton({ property }: { property: IProperty }) {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    const checkBookmarkStatus = async () => {
      try {
        const res = await fetch("/api/bookmarks/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            propertyId: property._id,
          }),
        });

        if (res.status === 200) {
          const data = await res.json();

          setIsBookmarked(data.isBookmarked);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    checkBookmarkStatus();
  }, [property._id, userId]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("Sign in to bookmark a property");
      return;
    }

    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId: property._id,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        toast.success(data.message);
        setIsBookmarked(data.isBookmarked);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return isBookmarked ? (
    <div>
      <button
        onClick={handleClick}
        className="flex w-full items-center justify-center rounded-full bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
      >
        <FaBookmark className="mr-2" />
        Remove Bookmark
      </button>
    </div>
  ) : (
    <div>
      <button
        onClick={handleClick}
        className="flex w-full items-center justify-center rounded-full bg-teal-500 px-4 py-2 font-bold text-white hover:bg-teal-600"
      >
        <FaBookmark className="mr-2" />
        Bookmark Property
      </button>
    </div>
  );
}
