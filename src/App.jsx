import { useState, useRef } from "react";
import style from "@emotion/styled";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ReplayIcon from "@mui/icons-material/Replay";
import logo from "./logo.png";
import axios from "axios";

const Hero = style.div`
  font-family: roboto;
`;

const Section = style(Container)`
`;

const Nav = style.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 1rem 0;
  @media (max-width:800px){
    &{
      flex-direction: column;
    }
  }
  `;
const Searchbox = style.div`
  display: flex; 
  margin-right: 1rem;
  align-items: center;
  min-width: 50.3333%;
  border: 0.1rem solid #d1d1d1;
  border-radius: .4rem;
  outline: 0;
  color: black;
  background: transparent;
  height: 2.5rem;
  &:hover{
    border-color: red;
  }
  @media (max-width:800px){
    &{
      margin-right: 0;
    }
  }

`;

const Input = style(InputBase)`
  font-size: 15px;
  line-height: 1.15;
`;

function Intro() {
  const Main = style.div`
    margin-top: 4rem;
    line-height: 2rem;
    @media (max-width:800px){
      &{
        padding:0;
        margin:0;
        line-height: 1.8rem;
      }
    }
  `;

  const Contain = style(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    @media (max-width:800px){
      &{
        padding:0;
        margin:0;
      }
    }
  `;

  const Ul = style.ul`
    margin: 0;
  `;

  const H2 = style.h2`
    font-weight:300;
    @media (max-width:800px){
      &{
        font-size: 21px;
        text-align:center;
      }
    }
  `;

  const H3 = style.h3`
  margin-top:5rem;
  @media (max-width:800px){
    &{
      margin-top: 1rem;
    }
  }
  `;

  return (
    <Main>
      <Contain>
        <H2>
          Alerts are generated for the following changes to your validator set:
        </H2>
        <Ul>
          <li>Staked validator uptime percentage falls by &gt; 0.25% </li>
          <li>Staked validator node runner deregisters their validator</li>
          <li>Staked validator fee increases by any amount</li>
        </Ul>
        <H3>To enable Alerts:</H3>
        <ol style={{ margin: "0" }}>
          <li>
            Open the Telegram Bot here{" "}
            <mark style={{ backgroundColor: "white", fontWeight: 600 }}>
              @RadixPortfolioAlerts
            </mark>{" "}
          </li>
          <li>
            Send{" "}
            <mark style={{ backgroundColor: "white", fontWeight: 600 }}>
              /Start
            </mark>{" "}
            to this bot to retrieve a link to add your address for monitoring
          </li>
          <li>Click the link provided by the bot to register your address</li>
        </ol>
      </Contain>
    </Main>
  );
}

function getJSX(alertsHTML, alerts, start, end) {
  for (var index = start; index <= end; index++) {
    const temp = [];
    let tempKey = 0;
    for (let key in alerts[index]) {
      tempKey++;
      if (key === "validator") {
        continue;
      }
      temp.push(
        <li key={tempKey}>
          {key} : {alerts[index][key]}
        </li>
      );
    }
    temp.push(
      <li
        key={tempKey++}
        style={{
          wordWrap: "anywhere",
        }}
      >
        validator : {alerts[index]["validator"]}
      </li>
    );
    alertsHTML.push(
      <ul
        key={index}
        style={{
          textAlign: "center",
          listStyle: "none",
          padding: "0",
          lineHeight: "1.5rem",
        }}
      >
        {temp}
      </ul>
    );
  }
  return index;
}

function DispalyAlerts(value) {
  const Alerts = style.div`
    margin: auto;
  `;

  const Container = style.div`
    background-color: #f9f9f9;
    position: relative;
    border-radius: 1rem;
    width: 80%;
    margin: auto;
    margin-top: 1rem;
    padding: 1rem 0;
    line-height: 2rem;
    min-height: 75vh;
    @media (max-width:800px){
      &{
        min-width: 100%;
        border-radius: 0.8rem;
        min-height: 65vh;
      }
    }
  `;

  const H2 = style.h2`
    font-weight:300;
    text-align:center;
    line-height: 3rem;
    @media (max-width:800px){
      &{
        font-size: 21px;
        text-align:center;
        line-height:1.8rem;
      }
    }
  `;

  const P = style.p`
    background-color: #f9f9f9;
    font-weight: 400;
    word-wrap: anywhere;
    text-align:center;
    @media (max-width:800px){
      &{
        line-height:1.8rem;
      }
    }
  `;

  function NoAlerts() {
    let text = "Currently there no alerts for searched address: ";

    if (value.status === 204) {
      text =
        "Oops! Invalid address entered. Please check the address and try again.";
    }

    return (
      <Alerts>
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ maxWidth: "600px", padding: "1rem" }}>
            <H2
              style={{
                textAlign: "center",
                fontWeight: "300",
              }}
            >
              {text}
            </H2>
            <P>{value.address}</P>
          </div>
        </Container>
      </Alerts>
    );
  }
  let AlertsJsx = [];

  function AlertsExist() {
    const ButtonStyle = style(Button)`
    margin: 0;
    position: relative;
    bottom: 5%;
    left: 50%;
    transform: translate(-50%, -50%);
    `;
    const [startIndex, setStartIndex] = useState(0);

    let previousIndex = getJSX(
      AlertsJsx,
      value.alerts,
      startIndex,
      startIndex + 4 > value.alerts.length - 1
        ? value.alerts.length - 1
        : startIndex + 4
    );

    function getStartIndex() {
      if (previousIndex >= value.alerts.lenght) {
      } else {
        setStartIndex(previousIndex);
      }
    }

    return (
      <Alerts>
        <Container>
          <div style={{ padding: "0 1rem" }}>
            <h3 style={{ textAlign: "center", fontWeight: "300" }}>
              Current alerts for searched address:{" "}
            </h3>
            <P>{value.address}</P>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "1rem",
            }}
          >
            {AlertsJsx}
          </div>
          <ButtonStyle
            variant="outlined"
            startIcon={<ReplayIcon />}
            disabled={(() => {
              if (previousIndex >= value.alerts.length) return true;
              return false;
            })()}
            onClick={getStartIndex}
          >
            Load More
          </ButtonStyle>
        </Container>
      </Alerts>
    );
  }

  return value.alerts ? <AlertsExist /> : <NoAlerts />;
}

function App() {
  const [Display, setDiplay] = useState(<Intro />);
  const input = useRef(null);
  const search = useRef(null);

  function getAlerts() {
    const address = input.current.value.trim();
    if (address !== "") {
      axios.post("/api/getAlerts", { address: address }).then((value) => {
        const data = value.data
          ? value.data
          : { address: address, status: value.status };
        setDiplay(<DispalyAlerts {...data} />);
      });
    }
  }

  return (
    <Hero>
      <Section>
        <Nav>
          <a to="/">
            <img src={logo} alt="logo" />
          </a>
          <Searchbox>
            <Input
              sx={{ ml: 1, flex: 1 }}
              inputRef={input}
              inputProps={{
                onKeyPress: (e) => {
                  if (e.key === "Enter") {
                    search.current.click();
                  }
                },
              }}
              placeholder="Enter Your Address"
            />
            <IconButton
              type="submit"
              sx={{ p: "10px" }}
              onClick={getAlerts}
              aria-label="search"
              ref={search}
            >
              <SearchIcon style={{ color: "black" }} />
            </IconButton>
          </Searchbox>
        </Nav>
        {Display}
      </Section>
    </Hero>
  );
}

export default App;
