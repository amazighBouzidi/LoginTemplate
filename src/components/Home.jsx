import React, { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Home({ onNext, updateUserInformation }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="h-full">
      {/* Sign In Link at Top Right */}
      <div className="absolute top-4 right-4 text-sm">
        <span className="text-black">Already have an account? </span>
        <a href="#" className="text-blue-500 hover:underline">
          Sign In
        </a>
      </div>
      <div className="max-w-md space-y-6 mx-auto p-6 mt-[25%]">
        <h2 className="text-black text-3xl font-bold">Join Us!</h2>
        <div className="text-gray-500 mt-2 flex-1 flex-row">
          <div>To begin this journey, tell us what type of</div>
          <div className="text-gray-500">account you'd be opening.</div>
        </div>

        <div className="space-y-4">
          {/* Account Type Options */}
          <div
            className="border rounded-lg p-4 cursor-pointer hover:border-blue-500 flex items-center space-x-3 relative w-[110%]"
            onClick={() => {
              const updatedInfo = {
                type: "Individual",
              };
              updateUserInformation(updatedInfo, "00");
              onNext();
            }}
            onMouseEnter={() => setHovered("individual")}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="bg-blue-500 p-2 rounded-full text-white">👤</div>
            {/* Icon */}
            <div className="flex-grow">
              <h3 className="font-semibold">Individual</h3>
              <p className="text-sm text-gray-500">
                Personal account to manage all your activities.
              </p>
            </div>
            {hovered === "individual" && (
              <div className="absolute right-4">
                <ArrowForwardIcon className="text-blue-500" />
              </div>
            )}
          </div>

          <div
            className="border rounded-lg p-4 cursor-pointer hover:border-blue-500 flex items-center space-x-3 relative w-[110%]"
            onClick={() => {
              const updatedInfo = {
                type: "Business",
              };
              updateUserInformation(updatedInfo, "00");
              onNext();
            }}
            onMouseEnter={() => setHovered("business")}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="bg-blue-500 p-2 rounded-full text-white">🏢</div>
            {/* Icon */}
            <div className="flex-grow">
              <h3 className="font-semibold">Business</h3>
              <p className="text-sm text-gray-500">
                Own or belong to a company, this is for you.
              </p>
            </div>
            {hovered === "business" && (
              <div className="absolute right-4">
                <ArrowForwardIcon className="text-blue-500" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
