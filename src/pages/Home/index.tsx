import { HomeContainer } from '@/containers/HomeContainer';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <HomeContainer />
    </div>
  );
};

export default Home;
