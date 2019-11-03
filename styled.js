import styled, { keyframes } from 'styled-components';

const textShadow = keyframes`
  to {
    text-shadow: 0 2px 0 #a0a0a0, 0 4px 0 #989898, 0 6px 0 #909090,
      0 8px 0 #888888, 0 10px 0 #808080, 0 12px 2px rgba(0, 0, 0, 0.1),
      0 0 10px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.3),
      0 6px 10px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.25),
      0 20px 20px rgba(0, 0, 0, 0.2), 0 40px 40px rgba(0, 0, 0, 0.15);
    transform: rotateX(10deg)
  }
`;

export const Title = styled.div`
  perspective: 400px;
  text-align: center;
  h1 {
    animation: ${textShadow} 3s ease infinite alternate;
    font-size: 2.5em;
  }
  h2,
  h3 {
    margin: 1rem;
  }
`;
