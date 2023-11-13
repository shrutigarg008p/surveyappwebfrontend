import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../Components/Grid/GridItem.js";
import GridContainer from "../../Components/Grid/GridContainer.js";
import CustomInput from "../../Components/CustomInput/CustomInput.js";
import Button from "../../Components/CustomButtons/Button.js";
import Card from "../../Components/Card/Card.js";
import CardHeader from "../../Components/Card/CardHeader.js";
import CardAvatar from "../../Components/Card/CardAvatar.js";
import CardBody from "../../Components/Card/CardBody.js";
import CardFooter from "../../Components/Card/CardFooter.js";
import avatar from "../../assets/img/faces/marc.jpg";
import PropTypes from "prop-types";
import jwt from "jsonwebtoken";
import { useSelector } from "react-redux";
import { LoadingSpinner } from "../../Layout/LoadingSpinner";
import {AuthAPI} from "../../API";

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
  const [postalcode, setPostalcode] = useState("");
  const [aboutme, setAboutme] = useState("");
  const [disabled, setDisabled] = useState(true);
  const { invalid, pristine, submitting } = props;

  const classes = useStyles();
  const { userId } = useSelector((state) => state.adminUser.adminUser);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
      Promise.resolve()

        .then(() => {
          if (!userId) {
            return Promise.reject(new Error("Invalid ID"));
          }
          return AuthAPI.profile(userId);
        })
        .then((user) => {
          console.log('user---->', user)
          if (!!user) {
            setUsername(user.dataValues.email);
            setEmail(user.dataValues.email);
            setFirstName(user.profile.firstName);
            setLastName(user.profile.lastName);
            setCity(user.profile.city);
            setCountry(user.profile.country);
            setPostalcode(user.profile.pinCode);
            setAboutme(user.aboutme);
          }
        })
        .catch((error) => {
          alert(error);
        });
  };

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
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Username"
                      id="username"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
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
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    >
                      <option value="" disabled>
                        --Choose city--
                      </option>
                      <option>{city}</option>
                      <option> Mumbai</option>
                      <option>Bangalore</option>
                      <option>Karnataka</option>
                      <option>Gurgaon</option>
                      <option>Chandigarh</option>
                      <option>Ludhiana</option>
                      <option>Amritsar</option>
                      <option> New York</option>
                      <option>Los Angeles</option>
                      <option> Chicago</option>
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
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                    >
                      <option value="" disabled>
                        --Choose Country--
                      </option>
                      <option>{country}</option>
                      <option>India</option>
                      <option>America</option>
                      <option>Canada</option>
                      <option>Italy</option>
                      <option>Japan</option>
                    </select>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Postal Code"
                      id="postal-code"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={postalcode}
                      onChange={(e) => {
                        setPostalcode(e.target.value);
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA" }}>
                      About me
                    </InputLabel>
                    <CustomInput
                      id="about-me"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,
                      }}
                      value={aboutme}
                      onChange={(e) => {
                        setAboutme(e.target.value);
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              {/*<CardFooter>*/}
              {/*  <Button*/}
              {/*    color="primary"*/}
              {/*    type="submit"*/}
              {/*    disabled={submitting || invalid}*/}
              {/*  >*/}
              {/*    Update Profile*/}
              {/*  </Button>*/}
              {/*  <LoadingSpinner show={props.isLoading} />*/}
              {/*</CardFooter>*/}
            </form>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>{email}</h6>
              <h4 className={classes.cardTitle}>{firstname} {lastName}</h4>
              <p className={classes.description}>{aboutme}</p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

UserProfile.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
};
