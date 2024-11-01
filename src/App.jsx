import { Card, CardHeader } from "@nextui-org/react";
import ImageBg from "./assets/image/bg.jpg";
import Home from "./components/Home";
import RegisterFormStepOne from "./components/RegisterFormStepOne";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import RegisterFormStepTwo from "./components/RegisterFormStepTwo";
import RegisterFormStepThree from "./components/RegisterFormStepThree";
import { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function App() {
  // State to manage the current step
  const [currentStep, setCurrentStep] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [userInformation, setUserInformation] = useState({
    type: "",
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    bankNumber: "",
    countryResidence: "",
  });

  // Function to handle step navigation
  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  const handlePreviousChange = () => {
    if (currentStep !== 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateUserInformation = (updatedInfo, step) => {
    let newUserInformation = { ...userInformation }; // Copy current information
    if (step === "00") {
      newUserInformation.type = updatedInfo.type;
    } else if (step === "01") {
      newUserInformation.fullName = updatedInfo.fullName;
      newUserInformation.email = updatedInfo.email;
      newUserInformation.password = updatedInfo.password;
    } else if (step === "02") {
      newUserInformation.phoneNumber = updatedInfo.phoneNumber;
      newUserInformation.address = updatedInfo.address;
      newUserInformation.countryResidence = updatedInfo.countryResidence;
    } else if (step === "03") {
      newUserInformation.bankNumber = updatedInfo.bankNumber;
    }
    setUserInformation(newUserInformation);
    console.log(`Updated User Information Step ${step}:\n`, newUserInformation);
  };

  // Step titles
  const stepTitles = [
    {
      title: "Home",
      component: (
        <Home
          updateUserInformation={updateUserInformation}
          onNext={() => handleStepChange(1)}
        />
      ),
    },
    {
      title: "STEP 01/03 - Personal Info.",
      component: (
        <RegisterFormStepOne
          userInformation={userInformation}
          updateUserInformation={updateUserInformation}
          onNext={() => handleStepChange(2)}
        />
      ),
    },
    {
      title: "STEP 02/03 - Residency Info.",
      component: (
        <RegisterFormStepTwo
          userInformation={userInformation}
          updateUserInformation={updateUserInformation}
          onNext={() => handleStepChange(3)}
        />
      ),
    },
    {
      title: "STEP 03/03 - Bank Verification.",
      component: (
        <RegisterFormStepThree
          updateUserInformation={updateUserInformation}
          userInformation={userInformation}
        />
      ),
    },
  ];

  return (
    <div className={`flex h-screen overflow-y-auto`}>
      {/* Left Panel */}
      <div
        className="hidden md:flex md:w-1/2 text-white items-center justify-center p-8"
        style={{
          backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.8), rgba(37, 99, 235, 0.8)), url(${ImageBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center space-y-4">
          <div className="absolute top-4 left-4 flex items-center space-x-2 text-3xl font-bold">
            <div className="bg-white p-2 rounded-full text-blue-600">✈️</div>{" "}
            <span>Oasis</span>
          </div>

          <blockquote className="italic text-lg text-left w-[65%] mt-4 ml-[20%] leading-9">
            The passage experienced a surge in popularity during the 1960s when
            Letraset used it on their dry-transfer sheets, and again during the
            90s as desktop publishers bundled the text with their software.
          </blockquote>
          <div className="mt-4 text-sm text-left ml-[20%]">
            Vincent Obi{" "}
            <CheckCircleIcon style={{ color: "#1aea1c" }} fontSize="sm" />{" "}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div
        className={`w-full md:w-1/2 flex items-center justify-center bg-gray-100 relative`}
      >
        <div className="w-full h-screen md:h-full p-8 shadow-lg flex flex-col justify-start overflow-y-auto">
          {stepTitles[currentStep].title === "Home" ? (
            ""
          ) : (
            <>
              {/* Header section */}
              <div className="flex justify-between items-start text-gray-400 mb-4 w-full">
                {/* Left side - Back button */}
                <div
                  className="flex items-center cursor-pointer"
                  onClick={handlePreviousChange}
                >
                  <KeyboardArrowLeftIcon className="mr-1" />{" "}
                  {/* Left Arrow icon */}
                  <span>Back</span>
                </div>

                {/* Right side - Step Info */}
                <div className="text-right">
                  <span className="text-xs">
                    {stepTitles[currentStep].title.split("-")[0].trim()}
                  </span>
                  <br />
                  <span>
                    {currentStep === 0
                      ? "Welcome"
                      : stepTitles[currentStep].title.split("-")[1].trim()}
                  </span>
                </div>
              </div>
            </>
          )}
          {/* Render the current step component */}
          {stepTitles[currentStep].component}
        </div>
      </div>
    </div>
  );
}
