import SkeletonLoader from '@/components/SkeletonLoader';
import { useTranslation } from 'react-i18next';
import './index.css';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <SkeletonLoader.Wrapper
        loading={true}
        animation='wave'
      >
        <div className='card'>
          <SkeletonLoader.Primary>
            <div className='img'>
              <img
                className=''
                src='./thumbnail.jpg'
                alt='Video Thumbnail'
              />
            </div>
          </SkeletonLoader.Primary>
          <div className='card-info'>
            <SkeletonLoader.Secondary>
              <h2 className='video-title'></h2>
            </SkeletonLoader.Secondary>
            <SkeletonLoader.Secondary>
              <span>
                <span className='channel-name'></span>
                <span className='video-description'></span>
              </span>
            </SkeletonLoader.Secondary>
            <SkeletonLoader.Secondary>
              <span className='video-description'></span>
            </SkeletonLoader.Secondary>
          </div>
        </div>
      </SkeletonLoader.Wrapper>
    </div>
  );
};

export default Home;
