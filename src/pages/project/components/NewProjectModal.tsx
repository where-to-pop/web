import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from 'src/components/Button';
import DateInput from 'src/components/DateInput';
import Modal from 'src/components/modal/Modal';
import TextArea from 'src/components/TextArea';
import TextInput from 'src/components/TextInput';
import {
  AGE_GROUP_TO_TEXT,
  BRAND_SCALE_TO_TEXT,
  POPUP_CATEGORY_TO_TEXT,
  POPUP_TYPE_TO_TEXT,
} from 'src/constants/emumToText.const';
import { usePostProject } from 'src/services/project.service';
import {
  AgeGroupEnum,
  AgeGroup,
  BrandScale,
  BrandScaleEnum,
  PopupCategory,
  PopupCategoryEnum,
  PopupType,
  PopupTypeEnum,
  CreateProjectBody,
} from 'src/types/project.type';

interface FormValues {
  name: string;
  brandName: string;
  popupCategory: PopupCategory;
  popupType: PopupType;
  durationStart: string;
  durationEnd: string;
  primaryTargetAgeGroup: AgeGroup;
  secondaryTargetAgeGroup: AgeGroup;
  brandScale: BrandScale;
  projectGoal: string;
  additionalBrandInfo: string;
  additionalProjectInfo: string;
}

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

const NewProjectModal = ({ isOpen, closeModal }: Props) => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<FormValues>();

  const { mutateAsync: createProject } = usePostProject();

  const handleCreateProject = async (data: FormValues) => {
    const body: CreateProjectBody = {
      ...data,
      duration: `${data.durationStart} ~ ${data.durationEnd}`,
    };
    try {
      const res = await createProject(body);
      closeModal();
      toast.success('새로운 프로젝트를 생성했습니다.');
      navigate(`/project/${res.id}`);
    } catch (error) {
      console.error(error);
      toast.error('프로젝트 생성에 실패했습니다.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      title='프로젝트 생성하기'
      description='새로운 프로젝트의 기본 정보를 입력해주세요.'
    >
      <form
        className='flex flex-col gap-24'
        onSubmit={handleSubmit(handleCreateProject)}
      >
        <TextInput control={control} name='name'>
          프로젝트 이름
        </TextInput>
        <TextInput control={control} name='brandName'>
          브랜드 이름
        </TextInput>
        <div className='flex flex-col gap-12'>
          <label className='block h-20 text-14 font-500'>기간</label>
          <div className='flex items-center gap-8'>
            <Controller
              control={control}
              name='durationStart'
              render={({ field }) => (
                <DateInput value={field.value} setValue={field.onChange} />
              )}
            />
            <span className='text-14 font-400 text-grey-700'>~</span>
            <Controller
              control={control}
              name='durationEnd'
              render={({ field }) => (
                <DateInput value={field.value} setValue={field.onChange} />
              )}
            />
          </div>
        </div>
        <div className='flex flex-col gap-12'>
          <label className='block h-20 text-14 font-500'>카테고리</label>
          <div className='flex gap-8'>
            <Controller
              control={control}
              name='popupCategory'
              render={({ field }) => (
                <>
                  {PopupCategoryEnum.options.map((category) => (
                    <button
                      key={category}
                      type='button'
                      onClick={() => field.onChange(category)}
                      className={`rounded-6 border border-grey-400 px-8 py-[2px] text-14 font-400 text-grey-700 transition-all ${
                        category === field.value &&
                        'border-primary-500 bg-primary-50 text-primary-500'
                      }`}
                    >
                      {POPUP_CATEGORY_TO_TEXT[category]}
                    </button>
                  ))}
                </>
              )}
            />
          </div>
        </div>
        <div className='flex flex-col gap-12'>
          <label className='block h-20 text-14 font-500'>유형</label>
          <div className='flex gap-8'>
            <Controller
              control={control}
              name='popupType'
              render={({ field }) => (
                <>
                  {PopupTypeEnum.options.map((type) => (
                    <button
                      key={type}
                      type='button'
                      onClick={() => field.onChange(type)}
                      className={`rounded-6 border border-grey-400 px-8 py-[2px] text-14 font-400 text-grey-700 transition-all ${
                        type === field.value &&
                        'border-primary-500 bg-primary-50 text-primary-500'
                      }`}
                    >
                      {POPUP_TYPE_TO_TEXT[type]}
                    </button>
                  ))}
                </>
              )}
            />
          </div>
        </div>
        <div className='flex flex-col gap-12'>
          <label className='block h-20 text-14 font-500'>연령대 (1순위)</label>
          <div className='flex gap-8'>
            <Controller
              control={control}
              name='primaryTargetAgeGroup'
              render={({ field }) => (
                <>
                  {AgeGroupEnum.options.map((ageGroup) => (
                    <button
                      key={ageGroup}
                      type='button'
                      onClick={() => field.onChange(ageGroup)}
                      className={`rounded-6 border border-grey-400 px-8 py-[2px] text-14 font-400 text-grey-700 transition-all ${
                        ageGroup === field.value &&
                        'border-primary-500 bg-primary-50 text-primary-500'
                      }`}
                    >
                      {AGE_GROUP_TO_TEXT[ageGroup]}
                    </button>
                  ))}
                </>
              )}
            />
          </div>
        </div>
        <div className='flex flex-col gap-12'>
          <label className='block h-20 text-14 font-500'>연령대 (2순위)</label>
          <div className='flex gap-8'>
            <Controller
              control={control}
              name='secondaryTargetAgeGroup'
              render={({ field }) => (
                <>
                  {AgeGroupEnum.options.map((ageGroup) => (
                    <button
                      key={ageGroup}
                      type='button'
                      onClick={() => field.onChange(ageGroup)}
                      className={`rounded-6 border border-grey-400 px-8 py-[2px] text-14 font-400 text-grey-700 transition-all ${
                        ageGroup === field.value &&
                        'border-primary-500 bg-primary-50 text-primary-500'
                      }`}
                    >
                      {AGE_GROUP_TO_TEXT[ageGroup]}
                    </button>
                  ))}
                </>
              )}
            />
          </div>
        </div>
        <div className='flex flex-col gap-12'>
          <label className='block h-20 text-14 font-500'>브랜드 규모</label>
          <div className='flex gap-8'>
            <Controller
              control={control}
              name='brandScale'
              render={({ field }) => (
                <>
                  {BrandScaleEnum.options.map((brandScale) => (
                    <button
                      key={brandScale}
                      type='button'
                      onClick={() => field.onChange(brandScale)}
                      className={`rounded-6 border border-grey-400 px-8 py-[2px] text-14 font-400 text-grey-700 transition-all ${
                        brandScale === field.value &&
                        'border-primary-500 bg-primary-50 text-primary-500'
                      }`}
                    >
                      {BRAND_SCALE_TO_TEXT[brandScale]}
                    </button>
                  ))}
                </>
              )}
            />
          </div>
        </div>
        <TextArea control={control} name='projectGoal'>
          프로젝트의 목표
        </TextArea>
        <TextArea control={control} name='additionalBrandInfo'>
          브랜드 추가 정보
        </TextArea>
        <TextArea control={control} name='additionalProjectInfo'>
          프로젝트 추가 정보
        </TextArea>
        <Button type='submit'>프로젝트 생성하기</Button>
      </form>
    </Modal>
  );
};

export default NewProjectModal;
