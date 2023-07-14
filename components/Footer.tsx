import { BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="flex justify-between items-center">
      <div className="text-lg">
            &copy; 2023. Developed by <a target="_blank" className="hover:underline" href="https://vlhsmylv.github.io/valehismayilov">Valeh Ismayilov</a>
      </div>
      <div>
        <a className="text-3xl" target="_blank" href="https://github.io/vlhsmylv/threads-net">
          <BsGithub />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
