import React, { useState, useEffect } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import NavBar from "./components/nav-bar.jsx";
import MainSection from "./main-section.jsx";
import Footer from "./components/footer.jsx";
import DetailIssue from "./detailIssue/detail-issue.jsx";
import Labels from "./labels/labels-list.jsx";

const StyledRouter = styled(Router)`
    display: flex;
    flex-direction: column;
`;

const loginCheck = async () => {
    if (document.cookie.split("=")[0] === "user") {
        const mode = await axios({
            method: "POST",
            url: "http://localhost:3000/user/signIn/auth",
            withCredentials: true,
        }).then((res) => {
            localStorage.setItem('userId', res.data.userId);
            if (res.data.message === "success") {
                return "main";
            } else {
                return "login";
            }
        });
        return mode;
    } else {
        return "login";
    }
};

const App = () => {
    const [mode, setMode] = useState("main");

    useEffect(() => {
        loginCheck().then(async (res) => {
            if (res === "main") {
                await axios({
                    method: "GET",
                    url: "http://localhost:3000/issue/",
                    withCredentials: true,
                }).then((issueData) => {
                    localStorage.setItem(
                        "issueData",
                        JSON.stringify(issueData.data)
                    );
                });

                await axios({
                    method: "GET",
                    url: "http://localhost:3000/user/",
                    withCredentials: true,
                }).then((users) => {
                    localStorage.setItem(
                        "usersData",
                        JSON.stringify(users.data)
                    );
                });

                await axios({
                    method: "GET",
                    url: "http://localhost:3000/label/",
                    withCredentials: true,
                }).then((labels) => {
                    localStorage.setItem(
                        "labelsData",
                        JSON.stringify(labels.data)
                    );
                });

                await axios({
                    method: "GET",
                    url: "http://localhost:3000/milestone/",
                    withCredentials: true,
                }).then((milestones) => {
                    localStorage.setItem(
                        "milestonesData",
                        JSON.stringify(milestones.data)
                    );
                });
                setMode("mainForMarkAs");
            } else {
                setMode("login");
            }
        });
    });

    return (
        <StyledRouter>
            <NavBar mode={mode} />
            <Switch>
                <Route path="/new">
                    <MainSection mode="newIssue" />
                </Route>
                <Route path="/detail/:issueId" component={DetailIssue} />
                <Route path="/labels" component={Labels} />
                <Route path="/">
                    <MainSection mode={mode} />
                </Route>
            </Switch>
            <Footer />
        </StyledRouter>
    );
};

export default App;
