import styled from 'styled-components';

import { LayoutFooter } from '@/components/layout/layout-footer';

type Props = { className?: string };

export const LandingLeft = ({ className }: Props) => {
  return (
    <Wrapper className={className}>
      <HeadSection>
        <Logo src="/logo.png" />
        <h1>SNUTT: 서울대학교 시간표</h1>
        <DownloadWrapper>
          <DownloadLink
            target="_blank"
            href="https://play.google.com/store/apps/details?id=com.wafflestudio.snutt2.live&hl=ko&gl=US&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
          >
            <DownloadImage
              alt="다운로드하기 Google Play"
              src="https://play.google.com/intl/en_us/badges/static/images/badges/ko_badge_web_generic.png"
            />
          </DownloadLink>
          <DownloadLink
            target="_blank"
            href="https://apps.apple.com/us/app/snutt-%EC%84%9C%EC%9A%B8%EB%8C%80%ED%95%99%EA%B5%90-%EC%8B%9C%EA%B0%84%ED%91%9C-%EC%95%B1/id1215668309?itsct=apps_box_badge&amp;itscg=30200"
          >
            <DownloadImage
              src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/ko-kr?size=250x83&amp;releaseDate=1511049600"
              alt="Download on the App Store"
            />
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Logo = styled.img`
  width: 160px;
`;

const DownloadWrapper = styled.div`
  display: flex;
  gap: 20px;
  height: 80px;
`;

const DownloadLink = styled.a`
  width: 200px;
  display: flex;
  align-items: center;
`;

const DownloadImage = styled.img`
  width: 100%;
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
