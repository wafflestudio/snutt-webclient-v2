import styled from 'styled-components';

import { LayoutFooter } from '@/components/layout/layout-footer';

type Props = { className?: string };

export const LandingLeft = ({ className }: Props) => {
  return (
    <Wrapper className={className}>
      <HeadSection>
        <Logo />
        <h1>SNUTT: 서울대학교 시간표</h1>
        <DownloadWrapper>
          <DownloadLink>
            <DownloadImage src="https://everytime.kr/images/about/playstore.png" />
          </DownloadLink>
          <DownloadLink>
            <DownloadImage src="https://everytime.kr/images/about/appstore.png" />
          </DownloadLink>
        </DownloadWrapper>
      </HeadSection>
      <ContentSection $background>
        <h2>쉬운 시간표</h2>
        <div>
          <ContentArticle>
            <h3>태그로 빠르게 검색해요</h3>
            <p>학년, 학점, 교수 등 원하는 대로 검색해 보세요!</p>
            <img src="https://github.com/wafflestudio/snutt-webclient-v2/assets/39977696/ceb3ce75-ec4d-4213-b389-96eb9e1f3c38" />
          </ContentArticle>
          <ContentArticle>
            <h3>위젯에서 바로 확인해요</h3>
            <p>가장 보기 편한 곳에 시간표를 둘 수 있어요</p>
            <img src="https://github.com/wafflestudio/snutt-webclient-v2/assets/39977696/b4fe5515-7189-4360-97dd-e48b8e3ce695" />
          </ContentArticle>
        </div>
      </ContentSection>
      <ContentSection $background={false}>
        <h2>가장 빠르게</h2>
        <div>
          <ContentArticle>
            <h3>수강편람이 변경되었어요</h3>
            <p>수강편람이 업데이트되면 가장 먼저 알려드려요</p>
            <img src="https://github.com/wafflestudio/snutt-webclient-v2/assets/39977696/47686370-d6f7-40f3-9f38-0659f02b959b" />
          </ContentArticle>
          <ContentArticle>
            <h3>자리났다</h3>
            <p>빈자리알림 개꿀</p>
            <img src="https://github.com/wafflestudio/snutt-webclient-v2/assets/39977696/47686370-d6f7-40f3-9f38-0659f02b959b" />
          </ContentArticle>
        </div>
      </ContentSection>
      <ContentSection $background>
        <h2>친구들과 함께</h2>
        <div>
          <ContentArticle>
            <h3>친구들과 시간표를 공유해요</h3>
            <p>친구는 영어로 친구</p>
            <img src="https://github.com/wafflestudio/snutt-webclient-v2/assets/39977696/47686370-d6f7-40f3-9f38-0659f02b959b" />
          </ContentArticle>
          <ContentArticle>
            <h3>같이 수업 듣고 밥 먹을 친구</h3>
            <p>냠냠</p>
            <img src="https://github.com/wafflestudio/snutt-webclient-v2/assets/39977696/ceb3ce75-ec4d-4213-b389-96eb9e1f3c38" />
          </ContentArticle>
        </div>
      </ContentSection>
      <LayoutFooter />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #ffffff;
`;

const HeadSection = styled.section`
  padding: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img.attrs({ src: 'https://snutt.wafflestudio.com/logo.png' })`
  width: 160px;
`;

const DownloadWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const DownloadLink = styled.a`
  padding: 10px 20px;
  height: 50px;
  width: 160px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  cursor: pointer;
`;

const DownloadImage = styled.img`
  height: 100%;
`;

const ContentSection = styled.section<{
  $background: boolean;
}>`
  height: 1000px;
  padding: 80px 50px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 70px;
  font-weight: 700;

  &::before {
    position: absolute;
    content: ${({ $background }) => ($background ? `''` : 'none')};
    background-image: url(https://github.com/wafflestudio/snutt-webclient-v2/assets/39977696/d01394f3-4f85-4902-b479-cf31b9cd7dc6);
    background-size: cover;
    inset: 0;
    opacity: 0.1;
  }

  & > h2 {
    margin: 0;
    font-size: 30px;
  }

  & > div {
    display: flex;
    flex: 1;
    gap: 120px;
  }
`;

const ContentArticle = styled.article`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > h3 {
    margin: 0;
    font-size: 20px;
  }

  & > p {
    margin-top: 20px;
    font-weight: 400;
    color: #7a7a7a;
    font-size: 16px;
  }

  & > img {
    width: 100%;
    z-index: 2;
  }
`;
