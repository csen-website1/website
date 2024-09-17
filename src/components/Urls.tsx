"use client";
import React, { useEffect } from "react";

type Props = {};

function Urls({}: Props) {
  const [formData, setFormData] = React.useState({
    videoUrl: "",
    downloadUrl: "",
    fichDesUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/layout");
        if (res.ok) {
          const data = await res.json();

          setFormData({
            videoUrl: data[0].videoUrl,
            downloadUrl: data[0].downloadUrl,
            fichDesUrl: data[0].fichDesUrl,
          });
        } else {
          alert("Failed to fetch data");
        }
      } catch (error) {
        console.error(error);
        alert("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const res = await fetch("/api/layout", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("Data saved successfully");
      } else {
        alert("Failed to save data");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save data");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">URLs Config</h2>
      <div className="flex  gap-5">
        <div className="">
          <label htmlFor="videoUrl">Video URL</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md py-2"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label htmlFor="downloadUrl">Download URL</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md py-2"
            name="downloadUrl"
            value={formData.downloadUrl}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label htmlFor="fichDesUrl">Fich Des URL</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md py-2"
            name="fichDesUrl"
            value={formData.fichDesUrl}
            onChange={handleChange}
          />
        </div>
      </div>
      <button
        //   onClick={handleSave}
        onClick={() => {
          handleSave();
        }}
        className="bg-primary text-white px-4 py-2 rounded-md w-1/4"
      >
        Save
      </button>
    </div>
  );
}

export default Urls;
