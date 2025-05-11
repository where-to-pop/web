import { useForm } from 'react-hook-form';
import Button from 'src/components/Button';
import DateInput from 'src/components/DateInput';
import Modal from 'src/components/modal/Modal';
import TextArea from 'src/components/TextArea';
import TextInput from 'src/components/TextInput';
import {
  AGE_RANGES,
  BRAND_SIZES,
  CATEGORIES,
  CATEGORY_TO_TEXT,
  POPUP_TYPE_TO_TEXT,
  POPUP_TYPES,
} from 'src/constants/common.const';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

const NewProjectModal = ({ isOpen, closeModal }: Props) => {
  const { control } = useForm();

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      title='프로젝트 생성하기'
      description='새로운 프로젝트의 기본 정보를 입력해주세요.'
    >
      <div className='flex flex-col gap-24'>
        <TextInput control={control} name='name'>
          브랜드 이름
        </TextInput>
        <div className='flex flex-col gap-12'>
          <label className='block h-20 text-14 font-500'>기간</label>
          <div className='flex items-center gap-8'>
            <DateInput />
            <span className='text-14 font-400 text-grey-700'>~</span>
            <DateInput />
          </div>
        </div>
        <div className='flex flex-col gap-12'>
          <label className='block h-20 text-14 font-500'>카테고리</label>
          <div className='flex gap-8'>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                className='rounded-6 border border-grey-400 px-8 py-[2px] text-14 font-400 text-grey-700'
              >
                {CATEGORY_TO_TEXT[category]}
              </button>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-12'>
          <label className='block h-20 text-14 font-500'>유형</label>
          <div className='flex gap-8'>
            {POPUP_TYPES.map((type) => (
              <button
                key={type}
                className='rounded-6 border border-grey-400 px-8 py-[2px] text-14 font-400 text-grey-700'
              >
                {POPUP_TYPE_TO_TEXT[type]}
              </button>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-12'>
          <label className='block h-20 text-14 font-500'>연령대</label>
          <div className='flex gap-8'>
            {AGE_RANGES.map((ageRange) => (
              <button
                key={ageRange}
                className='rounded-6 border border-grey-400 px-8 py-[2px] text-14 font-400 text-grey-700'
              >
                {ageRange}
              </button>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-12'>
          <label className='block h-20 text-14 font-500'>브랜드 규모</label>
          <div className='flex gap-8'>
            {BRAND_SIZES.map((brandSize) => (
              <button
                key={brandSize}
                className='rounded-6 border border-grey-400 px-8 py-[2px] text-14 font-400 text-grey-700'
              >
                {brandSize}
              </button>
            ))}
          </div>
        </div>
        <TextArea control={control} name='goal'>
          프로젝트의 목표
        </TextArea>
        <TextArea control={control} name='brandInfo'>
          브랜드 추가 정보
        </TextArea>
        <TextArea control={control} name='projectInfo'>
          프로젝트 추가 정보
        </TextArea>
        <Button>프로젝트 생성하기</Button>
      </div>
    </Modal>
  );
};

export default NewProjectModal;
