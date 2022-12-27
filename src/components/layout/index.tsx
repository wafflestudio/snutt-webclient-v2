import { useQuery } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { IcLogo } from '@/components/icons/ic-logo';
import { BREAKPOINT } from '@/styles/constants';
import { semesterService } from '@/usecases/semesterService';

export const Layout = ({ children }: PropsWithChildren<unknown>) => {
  const { data: courseBooks } = useCourseBooks();
  const [searchParams, setSearchParams] = useSearchParams();

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
            {courseBooks && courseBooks.length > 0 && (
              <select
                data-testid="course-book-select"
                value={
                  searchParams.get('year') && searchParams.get('semester')
                    ? semesterService.courseBookToValue({
                        year: Number(searchParams.get('year')),
                        semester: Number(searchParams.get('semester')) as 1 | 2 | 3 | 4,
                      })
                    : semesterService.courseBookToValue(courseBooks[0])
                }
                onChange={(e) =>
                  onChangeBook(semesterService.valueToCourseBook(e.target.value as `${number}-${1 | 2 | 3 | 4}`))
                }
              >
                {courseBooks.map((cb, i) => (
                  <option key={i} value={semesterService.courseBookToValue(cb)}>
                    {semesterService.courseBookToLabel(cb)}
                  </option>
                ))}
              </select>
            )}
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
