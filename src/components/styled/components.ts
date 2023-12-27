import styled from 'styled-components';

export const MainHeader = styled.h1`
  text-align: left;
  color: #eaeaea;
  margin-top: 8px;
  cursor: pointer;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(66, 66, 66, 0.5);
`;

export const StyledAppContainer = styled.div<{ background: string }>`
  background-image: ${props =>
    props.background
      ? `
    linear-gradient(
      rgba(36, 34, 36, 0.85),
      #151515
    ), url(${props.background})
    `
      : 'none'};
  height: 100%;
  background-color: #151515;
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;

  width: 100%;
  margin: 0 auto;
  padding: 1rem 2rem 2rem 2rem;
  #main {
    color: #f0f0f0;
  }
`;

export const StyledSearchResultCard = styled.div<{ background: string }>`
  background-image: linear-gradient(
      135deg,
      rgba(71, 64, 75, 0.5),
      rgba(0, 0, 0, 1)
    ),
    ${props => props.background};
  background-size: cover;
  background-position: center;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 4px;
  border: 1px solid rgba(66, 66, 66, 1);
  box-sizing: border-box;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  &:not(.no-click) {
    &:hover {
      cursor: pointer;
      transform: scale(1.05);
      transition: transform 0.2s;
    }
  }
  span {
    font-size: 1.5em;
    color: #eaeaea;
    @media (max-width: 768px) {
      font-size: 1.25em;
    }
  }
`;

export const PersonContainer = styled.div`
  padding-bottom: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .profile {
    max-height: 500px;
    max-width: 350px;
    border-radius: 4px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }
  .info p {
    font-size: 1.1em;
    font-weight: 600;
    color: #eaeaea;
  }
`;

export const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  span {
    font-size: 0.9em;
    color: #eaeaea;
    &.review-author {
      font-weight: 600;
      margin-right: 8px;
    }
    &.review-score {
      font-weight: 400;
    }
  }
`;

export const MovieContainer = styled.div`
  padding-bottom: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .poster {
    max-height: 500px;
    max-width: 350px;
    border-radius: 4px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }
  .info p {
    font-size: 1.1em;
    font-weight: 600;
    color: #eaeaea;
    &.genres span {
      &:first-child {
        margin-left: 8px;
      }
      border-radius: 4px;
      border: 1px solid rgb(82, 82, 82);
      margin: 0 2px;
      padding: 0 2px;
      padding-right: 6px;
      font-size: 0.85em;
      box-sizing: border-box;
    }
    .score {
      font-weight: 700;
    }
    .votes {
      font-size: 0.85em;
      font-weight: 400;
    }
  }
`;

export const SubScrollContainer = styled.div`
  max-height: 610px;
  width: 85%;
  @media (max-width: 768px) {
    width: 90%;
  }
  overflow-y: scroll;
  .pre-wrap {
    white-space: pre-wrap;
  }
`;
