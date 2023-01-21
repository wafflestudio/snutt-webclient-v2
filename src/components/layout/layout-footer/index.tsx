import { useState } from 'react';
import styled, { css } from 'styled-components';

import { BREAKPOINT } from '@/styles/constants';
import { envService } from '@/usecases/envService';

import { LayoutFooterFeedbackDialog } from './layout-footer-feedback-dialog';

export const LayoutFooter = () => {
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);

  const baseUrl = envService.getBaseUrl();

  return (
    <Wrapper>
      <Left>
        <SLinkExternal href={`${baseUrl}/member`} target="_blank">
          WaffleStudio SNUTT 팀
        </SLinkExternal>
        <Divider />
        <SLinkExternal href={`https://github.com/wafflestudio/snutt-webclient-v2`} target="_blank">
          SNUTT Github
        </SLinkExternal>
        <Divider />
        <SButton type="button" onClick={() => setFeedbackDialogOpen(true)}>
          개발자 괴롭히기
        </SButton>
      </Left>
      <Right>
        <SLinkExternal href={`${baseUrl}/terms_of_service`} target="_blank">
          약관
        </SLinkExternal>
        <Divider />
        <SLinkExternal href={`${baseUrl}/privacy_policy`} target="_blank">
          개인정보 처리방침
        </SLinkExternal>
      </Right>
      <LayoutFooterFeedbackDialog isOpen={feedbackDialogOpen} onClose={() => setFeedbackDialogOpen(false)} />
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: ${BREAKPOINT}px;
  margin: 30px auto;
  padding: 21px 5px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Right = styled.nav`
  display: flex;
  align-items: center;
`;

const footerItem = css`
  opacity: 0.6;
  font-size: 11px;
  color: #000;
  text-decoration: none;
  padding: 0 10px;
  cursor: pointer;

  &:focus,
  &:hover {
    color: #23527c;
    text-decoration: underline;
  }
`;

const SLinkExternal = styled.a`
  ${footerItem}
`;

const SButton = styled.button`
  ${footerItem}
  background-color: transparent;
  border: none;
`;

const Divider = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  width: 1px;
  height: 100%;
`;
