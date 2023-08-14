import React from "react";
import { GITHUB_LINK, GMAIL_LINK, LINKEDIN_LINK } from "../config";
import { SiGithub, SiLinkedin, SiGoogle } from "react-icons/si";
import avatar from "../Images/myavatar.jpg";


const IconLink = ({ href, icon, color }) => (
  <a href={href} className="mb-2 pr-4 hover:scale-105" target="_blank">
    {React.cloneElement(icon, { className: `m-auto text-${color}` })}
  </a>
);

const Profile = () => {
  return (
    <div className="flex-1 flex justify-center items-center font-poppins">
      <div className="flex flex-col justify-center items-center rounded-md mt-4 gap-5 shadow-lg border w-fit max-w-xs">
        <p className="text-xl font-bold text-center py-2">About Me</p>
        <img
          className="w-[150px] h-[150px] border-none align-middle"
          src={avatar}
          alt="user photo"
          loading="lazy"
        />
        <div className="bg-slate-900 text-white p-4 rounded-sm">
          <p className="pb-4 text-lg font-normal text-slate-300 text-center">
            ReactJs | JavaScript | HTML5 | CSS3 | Tailwind CSS | Front End
            Developer
          </p>
          <div className="text-center text-2xl w-full flex items-center justify-center mt-1 ">
            <IconLink href={GITHUB_LINK} icon={<SiGithub />} color="gray-200" />
            <IconLink href={LINKEDIN_LINK} icon={<SiLinkedin />} color="blue-500" />
            <IconLink href={GMAIL_LINK} icon={<SiGoogle />} color="red-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
