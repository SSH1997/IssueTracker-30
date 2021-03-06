import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

import host from "../../config.js"

const StyledDropDownMenu = styled.div`
    width: 150px;

    &:hover {
        cursor: pointer;
    }
`;

const StyledModalBackground = styled.div`
    display: ${(props) => props.isVisible};
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;

    &:hover {
        cursor: default;
    }
`;

const StyledMenuTitle = styled.div`
    position: relative;
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 100;
    &:before {
        content: "${(props) => props.title} ▼";
    }
`;

const StyledMenuContent = styled.div`
    display: ${(props) => props.isVisible};
    position: absolute;
    top: 30px;
    width: 250px;
    height: fit-content;
    max-height: 300px;
    z-index: 3;
    background-color: white;
    overflow: auto;
    box-shadow: 0 0 2px 0 grey;
    border-radius: 5px;
`;

const StyledMenuUl = styled.ul`
    list-style: none;
    margin: 0;
    padding: 2% 0%;
    font-size: 14px;
`;

const StyledMenuUlHead = styled.div`
    padding: 2% 0 3% 5%;
    font-weight: bold;
    text-align: left;
`;

const StyledMenuLiNotUse = styled.div`
    border-top: 1px solid lightgray;
    padding: 3% 5%;
    display: ${(props) => (props.type !== "Author" ? "block" : "none")};

    &:hover {
        background-color: #eceff1;
    }
`;

const StyledMenuLi = styled.li`
    border-top: 1px solid lightgray;
    padding: 3% 0%;
    text-align: center;
    display: flex;
    justify-content: end;
    align-items: center;

    &:hover {
        background-color: #eceff1;
    }

    p {
        margin: 0 0 0 5%;
    }
`;

const StyledMediaSection = styled.div`
    display: ${(props) => (props.mediaSection ? "block" : "none")};

    ${(props) => {
        switch (props.mediaType) {
            case "Label":
                return {
                    backgroundColor: props.media,
                    width: "20px",
                    height: "20px",
                    borderRadius: "65%",
                    marginLeft: "5%",
                };
            case "Milestone":
                return {};
            case "MarkAs":
                return {};
        }
    }}
`;

const StyledUserImage = styled.img`
    width: 20px;
    margin-left: 5%;
    box-shadow: 0 0 2px 0px black;
    border-radius: 3px;
    display: ${(props) => (props.src ? "block" : "none")};
`;

const DropDownMenu = (props) => {
    const [menuVisibility, setMenuVisibility] = useState("none");
    const addOptionToTextInput = (e) => {
        if (props.name === "MarkAs") {
            const axiosFuncArr = [];
            props.checkedIssue.forEach((v) => {
                axiosFuncArr.push(
                    axios.put(
                        `http://${host}:3000/issue`,
                        {
                            mode: 4,
                            issueId: v,
                            status: e.target.innerText === "Open" ? 1 : 0,
                        },
                        { withCredentials: true }
                    )
                );
            });
            axios
                .all(axiosFuncArr)
                .then(
                    axios.spread((...responses) => {
                        document.location = "/";
                    })
                )
                .catch((errors) => {
                    // errors
                });
            return;
        }
        const currentOption = e.currentTarget.dataset.name;
        const addOption = props.addOptionToTextInput;
        addOption(`${props.name.toLowerCase()}:${currentOption}`);
    };

    const handleMenuVisibility = () => {
        if (menuVisibility === "none") {
            setMenuVisibility("block");
        } else {
            setMenuVisibility("none");
        }
    };

    let mediaSection = true;

    if (props.name === "Milestones") {
        mediaSection = false;
    }

    return (
        <StyledDropDownMenu onClick={handleMenuVisibility}>
            <StyledModalBackground
                isVisible={menuVisibility}
                onClick={handleMenuVisibility}
            ></StyledModalBackground>
            <StyledMenuTitle title={props.name}>
                <StyledMenuContent isVisible={menuVisibility}>
                    <StyledMenuUl>
                        {props.name === "MarkAs" ? (
                            <StyledMenuUlHead>Actions</StyledMenuUlHead>
                        ) : (
                            <StyledMenuUlHead>
                                Filter by {props.name}
                            </StyledMenuUlHead>
                        )}
                        <StyledMenuLiNotUse
                            data-name="notUse"
                            type={props.name}
                            onClick={addOptionToTextInput}
                        >
                            {props.notUseTitle}
                        </StyledMenuLiNotUse>
                        {props.dataArray.map((element) => (
                            <StyledMenuLi
                                data-name={element.value}
                                key={element.key}
                                onClick={addOptionToTextInput}
                            >
                                <StyledUserImage
                                    src={element.imageUrl}
                                ></StyledUserImage>
                                <StyledMediaSection
                                    mediaSection={mediaSection}
                                    mediaType={props.name}
                                    media={element.media}
                                ></StyledMediaSection>
                                <p>{element.value}</p>
                            </StyledMenuLi>
                        ))}
                    </StyledMenuUl>
                </StyledMenuContent>
            </StyledMenuTitle>
        </StyledDropDownMenu>
    );
};

export default DropDownMenu;
