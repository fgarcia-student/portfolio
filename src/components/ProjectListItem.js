import React from "react"
import styled, { keyframes } from "styled-components"
import MuiCard from '@material-ui/core/Card'
import MuiCardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import MuiButton from '@material-ui/core/Button'

const Card = styled(MuiCard)`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: inherit;
    height: inherit;
    min-width: inherit;
    min-height: inherit;
`;


const Actions = styled.div`
    display: flex;
    & > :not(:last-child) {
        border-radius: 0;
        border-right: 1px solid #AAA !important;
    }
`;

const CardActionArea = styled(MuiCardActionArea)`
    flex: 1;
`;

const Button = styled(MuiButton)`
    flex: 1;
`;

const pendingSelection = keyframes`
    0%,100% {
        transform: scale(1.03);
    }

    50% {
        transform: scale(1.07);
    }
`;

const HoverSelection = styled.div`
    box-sizing: ${(props) => props.isSelected ? "content-box" : "inherit"};
    position: absolute;
    width: inherit;
    height: inherit;
    min-width: inherit;
    min-height: inherit;
    margin-bottom: ${(props) => props.isSelected ? "2rem" : "unset"};
    border: ${(props) => props.isHovering && !props.isSelected ? "1.5rem solid black" : "0"};
    border-image: url('https://i.stack.imgur.com/1WlsT.png') 30% repeat;
    border-bottom: ${(props) => props.isSelected || props.isHovering ?  "1.5rem solid black" : "0"};
    animation: ${(props) => props.isHovering && !props.isSelected ? pendingSelection : ""} 1s infinite;
    cursor: pointer;
`;

const ProjectListItemWrapper = styled.div`
    position: relative;
    width: 20rem;
    height: 20rem;
    min-width: 20rem;
    min-height: 20rem;
    margin: 1rem;
`;

function ProjectListItem({ project, ...props }) {
    return (
        <ProjectListItemWrapper
            onClick={props.onClick}
            onMouseEnter={props.onHover}
            onMouseLeave={props.onHoverExit}
        >
            <HoverSelection
                isHovering={props.isHovering}
                isSelected={props.isSelected}
            />
            <Card>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h5">
                            {project.full_name}
                        </Typography>
                        <Typography component="p">
                            {project.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <Actions>
                    <Button onClick={() => window.open(project.html_url, "_blank")}>Github</Button>
                    <Button disabled={!project.homepage} onClick={() => window.open(project.homepage, "_blank")}>Site</Button>
                </Actions>
            </Card>
        </ProjectListItemWrapper>
    )
}

export default ProjectListItem;