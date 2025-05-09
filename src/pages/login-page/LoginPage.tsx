import { IconLogo } from 'public/icons';
import { useForm } from 'react-hook-form';
import Button from 'src/components/Button';
import TextInput from 'src/components/TextInput';

const LoginPage = () => {
  const { control } = useForm();
  return (
    <main className='flex h-full w-full flex-col items-center justify-center p-40'>
      <form className='z-popup flex w-full max-w-600 flex-col items-center gap-20 rounded-6 bg-white/95 p-28 shadow-[0_0_10px_0_rgba(0,0,0,0.2)]'>
        <div className='flex w-full flex-col items-center gap-[6px]'>
          <h1 className='text-primary-600 text-12 font-400 leading-tight tracking-tight'>
            WHERE TO POP: AI 기반 대화형 팝업스토어 개설 위치 추천 서비스
          </h1>
          <h2 className='text-primary-600 text-18 font-500 leading-tight tracking-tight'>
            지금, 가장 잘 팔릴 장소를 찾아드립니다
          </h2>
        </div>
        <TextInput control={control} name='id'>
          ID
        </TextInput>
        <TextInput control={control} name='password' type='password'>
          Password
        </TextInput>
        <Button variant='secondary'>로그인</Button>
      </form>
      <div className='fixed inset-0 z-nav backdrop-blur-[0.5px]' />
      <div className='fixed left-1/2 top-1/2 z-base h-[946px] w-[1728px] -translate-x-1/2 -translate-y-1/2 select-none'>
        <IconLogo width='100%' height='100%' />
      </div>
    </main>
  );
};

export default LoginPage;
