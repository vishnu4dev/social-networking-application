import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

const CreateUserProfile = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    status: "",
    skill: "",
    phoneNumber: "",
    location: "",
    address: "",
    company: "",
    location: "",
    skills: "",
    githubusername: "",
    bio: "",
    instagram: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    youtube: "",
  });
  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const onChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const {
    status,
    company,
    location,
    skills,
    githubusername,
    bio,
    instagram,
    facebook,
    twitter,
    linkedin,
    youtube,
  } = formData;

  const handleSubmit=(e)=>{
    e.preventDefault();
      console.log("--- 9090",formData)
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form">
        <div className="form-group">
          <select
            name="status"
            value={status}
            onChange={(e) => {
              onChangeHandler(e);
            }}
          >
            <option value="0" >* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={(e) => {
              onChangeHandler(e);
            }}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            onChange={(e) => {
              onChangeHandler(e);
            }}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => {
              onChangeHandler(e);
            }}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={(e) => {
              onChangeHandler(e);
            }}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={(e) => {
              onChangeHandler(e);
            }}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            value={bio}
            onChange={(e) => {
              onChangeHandler(e);
            }}
            placeholder="A short bio of yourself"
            name="bio"
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            type="button"
            onClick={(e) => {
              toggleSocialInputs(!displaySocialInputs);
            }}
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                value={twitter}
                name="twitter"
                onChange={(e) => {
                  onChangeHandler(e);
                }}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                value={facebook}
                name="facebook"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                value={youtube}
                name="youtube"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                value={linkedin}
                name="linkedin"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                value={instagram}
                name="instagram"
              />
            </div>
          </>
        )}

        <input
          type="submit"
          className="btn btn-primary my-1"
          onSubmit={(e)=>{handleSubmit(e)}}
        />
        <a className="btn btn-light my-1" href="dashboard.html">
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

export default connect(null, null)(CreateUserProfile);
