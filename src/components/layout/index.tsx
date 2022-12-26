import { useQuery } from '@tanstack/react-query';
import { PropsWithChildren, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { IcLogo } from '@/components/icons/ic-logo';
import { BREAKPOINT } from '@/styles/constants';
import { semesterService } from '@/usecases/semesterService';

export const Layout = ({ children }: PropsWithChildren<unknown>) => {
  const { data: courseBooks } = useCourseBooks();
  const [bookIndex, setBookIndex] = useState(0);

  return (
    <div>
      <Header>
        <HeaderInner>
          <HeaderLeft>
            <HomeLink to="/">
              <IcLogo />
              <Title>SNUTT</Title>
            </HomeLink>
            <select
              data-testid="course-book-select"
              value={bookIndex}
              onChange={(e) => setBookIndex(Number(e.target.value))}
            >
              {courseBooks?.map((cb, i) => (
                <option key={i} value={i}>
                  {semesterService.getCourseBookLabel(cb)}
                </option>
              ))}
            </select>
          </HeaderLeft>
        </HeaderInner>
      </Header>
      <Main>{children}</Main>
    </div>
  );
};

const useCourseBooks = () =>
  useQuery(['course_books'], () => semesterService.getCourseBooks(), { staleTime: Infinity });

const Header = styled.header`
  height: 120px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding: 20px;
`;

const HeaderInner = styled.div`
  margin: 0 auto;
  width: 100%;

  max-width: ${BREAKPOINT}px;

  @media (max-width: ${BREAKPOINT}px) {
    max-width: 700px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
`;

const HomeLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 18px;
  margin-left: 8px;
  margin-right: 10px;
  color: black;
  text-size-adjust: 100%;
`;

const Main = styled.main`
  max-width: ${BREAKPOINT}px;
  margin: 0 auto;
`;
