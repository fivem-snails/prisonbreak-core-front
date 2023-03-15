import {FC, useState} from 'react';
import {format, subYears} from 'date-fns';
import {BsFillPersonBadgeFill} from 'react-icons/bs';
import {HiOutlineArrowRight} from 'react-icons/hi';
import {FaDiscord} from 'react-icons/fa';
import '../css/Register.css';
import Field from '../components/Field';

interface RegisterProps {}

const Register: FC<RegisterProps> = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    createDate: new Date().toLocaleDateString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch('https://alta-core-front/hideRegisterform', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {'Content-Type': 'application/json'},
    });
  };

  return (
    <div className="register animate__animated animate__fadeInDown">
      <form
        className="form animate__animated animate__fadeIn"
        onSubmit={handleSubmit}
      >
        <section className="header">
          <h1 className="title">Begin your roleplay adventure.</h1>
          <p className="description">
            In order to fully immerse yourself in the world of roleplaying, it
            is essential that you create a compelling and well-developed
            character.
          </p>
        </section>

        <Field
          labelFor="firstname"
          label="Firstname"
          icon={<BsFillPersonBadgeFill />}
          id="firstName"
          type="text"
          placeholder="John"
          value={formData.firstName}
          onchange={handleChange}
        />

        <Field
          labelFor="lastname"
          label="Lastname"
          icon={<BsFillPersonBadgeFill />}
          id="lastName"
          type="text"
          placeholder="Phee"
          value={formData.lastName}
          onchange={handleChange}
        />

        <Field
          labelFor="birthdate"
          label="Birthdate"
          icon={<BsFillPersonBadgeFill />}
          id="birthDate"
          type="date"
          min="1980-01-01"
          max={format(subYears(new Date(), 19), 'yyyy-MM-dd')}
          value={formData.birthDate}
          onchange={handleChange}
        />

        <section className="footer">
          <button className="button" type="submit">
            Create new character
            <HiOutlineArrowRight className="ml-1 h-6 w-6" />
          </button>

          <a
            className="button"
            href="https://dsc.gg/altarp"
            rel="noreferrer"
            target="_blank"
          >
            <FaDiscord className="ml-1 h-6 w-6" />
          </a>
        </section>
      </form>{' '}
    </div>
  );
};

export default Register;