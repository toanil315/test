import React, { useRef, useState } from 'react';
import { StyledVideoContainer, StyledVideoItem } from './styled';
import { useIntersectionObserver } from '@/hooks';

interface VideoItem {
  id: string;
  title: string;
  link: string;
}

const convertToSnakeCase = (name: string) => {
  return name.toLowerCase().replace(' ', '_');
};

const convertSnakeToNormal = (name: string) => {
  return name.replace('_', ' ');
};

const videoData: VideoItem[] = [
  {
    id: convertToSnakeCase('4 React Mistakes'),
    title: '4 React Mistakes',
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055182/react-inforgraphics/4_React_Mistakes_gqpyqr.mp4',
  },
  {
    id: convertToSnakeCase('absolute imports'),
    title: 'absolute imports',
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700054959/react-inforgraphics/absolute_imports_oxk1y5.mp4',
  },
  {
    id: convertToSnakeCase('abstraction over array states'),
    title: 'abstraction over array states',
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055185/react-inforgraphics/abstraction_over_array_states_kpwtz4.mp4',
  },
  {
    id: convertToSnakeCase('avoid premature optimizations with useMemo'),
    title: 'avoid premature optimizations with useMemo',
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055236/react-inforgraphics/avoid_premature_optimizations_with_useMemo_jmblzk.mp4',
  },
  {
    id: 'avoid_prop_drilling',
    title: convertSnakeToNormal('avoid_prop_drilling'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700054960/react-inforgraphics/avoid_prop_drilling_zt3xh5.mp4',
  },
  {
    id: 'avoid_provider_wrapping_hell',
    title: convertSnakeToNormal('avoid_provider_wrapping_hell'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700054980/react-inforgraphics/avoid_provider_wrapping_hell_dacgvo.mp4',
  },
  {
    id: 'avoid_syncing_state_in_useEffect',
    title: convertSnakeToNormal('avoid_syncing_state_in_useEffect'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700054995/react-inforgraphics/avoid_syncing_state_in_useeffect_y49lsg.mp4',
  },
  {
    id: 'cache_server_functions',
    title: convertSnakeToNormal('cache_server_functions'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700054964/react-inforgraphics/cache_server_functions_zyvk3k.mp4',
  },
  {
    id: 'classnames_design',
    title: convertSnakeToNormal('classnames_design'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700054967/react-inforgraphics/classnames_design_rxlw3j.mp4',
  },
  {
    id: 'classnames',
    title: convertSnakeToNormal('classnames'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700054970/react-inforgraphics/classnames_iuzflf.mp4',
  },
  {
    id: 'clean_up_your_providers',
    title: convertSnakeToNormal('clean_up_your_providers'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700054980/react-inforgraphics/clean_up_your_providers_ckrlsk.mp4',
  },
  {
    id: 'client_server_components',
    title: convertSnakeToNormal('client_server_components'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700054976/react-inforgraphics/client_server_components_ac9ne3.mp4',
  },
  {
    id: 'composition',
    title: convertSnakeToNormal('composition'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700054980/react-inforgraphics/composition_gw5dmm.mp4',
  },
  {
    id: 'compound_components_pattern',
    title: convertSnakeToNormal('compound_components_pattern'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055232/react-inforgraphics/compound_components_pattern_og9kxp.mp4',
  },
  {
    id: 'conditional_rendering_enums',
    title: convertSnakeToNormal('conditional_rendering_enums'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700054989/react-inforgraphics/conditional_rendering_enums_hlrxlu.mp4',
  },
  {
    id: 'conditional_rendering_in_react',
    title: convertSnakeToNormal('conditional_rendering_in_react'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700054989/react-inforgraphics/conditional_rendering_in_react_qrvrdy.mp4',
  },
  {
    id: 'conditional_rendering_with_ts_pattern',
    title: convertSnakeToNormal('conditional_rendering_with_ts_pattern'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700054998/react-inforgraphics/conditional_rendering_with_ts_pattern_jyfsxw.mp4',
  },
  {
    id: 'constants',
    title: convertSnakeToNormal('constants'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055004/react-inforgraphics/constants_v0ryh2.mp4',
  },
  {
    id: 'currying',
    title: convertSnakeToNormal('currying'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055003/react-inforgraphics/currying_woytqt.mp4',
  },
  {
    id: 'dropdown_composition_model',
    title: convertSnakeToNormal('dropdown_composition_model'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055084/react-inforgraphics/dropdown_composition_model_r9agmv.mp4',
  },
  {
    id: 'embrace_composition',
    title: convertSnakeToNormal('embrace_composition'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055075/react-inforgraphics/embrace_composition_if8yo6.mp4',
  },
  {
    id: 'enum_status_instead_of_individual_bool_variables',
    title: convertSnakeToNormal('enum_status_instead_of_individual_bool_variables'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055015/react-inforgraphics/enum_status_instead_of_individual_bool_variables_rcqyg7.mp4',
  },
  {
    id: 'factory_pattern',
    title: convertSnakeToNormal('factory_pattern'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055019/react-inforgraphics/factory_pattern_hax7ba.mp4',
  },
  {
    id: 'forms_in_react_without_state',
    title: convertSnakeToNormal('forms_in_react_without_state'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055036/react-inforgraphics/forms_in_react_without_state_l0hpyk.mp4',
  },
  {
    id: 'how_to_name_components',
    title: convertSnakeToNormal('how_to_name_components'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055083/react-inforgraphics/how_to_name_components_y4zsvx.mp4',
  },
  {
    id: 'how_to_use_composition_to_solve_rendering_issues',
    title: convertSnakeToNormal('how_to_use_composition_to_solve_rendering_issues'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055060/react-inforgraphics/how_to_use_composition_to_solve_rendering_issues_p2dlbd.mp4',
  },
  {
    id: 'how_to_use_flushSync',
    title: convertSnakeToNormal('how_to_use_flushSync'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055045/react-inforgraphics/how_to_use_flushSync_wtxbyv.mp4',
  },
  {
    id: 'if_statements',
    title: convertSnakeToNormal('if_statements'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055056/react-inforgraphics/if_statements_ark5ca.mp4',
  },
  {
    id: 'normalize_data',
    title: convertSnakeToNormal('normalize_data'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055065/react-inforgraphics/normalize_data_jbohem.mp4',
  },
  {
    id: 'prop_drilling_and_composition',
    title: convertSnakeToNormal('prop_drilling_and_composition'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055071/react-inforgraphics/prop_drilling_and_composition_hcv1yq.mp4',
  },
  {
    id: 'provider_consumer',
    title: convertSnakeToNormal('provider_consumer'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055167/react-inforgraphics/provider_consumer_txutal.mp4',
  },
  {
    id: 'react_batching_updates',
    title: convertSnakeToNormal('react_batching_updates'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055257/react-inforgraphics/react_batching_updates_ofve7x.mp4',
  },
  {
    id: 'react_useEffect_tip',
    title: convertSnakeToNormal('react_useEffect_tip'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055087/react-inforgraphics/react_useEffect_tip_r6e2gy.mp4',
  },
  {
    id: 'ref_changes',
    title: convertSnakeToNormal('ref_changes'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055094/react-inforgraphics/refchanges_tjevtb.mp4',
  },
  {
    id: 'relocate_state',
    title: convertSnakeToNormal('relocate_state'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055120/react-inforgraphics/relocate_state_zsqnqj.mp4',
  },
  {
    id: 'reset_state',
    title: convertSnakeToNormal('reset_state'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055094/react-inforgraphics/reset_state_l9ybjv.mp4',
  },
  {
    id: 'separation_concerns_2',
    title: convertSnakeToNormal('separation_concerns_2'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055459/react-inforgraphics/separation_concerns_2_sxyd0k.mp4',
  },
  {
    id: 'separation_of_concerns',
    title: convertSnakeToNormal('separation_of_concerns'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055108/react-inforgraphics/separation_of_concerns_gapzkn.mp4',
  },
  {
    id: 'separation_of_concerns_low',
    title: convertSnakeToNormal('separation_of_concerns_low'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055099/react-inforgraphics/separation_of_concerns_low_mfmpk7.mp4',
  },
  {
    id: 'solve_re-render_issues_with_composition',
    title: convertSnakeToNormal('solve_re-render_issues_with_composition'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055244/react-inforgraphics/solve_re-render_issues_with_composition_mkld6s.mp4',
  },
  {
    id: 'unnecesary_use_of_useEffect',
    title: convertSnakeToNormal('unnecesary_use_of_useEffect'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055120/react-inforgraphics/unnecesary_use_of_useEffect_o6uwhr.mp4',
  },
  {
    id: 'useEffect_lifecycle_2',
    title: convertSnakeToNormal('useEffect_lifecycle_2'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055131/react-inforgraphics/useEffect_lifecycle_2_oxmiwf.mp4',
  },
  {
    id: 'useEffect_lifecycle',
    title: convertSnakeToNormal('useEffect_lifecycle'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055136/react-inforgraphics/useEffect_lifecycle_tqmkda.mp4',
  },
  {
    id: 'useEffect_mistake',
    title: convertSnakeToNormal('useEffect_mistake'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055163/react-inforgraphics/useEffect_mistake_jhuriv.mp4',
  },
  {
    id: 'useEffect_transform_data_in_render_2',
    title: convertSnakeToNormal('useEffect_transform_data_in_render_2'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055142/react-inforgraphics/useEffect_transform_data_in_render_2_opt5od.mp4',
  },
  {
    id: 'useEffect_transform_data_in_render',
    title: convertSnakeToNormal('useEffect_transform_data_in_render'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055149/react-inforgraphics/useEffect_transform_data_in_render_qa5avz.mp4',
  },
  {
    id: 'useEffect_transform_logic',
    title: convertSnakeToNormal('useEffect_transform_logic'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055157/react-inforgraphics/useEffect_transform_logic_hu2xz4.mp4',
  },
  {
    id: 'useEventEffect',
    title: convertSnakeToNormal('useEventEffect'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055167/react-inforgraphics/useEventEffect_j6qzya.mp4',
  },
  {
    id: 'useHover_hook',
    title: convertSnakeToNormal('useHover_hook'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055174/react-inforgraphics/useHover_hook_qmcj0g.mp4',
  },
  {
    id: 'useImperativeHandler',
    title: convertSnakeToNormal('useImperativeHandler'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055403/react-inforgraphics/useImperativeHandler_velnfd.mp4',
  },
  {
    id: 'useReducer_for_centralizing_state_changes',
    title: convertSnakeToNormal('useReducer_for_centralizing_state_changes'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055208/react-inforgraphics/useReducer_for_centralizing_state_changes_fffb6w.mp4',
  },
  {
    id: 'useReducer_pattern',
    title: convertSnakeToNormal('useReducer_pattern'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055219/react-inforgraphics/useReducer_pattern_opguzq.mp4',
  },
  {
    id: 'useRef_listen_for_changes',
    title: convertSnakeToNormal('useRef_listen_for_changes'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055223/react-inforgraphics/useRef_listen_for_changes_n7aubj.mp4',
  },
  {
    id: 'use_case_for_cleaning_up_react_components',
    title: convertSnakeToNormal('use_case_for_cleaning_up_react_components'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055308/react-inforgraphics/use_case_for_cleaning_up_react_components_ftrmb9.mp4',
  },
  {
    id: 'usecallback_use_cases',
    title: convertSnakeToNormal('usecallback_use_cases'),
    link: 'https://res.cloudinary.com/toanil315/video/upload/v1700055134/react-inforgraphics/usecallback_use_cases_iquwhs.mp4',
  },
];

const VideosContainer = () => {
  const [activeId, setActiveId] = useState<string>('');
  useIntersectionObserver('-40% 0px -40% 0px', 'video', setActiveId);

  return (
    <div id='content'>
      <StyledVideoContainer>
        {videoData.map((video) => {
          return (
            <VideoItem
              activeId={activeId}
              video={video}
              key={video.id}
            />
          );
        })}
      </StyledVideoContainer>{' '}
    </div>
  );
};

const VideoItem = ({ video, activeId }: { video: VideoItem; activeId: string }) => {
  return (
    <StyledVideoItem>
      <h2 id={video.id}>{video.title.toLowerCase()}</h2>
      <video
        id={video.id}
        muted
        autoPlay
        src={activeId === video.id ? video.link : ''}
        loop
        controls
      ></video>
    </StyledVideoItem>
  );
};

export default VideosContainer;
