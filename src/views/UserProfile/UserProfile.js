import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../Components/Grid/GridItem.js";
import GridContainer from "../../Components/Grid/GridContainer.js";
import CustomInput from "../../Components/CustomInput/CustomInput.js";
import Card from "../../Components/Card/Card.js";
import CardHeader from "../../Components/Card/CardHeader.js";
import CardAvatar from "../../Components/Card/CardAvatar.js";
import CardBody from "../../Components/Card/CardBody.js";
import avatar from "../../assets/img/faces/marc.jpeg";
import { useSelector } from "react-redux";
import {AuthAPI, SurveysAPI} from "../../API";
import {PageStatus} from "../../enums";
import {BasicProfile} from "../../Components/My Settings/BasicProfile";
import {Show} from "../../Layout";
import {Button} from "react-bootstrap";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [imagePath, setImagePath] = useState(avatar);
  const [postalcode, setPostalcode] = useState("");
  const [aboutme, setAboutme] = useState("");
  const [disabled, setDisabled] = useState(true);
  const { invalid, pristine, submitting } = props;
  const [status, setStatus] = useState(PageStatus.None);
  const [error, setError] = useState('');
  const [showEditProfile, setShowEditProfile] = useState(false);


  const classes = useStyles();
  const { userId, role } = useSelector((state) => state.adminUser.adminUser);

  useEffect(() => {
    loadProfile();
  }, [status]);

  console.log('role--->', role)

  const loadProfile = async () => {
      Promise.resolve()

        .then(() => {
          if (!userId) {
            return Promise.reject(new Error("Invalid ID"));
          }
          return AuthAPI.profile(userId);
        })
        .then((user) => {
          if (!!user) {
            setUsername(user.dataValues.email);
            setEmail(user.dataValues.email);
            setFirstName(user.profile.firstName);
            setLastName(user.profile.lastName);
            setCity(user.profile.city);
            setCountry(user.profile.country);
            setPostalcode(user.profile.pinCode);
            setAboutme(user.aboutme);
            setImagePath(`${process.env.REACT_APP_BASE_URL_API}${user.profile.imagePath}` || avatar)
          }
        })
        .catch((error) => {
          alert(error);
        });
  };


  const handleProfilePictureChange = (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('userId', userId);
        Promise.resolve()
            .then(() => setStatus(PageStatus.Loading))
            .then(() => AuthAPI.uploadProfile(formData))
            .then((response) => {
              alert('Profile Uploaded Successfully')
              setStatus(PageStatus.Loaded)
            })
            .catch((error) => {
              setStatus(PageStatus.Error)
              setError(error.message)
            });
      }
    } catch (error) {
      setError(error);
    }
  }

  const handleSubmit = async () => {
    const valuesIn = {
      username,
      firstname,
      lastName,
      city,
      country,
      postalcode,
      aboutme,
    };

    return Promise.resolve()

      .then(() => ProfileAPI.updateadmin(valuesIn, _id))
      .then(() => {
        alert("Profile Update Successfully");
        loadProfile();
      })
      .catch((error) => {
        alert("Something went wrong . Please try again");
      });
  };

  return (
    <div>

      <Show when={showEditProfile} >
        <BasicProfile
            userId={userId}
            show={showEditProfile}
            onClose={() => setShowEditProfile(false)}
            onSubmit={() =>{
              setShowEditProfile(false)
              loadProfile();
            }}
        />

      </Show>

      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Profile</h4>
                <p className={classes.cardCategoryWhite}>
                  Your profile
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Email address"
                      id="email-address"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={email}
                      disabled={disabled}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="First Name"
                      id="first-name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={firstname}
                      disabled={disabled}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Last Name"
                      id="last-name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={lastName}
                      disabled={disabled}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <label htmlFor="city">City</label>

                    <select
                      style={{
                        width: "100%",
                        display: "block",
                        height: "40px",
                        lineHeight: "1.5",
                        color: "#495057",
                        backgroundColor: "#fff",
                        backgroundClip: "padding-box",
                        border: "1px solid #ced4da",
                        borderRadius: "5px",
                        transition:
                          "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                      }}
                      id="city"
                      value={city}
                      disabled={disabled}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    >
                      <option value="" disabled>
                        --Choose city--
                      </option>
                      <option>{city}</option>
                    </select>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <label htmlFor="country">Country</label>
                    <select
                      style={{
                        width: "100%",
                        display: "block",
                        height: "40px",
                        lineHeight: "1.5",
                        color: "#495057",
                        backgroundColor: "#fff",
                        backgroundClip: "padding-box",
                        border: "1px solid #ced4da",
                        borderRadius: "5px",
                        transition:
                          "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                      }}
                      id="country"
                      value={country}
                      disabled={disabled}
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                    >
                      <option value="" disabled>
                        --Choose Country--
                      </option>
                      <option>{country}</option>
                    </select>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Postal Code"
                      id="postal-code"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      disabled={disabled}
                      value={postalcode}
                      onChange={(e) => {
                        setPostalcode(e.target.value);
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </form>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <label htmlFor="profilePictureInput">
                <input
                    type="file"
                    id="profilePictureInput"
                    style={{ display: 'none' }}
                    onChange={handleProfilePictureChange}
                />
                <img src={imagePath} alt="Profile" style={{ cursor: 'pointer' }} />
              </label>
            </CardAvatar>

            <CardBody profile>
              <h6 className={classes.cardCategory}>{email}</h6>
              <h4 className={classes.cardTitle}>{firstname} {lastName}</h4>
              <p className={classes.description}>{aboutme}</p>
            </CardBody>
          </Card>
        </GridItem>
        <Button className="ml-3" onClick={() => setShowEditProfile(true)}>Edit</Button>

      </GridContainer>
    </div>
  );
}
