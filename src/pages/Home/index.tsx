import SkeletonLoader from '@/components/SkeletonLoader';
import { PersistentStateKey } from '@/constants';
import { HomeContainer } from '@/containers/HomeContainer';
import { usePersistentState } from '@/hooks';
import { useTranslation } from 'react-i18next';
import './index.css';
import Board from '@/components/NodeBaseEditor/Board/Board';

const Home = () => {
  const { t } = useTranslation();
  const [theme, setTheme] = usePersistentState(PersistentStateKey.ThemePreference, 'dark');

  return <Board />;
};

export default Home;
