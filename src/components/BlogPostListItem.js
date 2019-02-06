import React from "react"
import styled from "styled-components"
import MuiTypography from '@material-ui/core/Typography'


const ItemWrapper = styled.div`
    border: 1px solid black;
    border-radius: 3px;
    padding: 1rem;
    margin-bottom: 1rem;
    min-height: 20rem;
    cursor: pointer;
    transition: all .2s ease-in;
    &:hover {
        background-color: #EAEAEA;
    }
`;
const Title = styled(MuiTypography)`
    float: left;
`;
const Author = styled(MuiTypography)`
    float: right;
`;
const Date = styled(MuiTypography)`
    clear: both;
`;
const TagWrapper = styled.div`
    display: flex;
`;
const Tag = styled(MuiTypography)`
    margin: .5rem !important;
    margin-left: 0 !important;
    padding: .5rem;
    border: 1px solid black;
    border-radius: 3px;
    background-color: #FFF;
    transition: all .2s ease-in;
    &:hover {
        background-color: #CCC;
    }
`;
const Content = styled(MuiTypography)``;

const createTagElements = (tag) => (
    <Tag key={tag}>{tag}</Tag>
);

function BlogPostListItem({ post, name }) {
    const tags = Array(...post.tags).map(createTagElements);
    return (
        <ItemWrapper>
            <Title gutterBottom variant="h3" component="div">{post.title}</Title>
            <Author gutterBottom variant="h4" component="div">{name}</Author>
            <Date gutterBottom variant="h5" component="div">{post.date}</Date>
            <TagWrapper>{tags}</TagWrapper>
            <Content gutterBottom variant="h5" component="div">{post.content}</Content>
        </ItemWrapper>
    );
}

export default BlogPostListItem;