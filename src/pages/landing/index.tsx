import styled from 'styled-components';

import { LandingLeft } from './landing-left';
import { LandingRight } from './landing-right';

export const Landing = () => {
  return (
    <Wrapper>
      <Left />
      <Right />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
`;

const Left = styled(LandingLeft)`
  flex: 1;
  overflow-y: auto;
`;

const Right = styled(LandingRight)`
  width: 428px;
`;
