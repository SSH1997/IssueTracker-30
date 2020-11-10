import React from "react";
import styled from "styled-components";

const StyledEditorWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    width: 100%;
    height: 50px;
    padding: 0 10px;
`;

const StyledEditName = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    width: 200px;
    height: 100%;
    font-weight: bold;
`;

const StyledEditNameInput = styled.input.attrs({
    placeholder: "Label Name",
})`
    width: 98%;
    height: 20px;
`;

const StyledEditDesc = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    width: 380px;
    height: 100%;
    font-weight: bold;
`;

const StyledEditDescInput = styled.input.attrs({
    placeholder: "Description(optional)",
})`
    width: 98%;
    height: 20px;
`;

const StyledEditColor = styled.div`
    display: flex;
    flex-direction: column;

    justify-content: space-between;
    align-items: flex-start;
    width: 100px;
    height: 100%;
    font-weight: bold;
`;

const StyledEditColorInputWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
`;

const StyledEditColorRefreshButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 23px;
    height: 23px;
    border: 0;
    border-radius: 5px;
    background-color: ${(props) => props.color};

    &:hover {
        cursor: pointer;
    }

    &:focus {
        outline: none;
    }
`;

const StyledEditColorInput = styled.input`
    width: 60px;
    height: 98%;
    height: 20px;
`;

const StyledButtonsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 150px;
    height: 100%;
`;

const StyledEmptySpan = styled.span`
    font-size: 12px;
`;

const StyledButtons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledCancelButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    font-size: 12px;

    height: 25px;
    padding: 0 10px;

    border: 0;
    border-radius: 5px;
    box-shadow: 0 0px 2px 0px rgb(36, 41, 46);

    &:hover {
        cursor: pointer;
    }

    &:focus {
        outline: none;
    }
`;

const StyledCreateButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgb(46, 164, 79);
    color: rgb(255, 255, 255);
    font-size: 12px;

    height: 25px;
    padding: 0 10px;

    border: 0;
    border-radius: 5px;
    box-shadow: 0 0 2px 0 rgba(43, 145, 73, 0.8);

    &:hover {
        cursor: pointer;
    }

    &:focus {
        outline: none;
    }
`;

const LabelEditor = ({
    contents,
    setContents,
    getRandomColor,
    setIsNewAreaVisible,
}) => {
    const { name, desc, color } = contents;

    const onNameInputChange = (e) => {
        setContents({ ...contents, name: e.currentTarget.value });
    };

    const onDescInputChange = (e) => {
        setContents({ ...contents, desc: e.currentTarget.value });
    };

    const onColorInputChange = (e) => {
        setContents({ ...contents, color: e.currentTarget.value });
    };

    const onColorRefreshClick = (e) => {
        setContents({ ...contents, color: getRandomColor });
    };

    const onCancelButtonClick = () => {
        setContents({ name: "Label Preview", desc: "", color: getRandomColor });
        setIsNewAreaVisible(false);
    };

    const onCreateLabelClick = () => {
        alert("label 생성 버튼 클릭");
    };

    return (
        <StyledEditorWrapper>
            <StyledEditName>
                Label Name
                <StyledEditNameInput
                    value={name === "Label Preview" ? "" : name}
                    onChange={onNameInputChange}
                />
            </StyledEditName>
            <StyledEditDesc>
                Description
                <StyledEditDescInput
                    value={desc}
                    onChange={onDescInputChange}
                />
            </StyledEditDesc>

            <StyledEditColor>
                Color
                <StyledEditColorInputWrapper>
                    <StyledEditColorRefreshButton
                        color={color}
                        onClick={onColorRefreshClick}
                    >
                        <svg
                            viewBox="0 0 16 16"
                            version="1.1"
                            width="15"
                            height="15"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 2.5a5.487 5.487 0 00-4.131 1.869l1.204 1.204A.25.25 0 014.896 6H1.25A.25.25 0 011 5.75V2.104a.25.25 0 01.427-.177l1.38 1.38A7.001 7.001 0 0114.95 7.16a.75.75 0 11-1.49.178A5.501 5.501 0 008 2.5zM1.705 8.005a.75.75 0 01.834.656 5.501 5.501 0 009.592 2.97l-1.204-1.204a.25.25 0 01.177-.427h3.646a.25.25 0 01.25.25v3.646a.25.25 0 01-.427.177l-1.38-1.38A7.001 7.001 0 011.05 8.84a.75.75 0 01.656-.834z"
                            ></path>
                        </svg>
                    </StyledEditColorRefreshButton>
                    <StyledEditColorInput
                        value={color}
                        onChange={onColorInputChange}
                    />
                </StyledEditColorInputWrapper>
            </StyledEditColor>
            <StyledButtonsWrapper>
                <StyledEmptySpan></StyledEmptySpan>
                <StyledButtons>
                    <StyledCancelButton onClick={onCancelButtonClick}>
                        Cancel
                    </StyledCancelButton>
                    <StyledCreateButton onClick={onCreateLabelClick}>
                        Create Label
                    </StyledCreateButton>
                </StyledButtons>
            </StyledButtonsWrapper>
        </StyledEditorWrapper>
    );
};

export default LabelEditor;