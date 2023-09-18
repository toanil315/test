import { PersistentStateKey } from '@/constants';
import { HomeContainer } from '@/containers/HomeContainer';
import { usePersistentState } from '@/hooks';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  const [theme, setTheme] = usePersistentState(PersistentStateKey.ThemePreference, 'dark');

  return (
    <div>
      <HomeContainer />
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme('light')}> change to light theme</button>
    </div>
  );
};

export default Home;
