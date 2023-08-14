import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FAQ } from "../config";

const Section = ({ id, title, description, isVisible, toggleVisibility }) => {
  return (
    <div
      className="flex bg-white flex-col rounded-sm p-4 md:p-6 border-b-2 cursor-pointer hover:bg-gray-100 transition-all"
      onClick={toggleVisibility}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-base md:text-lg font-medium">{title}</h3>
        {isVisible ? <FaChevronUp /> : <FaChevronDown className="cursor-pointer" />}
      </div>
      {isVisible && <p className="text-sm md:text-base pt-2 text-gray-600">{description}</p>}
    </div>
  );
};

const Help = () => {
  const [visibleSection, setVisibleSection] = useState("");

  return (
    <div className="bg-gray-100 flex-grow font-poppins">
      <h1 className="py-3 md:py-5 font-bold text-center text-xl md:text-2xl bg-gray-900 text-white">
        FAQs
      </h1>
      {FAQ.map((question) => (
        <Section
          key={question.id}
          id={question.id}
          title={question.title}
          description={question.description}
          isVisible={visibleSection === question.id}
          toggleVisibility={() =>
            setVisibleSection(visibleSection === question.id ? "" : question.id)
          }
        />
      ))}
    </div>
  );
};

export default Help;
