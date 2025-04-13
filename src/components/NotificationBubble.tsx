import { IconNotification, IconTriangle } from 'public/icons';

const NotificationBubble = () => {
  return (
    <div className='absolute -top-[3px] right-[19%] flex -translate-y-full items-center gap-[2px] whitespace-nowrap break-keep rounded-full bg-black px-8 py-[6px] text-12 font-600 text-white'>
      <IconNotification />
      <span>한번 더 클릭하여 확대해보세요!</span>
      <IconTriangle className='absolute bottom-[2px] left-1/2 -translate-x-1/2 translate-y-full' />
    </div>
  );
};

export default NotificationBubble;
