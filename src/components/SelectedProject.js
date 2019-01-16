import React from "react"
import styled from "styled-components"
import { Typography } from "@material-ui/core";

const ThumbnailWrapper = styled.div`
    position: relative;
    margin: 1rem;
    overflow: hidden;
    width: calc(144rem * 0.25);
    height: calc(90rem * 0.25);
    background: #f9f9f9;

    &:before {
        position: absolute;
        left: 45%;
        top: 45%;
        opacity: 0.2;
        display: block;
        transform: scale(2);

        content: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIiBoZWlnaHQ9IjMycHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnIGlkPSJwaG90b18xXyI+PHBhdGggZD0iTTI3LDBINUMyLjc5MSwwLDEsMS43OTEsMSw0djI0YzAsMi4yMDksMS43OTEsNCw0LDRoMjJjMi4yMDksMCw0LTEuNzkxLDQtNFY0QzMxLDEuNzkxLDI5LjIwOSwwLDI3LDB6ICAgIE0yOSwyOGMwLDEuMTAyLTAuODk4LDItMiwySDVjLTEuMTAzLDAtMi0wLjg5OC0yLTJWNGMwLTEuMTAzLDAuODk3LTIsMi0yaDIyYzEuMTAyLDAsMiwwLjg5NywyLDJWMjh6IiBmaWxsPSIjMzMzMzMzIi8+PHBhdGggZD0iTTI2LDRINkM1LjQ0Nyw0LDUsNC40NDcsNSw1djE4YzAsMC41NTMsMC40NDcsMSwxLDFoMjBjMC41NTMsMCwxLTAuNDQ3LDEtMVY1QzI3LDQuNDQ3LDI2LjU1Myw0LDI2LDR6ICAgIE0yNiw1djEzLjg2OWwtMy4yNS0zLjUzQzIyLjU1OSwxNS4xMjMsMjIuMjg3LDE1LDIyLDE1cy0wLjU2MSwwLjEyMy0wLjc1LDAuMzM5bC0yLjYwNCwyLjk1bC03Ljg5Ni04Ljk1ICAgQzEwLjU2LDkuMTIzLDEwLjI4Nyw5LDEwLDlTOS40NCw5LjEyMyw5LjI1LDkuMzM5TDYsMTMuMDg3VjVIMjZ6IE02LDE0LjZsNC00LjZsOC4wNjYsOS4xNDNsMC41OCwwLjY1OEwyMS40MDgsMjNINlYxNC42eiAgICBNMjIuNzQsMjNsLTMuNDI4LTMuOTU1TDIyLDE2bDQsNC4zNzlWMjNIMjIuNzR6IiBmaWxsPSIjMzMzMzMzIi8+PHBhdGggZD0iTTIwLDEzYzEuNjU2LDAsMy0xLjM0MywzLTNzLTEuMzQ0LTMtMy0zYy0xLjY1OCwwLTMsMS4zNDMtMywzUzE4LjM0MiwxMywyMCwxM3ogTTIwLDhjMS4xMDIsMCwyLDAuODk3LDIsMiAgIHMtMC44OTgsMi0yLDJjLTEuMTA0LDAtMi0wLjg5Ny0yLTJTMTguODk2LDgsMjAsOHoiIGZpbGw9IiMzMzMzMzMiLz48L2c+PC9zdmc+");
    }


    &:after {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
`;

const IFrameWrapper = styled.div`
    position: relative;
    transform: scale(0.25);
    transform-origin: 0 0;
    transition: opacity .2s ease-in;
`;

const IFrame = styled.iframe`
    width: 144rem;
    height: 90rem;
    transition: all .2s ease-in;
`;

const Detail = styled.div`
    display: flex;
    flex-direction: column;
`;

function formatDate(dateString) {
    const date = new Date(dateString);
    if (!isNaN(date)) {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }
    return "-";
}

function SelectedProject({ project, loading, handleLoad }) {
    return (
        <>
            <ThumbnailWrapper>
                <IFrameWrapper style={{ opacity: loading ? 0 : 1 }}>
                    <IFrame id="iframe" src={project.homepage} frameBorder="0" onLoad={handleLoad}></IFrame>
                </IFrameWrapper>
            </ThumbnailWrapper>
            <Detail>
                <Typography variant="h4">Name: {project.name}</Typography>
                <Typography variant="h5">Created: {formatDate(project.created_at)}</Typography>
                <Typography variant="h5">Last Updated: {formatDate(project.updated_at)}</Typography>
            </Detail>
        </>
    )
}

export default SelectedProject;