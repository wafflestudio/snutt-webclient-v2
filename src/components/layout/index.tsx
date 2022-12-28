import { PropsWithChildren } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { IcLogo } from '@/components/icons/ic-logo';
import { useCourseBooks } from '@/hooks/useCourseBooks';
import { useYearSemester } from '@/hooks/useYearSemester';
import { BREAKPOINT } from '@/styles/constants';
import { semesterService } from '@/usecases/semesterService';

import { LayoutSearchbar } from './layout-searchbar';

export const Layout = ({ children }: PropsWithChildren<unknown>) => {
  const { data: courseBooks } = useCourseBooks();
  const [searchParams, setSearchParams] = useSearchParams();
  const { year, semester } = useYearSemester();

  const onChangeBook = ({ year, semester }: { year: number; semester: number }) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('year', `${year}`);
    newParams.set('semester', `${semester}`);
    setSearchParams(newParams);
  };

  return (
    <div>
      <Header>
        <HeaderInner>
          <HeaderLeft>
            <HomeLink to="/">
              <IcLogo />
              <Title>SNUTT</Title>
            </HomeLink>
            {year && semester && (
              <select
                data-testid="course-book-select"
                value={semesterService.courseBookToValue({ year, semester })}
                onChange={(e) =>
                  onChangeBook(semesterService.valueToCourseBook(e.target.value as `${number}-${1 | 2 | 3 | 4}`))
                }
              >
                {courseBooks?.map((cb, i) => (
                  <option key={i} value={semesterService.courseBookToValue(cb)}>
                    {semesterService.courseBookToLabel(cb)}
                  </option>
                ))}
              </select>
            )}
          </HeaderLeft>
          <LayoutSearchbar />
        </HeaderInner>
      </Header>
      <Main>{children}</Main>
    </div>
  );
};

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
  display: flex;
  align-items: center;

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
