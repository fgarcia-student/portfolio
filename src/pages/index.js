import React from "react"
import styled from "styled-components"
import CircularProgress from '@material-ui/core/CircularProgress'
import Divider from "@material-ui/core/Divider"

import Layout from "../layout/Layout"
import ProjectListItem from "../components/ProjectListItem"
import SelectedProject from "../components/SelectedProject"

export const ListWrapper = styled.div`
    display: flex;
    height: 33rem;
    min-height: 33rem;
    flex-wrap: wrap;
    overflow-y: auto;
    justify-content: center;
    align-items: center;
    margin: 1rem;
`;

const SelectedProjectWrapper = styled.div`
    display: flex;
    min-height: 25rem;
    justify-content: space-evenly;
    align-items: center;
    padding: 1rem;
`;

const sortByDateModifiedWithNullLast = (a, b) => {
    if (!a.homepage) return 1;
    else if (!b.homepage) return -1;
    else if (new Date(a.pushed_at) > new Date(b.pushed_at)) return -1;
    else if (new Date(a.pushed_at) < new Date(b.pushed_at)) return 1;
    return 0;
}

const PROJECTS = "https://api.github.com/users/fgarcia-student/repos";

class Projects extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hoveredProject: null,
            selectedProject: null,
            projects: [],
            loading: false
        }
    }

    handleLoad = () => {
        this.setState({ loading: false });
    }

    componentDidMount() {
        fetch(PROJECTS)
        .then(res => res.json())
        .then(unorderedProjects => {
            if (unorderedProjects.length > 0) {
                const projects = unorderedProjects.sort(sortByDateModifiedWithNullLast);
                this.setState({ projects, hoveredProject: projects[0] })
            }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedProject && this.state.selectedProject) {
            if (prevState.selectedProject.id !== this.state.selectedProject.id) {
                this.setState({ loading: true });
            }
        }
    }

    render() {
        return (
            <Layout>
                <ListWrapper>
                    {this.state.projects.length === 0 && <CircularProgress /> }
                    {
                        this.state.projects.length > 0 &&
                        this.state.projects
                        .map(project => 
                            <ProjectListItem
                                key={project.id}
                                project={project}
                                isHovering={project === this.state.hoveredProject}
                                isSelected={project === this.state.selectedProject}
                                onHover={() => this.setState({ hoveredProject: project })}
                                onHoverExit={() => this.setState({ hoveredProject: null })}
                                onClick={() => this.setState({ hoveredProject: project, selectedProject: project })}
                            />
                        )
                    }
                </ListWrapper>
                <Divider variant="middle" />
                <SelectedProjectWrapper>
                    {this.state.selectedProject === null && "Select a project to preview..."}
                    {
                        this.state.selectedProject != null &&
                        <SelectedProject project={this.state.selectedProject} loading={this.state.loading} handleLoad={this.handleLoad} />
                    }
                </SelectedProjectWrapper>
            </Layout>
        )
    }
}

export default Projects;