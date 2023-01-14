import styled from 'styled-components';

type Props = {
  className?: string;
  onClickCreate: () => void;
};

export const MainNoTimetable = ({ onClickCreate, ...props }: Props) => {
  return (
    <Wrapper {...props}>
      <Text>시간표를 추가해주세요</Text>
      <CreateButton data-testid="mt-empty-create-timetable" onClick={onClickCreate}>
        추가하기
      </CreateButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.h2`
  opacity: 0.4;
`;

const CreateButton = styled.button`
  margin: 20px 0;
  background-color: #1bd0c8;
  border: none;
  padding: 12px 18px;
  cursor: pointer;
  font-size: 16px;
  opacity: 0.6;
  font-weight: 700;
  border-radius: 4px;
  transition: opacity 0.1s;

  &:hover {
    opacity: 0.8;
  }
`;
